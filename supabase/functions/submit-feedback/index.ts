import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Environment variables (configured in Supabase Dashboard)
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const LINEAR_API_KEY = Deno.env.get('LINEAR_API_KEY');
const LINEAR_PROJECT_ID = Deno.env.get('LINEAR_PROJECT_ID');

// Linear label IDs for each category (configured in Supabase Dashboard)
const LINEAR_LABELS = {
  'bug-report': Deno.env.get('LINEAR_LABEL_BUG'),
  'feature-request': Deno.env.get('LINEAR_LABEL_FEATURE'),
  'general': Deno.env.get('LINEAR_LABEL_GENERAL'),
  'ux-issue': Deno.env.get('LINEAR_LABEL_UX'),
};

// Validate required environment variables on startup
function validateEnvVars() {
  const missing: string[] = [];

  if (!LINEAR_API_KEY) missing.push('LINEAR_API_KEY');
  if (!LINEAR_PROJECT_ID) missing.push('LINEAR_PROJECT_ID');
  if (!LINEAR_LABELS['bug-report']) missing.push('LINEAR_LABEL_BUG');
  if (!LINEAR_LABELS['feature-request']) missing.push('LINEAR_LABEL_FEATURE');
  if (!LINEAR_LABELS['general']) missing.push('LINEAR_LABEL_GENERAL');
  if (!LINEAR_LABELS['ux-issue']) missing.push('LINEAR_LABEL_UX');

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing.join(', '));
    console.error('Please configure these in Supabase Dashboard → Edge Functions → Environment Variables');
  }

  return missing.length === 0;
}

interface FeedbackPayload {
  email?: string;
  category: 'bug-report' | 'feature-request' | 'general' | 'ux-issue';
  message: string;
  screenshot?: string; // Base64 data URL
  platform: string;
  url: string;
  locale: string;
}

Deno.serve(async (req) => {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate environment variables
    if (!validateEnvVars()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Server configuration error. Please contact support.'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const payload: FeedbackPayload = await req.json();

    // Validate required fields
    if (!payload.category || !payload.message || !payload.message.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: 'Category and message are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format if provided
    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client with service role
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    let screenshotUrl: string | null = null;

    // Upload screenshot if provided
    if (payload.screenshot) {
      try {
        // Extract base64 data
        const base64Data = payload.screenshot.split(',')[1];
        const buffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

        // Generate unique filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const random = Math.random().toString(36).substring(2, 8);
        const filename = `feedback-${timestamp}-${random}.png`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('feedback-screenshots')
          .upload(filename, buffer, {
            contentType: 'image/png',
            cacheControl: '3600',
          });

        if (uploadError) {
          console.error('Screenshot upload error:', uploadError);
        } else {
          // Get public URL
          const { data: urlData } = supabase.storage
            .from('feedback-screenshots')
            .getPublicUrl(filename);

          screenshotUrl = urlData.publicUrl;
        }
      } catch (error) {
        console.error('Screenshot processing error:', error);
        // Continue without screenshot
      }
    }

    // Create Linear issue
    const linearIssueId = await createLinearIssue({
      email: payload.email,
      category: payload.category,
      message: payload.message,
      screenshotUrl,
      platform: payload.platform,
      url: payload.url,
      locale: payload.locale,
    });

    return new Response(
      JSON.stringify({ success: true, issueId: linearIssueId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function createLinearIssue(params: {
  email?: string;
  category: FeedbackPayload['category'];
  message: string;
  screenshotUrl: string | null;
  platform: string;
  url: string;
  locale: string;
}): Promise<string> {
  const { email, category, message, screenshotUrl, platform, url, locale } = params;

  // Build issue title
  const categoryLabels = {
    'bug-report': '🐛 Bug Report',
    'feature-request': '✨ Feature Request',
    'general': '💬 General Feedback',
    'ux-issue': '🎨 UX Issue',
  };

  // Truncate message for title (first line, max 60 chars)
  const firstLine = message.split('\n')[0];
  const truncatedMessage = firstLine.length > 60
    ? firstLine.substring(0, 60) + '...'
    : firstLine;

  // Extract route from URL for better context
  let route = '/';
  try {
    const urlObj = new URL(url);
    route = urlObj.pathname;
  } catch {
    // If URL parsing fails, use full URL
    route = url;
  }

  const title = `[Sendero] ${categoryLabels[category]} - ${truncatedMessage}`;

  // Build issue description
  let description = `## Message\n${message}\n\n`;
  description += `## Page Context\n`;
  description += `- **Route**: \`${route}\`\n`;
  description += `- **Full URL**: ${url}\n`;
  description += `- **Language**: ${locale}\n\n`;
  description += `## Additional Details\n`;
  description += `- **Category**: ${categoryLabels[category]}\n`;
  description += `- **Platform**: ${platform}\n`;

  if (email) {
    description += `- **Email**: ${email}\n`;
  } else {
    description += `- **Email**: Not provided\n`;
  }

  if (screenshotUrl) {
    description += `\n## Screenshot\n![Feedback Screenshot](${screenshotUrl})\n`;
  }

  description += `\n---\n*Submitted via Sendero Feedback System*`;

  // GraphQL mutation
  const mutation = `
    mutation CreateIssue($input: IssueCreateInput!) {
      issueCreate(input: $input) {
        success
        issue {
          id
          identifier
        }
      }
    }
  `;

  const variables = {
    input: {
      title,
      description,
      teamId: LINEAR_PROJECT_ID,
      labelIds: [LINEAR_LABELS[category]],
    },
  };

  // Call Linear GraphQL API
  const response = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': LINEAR_API_KEY,
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const result = await response.json();

  if (!result.data?.issueCreate?.success) {
    console.error('Linear API error:', result.errors || result);
    throw new Error('Failed to create Linear issue: ' + JSON.stringify(result.errors || result));
  }

  return result.data.issueCreate.issue.identifier;
}
