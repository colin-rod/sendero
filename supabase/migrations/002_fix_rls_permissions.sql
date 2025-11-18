-- Fix RLS permissions for anonymous inserts
-- This addresses the 401 error when submitting the waitlist form

-- Grant usage on the schema to anon
GRANT USAGE ON SCHEMA public TO anon;

-- Grant all privileges on the table to anon for inserts
GRANT ALL ON waitlist_signups TO anon;

-- Grant usage on all sequences in the schema (for UUID generation)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;

-- Ensure the anon role can use the gen_random_uuid() function
-- This is typically available by default but we make it explicit
GRANT EXECUTE ON FUNCTION gen_random_uuid() TO anon;

-- Drop the old restrictive policies
DROP POLICY IF EXISTS "Allow anonymous inserts" ON waitlist_signups;
DROP POLICY IF EXISTS "No public reads" ON waitlist_signups;
DROP POLICY IF EXISTS "No public updates" ON waitlist_signups;
DROP POLICY IF EXISTS "No public deletes" ON waitlist_signups;

-- Create new, clearer RLS policies

-- Allow anyone to insert into waitlist_signups
CREATE POLICY "Enable insert for anon users"
  ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Prevent all reads from anon users (data only visible in dashboard)
CREATE POLICY "Disable read for anon users"
  ON waitlist_signups
  FOR SELECT
  TO anon
  USING (false);

-- Prevent updates from anon users
CREATE POLICY "Disable update for anon users"
  ON waitlist_signups
  FOR UPDATE
  TO anon
  USING (false);

-- Prevent deletes from anon users
CREATE POLICY "Disable delete for anon users"
  ON waitlist_signups
  FOR DELETE
  TO anon
  USING (false);
