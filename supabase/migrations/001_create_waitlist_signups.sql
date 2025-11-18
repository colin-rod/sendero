-- Create waitlist_signups table
-- This table stores all waitlist signups for the Hike & Bike Colombia smoke test

CREATE TABLE IF NOT EXISTS waitlist_signups (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Timestamp
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- User contact
  email TEXT NOT NULL UNIQUE,

  -- Tour preferences
  tour_duration TEXT NOT NULL CHECK (tour_duration IN ('one_day', 'weekend', 'one_week')),

  -- Interest types (array of text)
  interest_types TEXT[] NOT NULL CHECK (
    interest_types <@ ARRAY['hike', 'bike', 'e_bike', 'women_only', 'coffee_farm']::TEXT[]
  ),

  -- Fitness level
  fitness_level TEXT NOT NULL CHECK (fitness_level IN ('beginner', 'moderate')),

  -- Travel timeline
  travel_timeline TEXT NOT NULL CHECK (travel_timeline IN ('next_3_months', 'next_6_months', 'later')),

  -- Optional notes (for future use)
  notes TEXT
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_email ON waitlist_signups(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_created_at ON waitlist_signups(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow anonymous inserts (for the signup form)
-- Since we have no auth, we allow anyone to insert
CREATE POLICY "Allow anonymous inserts"
  ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- RLS Policy: No one can read data (security measure)
-- Only admins should access data via Supabase dashboard
CREATE POLICY "No public reads"
  ON waitlist_signups
  FOR SELECT
  TO anon
  USING (false);

-- RLS Policy: No updates or deletes from public
CREATE POLICY "No public updates"
  ON waitlist_signups
  FOR UPDATE
  TO anon
  USING (false);

CREATE POLICY "No public deletes"
  ON waitlist_signups
  FOR DELETE
  TO anon
  USING (false);

-- Grant insert permissions to anon role
GRANT INSERT ON waitlist_signups TO anon;

-- Comments for documentation
COMMENT ON TABLE waitlist_signups IS 'Stores waitlist signups for Hike & Bike Colombia smoke test';
COMMENT ON COLUMN waitlist_signups.email IS 'Unique email address of the signup';
COMMENT ON COLUMN waitlist_signups.tour_duration IS 'Preferred tour duration: one_day, weekend, or one_week';
COMMENT ON COLUMN waitlist_signups.interest_types IS 'Array of interests: hike, bike, e_bike, women_only, coffee_farm';
COMMENT ON COLUMN waitlist_signups.fitness_level IS 'Fitness level: beginner or moderate';
COMMENT ON COLUMN waitlist_signups.travel_timeline IS 'When they plan to travel: next_3_months, next_6_months, or later';
