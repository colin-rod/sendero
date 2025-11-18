-- Simplified RLS fix - Allow inserts for anon users
-- Drop all existing policies first
DROP POLICY IF EXISTS "Allow anonymous inserts" ON waitlist_signups;
DROP POLICY IF EXISTS "Enable insert for anon users" ON waitlist_signups;
DROP POLICY IF EXISTS "No public reads" ON waitlist_signups;
DROP POLICY IF EXISTS "Disable read for anon users" ON waitlist_signups;
DROP POLICY IF EXISTS "No public updates" ON waitlist_signups;
DROP POLICY IF EXISTS "Disable update for anon users" ON waitlist_signups;
DROP POLICY IF EXISTS "No public deletes" ON waitlist_signups;
DROP POLICY IF EXISTS "Disable delete for anon users" ON waitlist_signups;

-- Create a single permissive policy for inserts
CREATE POLICY "anon_insert_policy"
  ON waitlist_signups
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Block selects
CREATE POLICY "anon_no_select"
  ON waitlist_signups
  FOR SELECT
  TO public
  USING (false);
