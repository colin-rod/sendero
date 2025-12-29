-- Create Storage bucket for feedback screenshots
-- This bucket stores user-submitted screenshots for the Linear feedback system
-- Screenshots are publicly accessible so Linear can embed them in issue descriptions

-- Create the public storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('feedback-screenshots', 'feedback-screenshots', true);

-- RLS Policy: Allow anonymous uploads
-- Users can upload screenshots without authentication
CREATE POLICY "Allow anonymous uploads to feedback screenshots"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'feedback-screenshots');

-- RLS Policy: Allow public reads
-- Linear (and anyone) can view the screenshots to display in issues
CREATE POLICY "Allow public reads of feedback screenshots"
  ON storage.objects
  FOR SELECT
  TO anon, public
  USING (bucket_id = 'feedback-screenshots');

-- RLS Policy: No public updates
-- Prevent modification of uploaded screenshots
CREATE POLICY "No public updates to feedback screenshots"
  ON storage.objects
  FOR UPDATE
  TO anon
  USING (false);

-- RLS Policy: No public deletes
-- Prevent deletion of uploaded screenshots from public
CREATE POLICY "No public deletes of feedback screenshots"
  ON storage.objects
  FOR DELETE
  TO anon
  USING (false);
