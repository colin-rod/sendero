# Linear Feedback System - Setup Guide

## Overview

The Sendero feedback system allows users to submit feedback from anywhere on the site via a floating button. Feedback is sent directly to Linear as issues, with optional screenshot attachments stored in Supabase Storage.

**Features:**
- 🎯 Floating feedback button on all pages (bottom-right corner)
- 📧 Optional email field (users can submit anonymously)
- 🏷️ 4 feedback categories: Bug Report, Feature Request, General Feedback, UX Issue
- 📸 Screenshot upload/paste support (Ctrl+V / Cmd+V)
- 🌍 Trilingual UI (EN, DE, ES)
- 🔒 Secure: Supabase RLS policies + Edge Function processing

---

## Required Environment Variables

You need to configure **6 environment variables** in your **Supabase project**:

### 1. Linear API Configuration

```bash
LINEAR_API_KEY=lin_api_your_key_here
LINEAR_PROJECT_ID=your-linear-project-or-team-id
```

### 2. Linear Label IDs (One for Each Category)

```bash
LINEAR_LABEL_BUG=label-uuid-for-bug-reports
LINEAR_LABEL_FEATURE=label-uuid-for-feature-requests
LINEAR_LABEL_GENERAL=label-uuid-for-general-feedback
LINEAR_LABEL_UX=label-uuid-for-ux-issues
```

---

## Setup Steps

### Step 1: Create Linear API Key

