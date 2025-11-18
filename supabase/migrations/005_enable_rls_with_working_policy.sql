-- Re-enable RLS with a working policy
-- This time we'll use authenticated instead of anon, and grant proper permissions

-- Re-enable RLS
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to anon role
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON waitlist_signups TO anon;

-- Create a permissive policy for anonymous inserts
-- Using authenticator role which includes both anon and authenticated
CREATE POLICY "Allow all inserts"
  ON waitlist_signups
  FOR INSERT
  WITH CHECK (true);

-- Prevent all selects from public (data only visible to authenticated users in dashboard)
CREATE POLICY "Prevent public selects"
  ON waitlist_signups
  FOR SELECT
  USING (false);

-- Prevent updates and deletes
CREATE POLICY "Prevent updates"
  ON waitlist_signups
  FOR UPDATE
  USING (false);

CREATE POLICY "Prevent deletes"
  ON waitlist_signups
  FOR DELETE
  USING (false);
