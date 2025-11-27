-- Create contact_submissions table
-- This table stores all contact form submissions for Sendero

CREATE TABLE IF NOT EXISTS contact_submissions (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Timestamp
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- User contact
  email TEXT NOT NULL,
  name TEXT NOT NULL,

  -- Form fields
  subject TEXT CHECK (subject IS NULL OR subject IN ('general', 'tour', 'custom', 'feedback')),
  message TEXT NOT NULL,

  -- Metadata
  locale TEXT NOT NULL CHECK (locale IN ('en', 'de', 'es'))
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow anonymous inserts (for the contact form)
-- Since we have no auth, we allow anyone to insert
CREATE POLICY "Allow anonymous inserts"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- RLS Policy: No one can read data (security measure)
-- Only admins should access data via Supabase dashboard
CREATE POLICY "No public reads"
  ON contact_submissions
  FOR SELECT
  TO anon
  USING (false);

-- RLS Policy: No updates or deletes from public
CREATE POLICY "No public updates"
  ON contact_submissions
  FOR UPDATE
  TO anon
  USING (false);

CREATE POLICY "No public deletes"
  ON contact_submissions
  FOR DELETE
  TO anon
  USING (false);

-- Grant insert permissions to anon role
GRANT INSERT ON contact_submissions TO anon;

-- Comments for documentation
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions for Sendero';
COMMENT ON COLUMN contact_submissions.email IS 'Email address of the person contacting';
COMMENT ON COLUMN contact_submissions.name IS 'Name of the person contacting';
COMMENT ON COLUMN contact_submissions.subject IS 'Topic: general, tour, custom, or feedback (optional)';
COMMENT ON COLUMN contact_submissions.message IS 'Message content from the contact form';
COMMENT ON COLUMN contact_submissions.locale IS 'Language the form was submitted in: en, de, or es';