1. Go to [Linear Settings → API](https://linear.app/settings/api)
2. Click **"Create new API key"**
3. Name it: `Sendero Feedback System`
4. Permissions needed: `write:issues`, `read:projects`
5. Copy the API key (starts with `lin_api_`)

### Step 2: Get Linear Project/Team ID

**Option A - From Linear URL:**
1. Open your Linear project
2. Look at the URL: `https://linear.app/{workspace}/{project-key}`
3. The Team ID is in your project settings under **Settings → General**

**Option B - GraphQL Query:**
```graphql
query {
  teams {
    nodes {
      id
      name
    }
  }
}
```

Test at: [Linear GraphQL Playground](https://linear.app/sendero/settings/api)

### Step 3: Create Labels in Linear

In your Linear project, create 4 labels with these names:
- 🐛 **Bug Report**
- ✨ **Feature Request**
- 💬 **General Feedback**
- 🎨 **UX Issue**

You can use existing labels if they match these categories.

### Step 4: Get Label UUIDs

Use the Linear GraphQL Playground to get label IDs:

```graphql
query {
  issueLabels {
    nodes {
      id
      name
    }
  }
}
```

Copy the UUID for each of the 4 labels you created.

### Step 5: Configure Supabase Environment Variables

1. Go to **Supabase Dashboard** → **Project Settings** → **Edge Functions**
2. Scroll to **Environment Variables**
3. Add all 6 variables:

| Variable Name | Value |
|---------------|-------|
| `LINEAR_API_KEY` | `lin_api_...` from Step 1 |
| `LINEAR_PROJECT_ID` | Team/Project ID from Step 2 |
| `LINEAR_LABEL_BUG` | UUID for Bug Report label |
| `LINEAR_LABEL_FEATURE` | UUID for Feature Request label |
| `LINEAR_LABEL_GENERAL` | UUID for General Feedback label |
| `LINEAR_LABEL_UX` | UUID for UX Issue label |

4. Click **Save** after adding all variables

### Step 6: Run Database Migration

Create the Supabase Storage bucket for feedback screenshots:

```bash
supabase db push
```

This will create the `feedback-screenshots` bucket with proper RLS policies.

### Step 7: Deploy Edge Function

Deploy the feedback submission Edge Function:

```bash
supabase functions deploy submit-feedback
```

Verify deployment:

```bash
supabase functions list
```

You should see `submit-feedback` in the list.

---

## Testing

### Local Development Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your site in a browser

3. Look for the **floating feedback button** (bottom-right corner)

4. Click the button and test:
   - Leave email blank → Should submit successfully
   - Fill in email → Should validate format
   - Select each category
   - Type a message (min 10 characters)
   - Upload a screenshot
   - Paste a screenshot (Ctrl+V / Cmd+V)
   - Submit feedback

5. Check Linear:
   - New issue should be created
   - Title: `[Sendero] {Category} - {First line of message}`
   - Description includes all metadata
   - Correct label applied
   - Screenshot embedded (if provided)

### Test in All Languages

Switch languages and verify all text displays correctly:
- `/en` - English
- `/de` - German
- `/es` - Spanish

### Verification Checklist

- [ ] Floating button appears on all pages
- [ ] Modal opens when button clicked
- [ ] All 3 languages work (EN, DE, ES)
- [ ] Category selection works
- [ ] Message validation works (min 10 chars)
- [ ] Email validation works (optional field)
- [ ] Screenshot upload works
- [ ] Screenshot paste (Ctrl+V) works
- [ ] Form submits successfully
- [ ] Success message displays
- [ ] Modal auto-closes after success
- [ ] Linear issue created with correct:
  - Title format
  - Description with metadata
  - Category label
  - Screenshot (if uploaded)
- [ ] No console errors

---

## Category to Label Mapping

| User Selects | Linear Label Applied |
|--------------|---------------------|
| Bug Report | LINEAR_LABEL_BUG |
| Feature Request | LINEAR_LABEL_FEATURE |
| General Feedback | LINEAR_LABEL_GENERAL |
| UX Issue | LINEAR_LABEL_UX |

---

## Linear Issue Format

**Title:**
```
[Sendero] {Category} - {First line of message}
```

**Description:**
```markdown
## Message
{User's message}

## Submission Details
- **URL**: {Page where feedback was submitted}
- **Platform**: {Browser user agent}
- **Language**: {Current locale (en/de/es)}
- **Category**: {Bug Report / Feature Request / etc.}
- **Email**: {User email or "Not provided"}

## Screenshot
![Feedback Screenshot]({Supabase Storage URL})

---
*Submitted via Sendero Feedback System*
```

---

## Troubleshooting

### Issue: "Failed to submit feedback"

**Possible causes:**
1. Edge Function not deployed
2. Environment variables not configured
3. Linear API key invalid or expired
4. Network error

**Solution:**
1. Check Edge Function logs:
   ```bash
   supabase functions logs submit-feedback
   ```

2. Verify environment variables in Supabase Dashboard

3. Test Linear API key manually using GraphQL Playground

### Issue: Screenshot not appearing in Linear

**Possible causes:**
1. Storage bucket not created
2. RLS policies blocking upload
3. Screenshot too large (>5MB)

**Solution:**
1. Verify storage bucket exists:
   ```bash
   supabase storage list
   ```

2. Check RLS policies in Supabase Dashboard → Storage → feedback-screenshots

3. Test screenshot upload manually

### Issue: Linear issue created but no screenshot

**Causes:**
- Screenshot upload failed (non-blocking error)
- Edge Function continues without screenshot

**Solution:**
- Check Edge Function logs for upload errors
- Verify Storage bucket permissions

### Issue: Email validation error

**Cause:**
- Invalid email format
- Email field is optional - validation only runs if email is provided

**Solution:**
- Leave email blank if not needed
- Ensure valid email format: `user@domain.com`

### Issue: "Category required" error

**Cause:**
- User didn't select a category before submitting

**Solution:**
- Select one of the 4 category chips before submitting

---

## Production Deployment

### Before Deploying

- [ ] All environment variables configured in Supabase
- [ ] Edge Function deployed and tested
- [ ] Storage bucket created (migration run)
- [ ] Linear labels created and IDs obtained
- [ ] Local testing passed in all 3 languages

### Deployment Steps

```bash
# 1. Ensure all migrations are applied
supabase db push

# 2. Ensure Edge Function is deployed
supabase functions deploy submit-feedback

# 3. Verify environment variables
# Check Supabase Dashboard → Edge Functions → Environment Variables

# 4. Deploy to Vercel (via Git)
git add .
git commit -m "feat: add Linear feedback system with floating button"
git push origin development

# 5. Merge to main when ready
git checkout main
git merge development
git push origin main
```

### Post-Deployment Verification

1. Visit production site
2. Test feedback submission
3. Verify Linear issue created
4. Check screenshot appears in Linear
5. Test in all 3 languages

---

## Architecture Overview

```
User clicks feedback button
    ↓
FeedbackModal opens (client component)
    ↓
User fills form (email optional, category, message, screenshot)
    ↓
Client validation (lib/utils/feedback.ts)
    ↓
Submit to Supabase Edge Function
    ↓
Edge Function (Deno):
  - Validate payload
  - Upload screenshot to Storage
  - Create Linear issue via GraphQL
    ↓
Return success with issue ID
    ↓
Show success message, auto-close modal
```

---

## Files Created

### Frontend
- `components/features/feedback/FloatingFeedbackButton.tsx` - Floating button
- `components/features/feedback/FeedbackModal.tsx` - Modal dialog form
- `components/ui/Dialog.tsx` - Reusable dialog component

### Backend
- `supabase/functions/submit-feedback/index.ts` - Edge Function
- `supabase/migrations/008_create_feedback_storage.sql` - Storage bucket

### Utilities & Types
- `lib/types/feedback.ts` - TypeScript types
- `lib/utils/feedback.ts` - Client utilities (submit, validate)

### Translations
- `messages/en.json` - English translations
- `messages/de.json` - German translations
- `messages/es.json` - Spanish translations

### Configuration
- `app/[locale]/layout.tsx` - Integration point
- `.env.example` - Environment variable template
- `tsconfig.json` - TypeScript config (excludes Edge Functions)
- `eslint.config.mjs` - ESLint config (ignores Edge Functions)

---

## Support

For issues or questions:
- Check Edge Function logs: `supabase functions logs submit-feedback`
- Review Supabase Storage logs in Dashboard
- Test Linear API with GraphQL Playground
- Verify environment variables are set correctly

---

**Version:** 1.0.0
**Last Updated:** December 2024
**Status:** Ready for Production

---

_Built with ❤️ by Colin Rodriguez with AI pair programming (Claude)_
