-- Clean slate: Drop all existing policies and re-enable RLS properly
-- This ensures no conflicting policies from previous migrations

-- First, drop ALL existing policies (from all previous migrations)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON waitlist_signups;
DROP POLICY IF EXISTS "Enable insert for anon users" ON waitlist_signups;
DROP POLICY IF EXISTS "anon_insert_policy" ON waitlist_signups;
DROP POLICY IF EXISTS "Allow all inserts" ON waitlist_signups;
DROP POLICY IF EXISTS "No public reads" ON waitlist_signups;
DROP POLICY IF EXISTS "Disable read for anon users" ON waitlist_signups;
DROP POLICY IF EXISTS "anon_no_select" ON waitlist_signups;
DROP POLICY IF EXISTS "Prevent public selects" ON waitlist_signups;
DROP POLICY IF EXISTS "No public updates" ON waitlist_signups;
DROP POLICY IF EXISTS "Disable update for anon users" ON waitlist_signups;
DROP POLICY IF EXISTS "Prevent updates" ON waitlist_signups;
DROP POLICY IF EXISTS "No public deletes" ON waitlist_signups;
DROP POLICY IF EXISTS "Disable delete for anon users" ON waitlist_signups;
DROP POLICY IF EXISTS "Prevent deletes" ON waitlist_signups;

-- Re-enable RLS
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to anon role
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON waitlist_signups TO anon;

-- Create a single permissive policy for inserts
-- This policy allows any insert without restrictions
CREATE POLICY "waitlist_anon_insert"
  ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Block all other operations for anon users
CREATE POLICY "waitlist_anon_no_select"
  ON waitlist_signups
  FOR SELECT
  TO anon
  USING (false);

CREATE POLICY "waitlist_anon_no_update"
  ON waitlist_signups
  FOR UPDATE
  TO anon
  USING (false);

CREATE POLICY "waitlist_anon_no_delete"
  ON waitlist_signups
  FOR DELETE
  TO anon
  USING (false);
