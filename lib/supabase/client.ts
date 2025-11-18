import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types/database';

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing env variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('Missing env variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

/**
 * Supabase client for server-side operations
 * Uses the anon key which has limited permissions via RLS policies
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
