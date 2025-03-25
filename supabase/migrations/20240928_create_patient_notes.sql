
-- This is run by the create-notes-table edge function
-- Create a function to create the patient_notes table if it doesn't exist
CREATE OR REPLACE FUNCTION public.create_patient_notes_table()
RETURNS void AS $$
BEGIN
  -- Check if the table exists
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'patient_notes') THEN
    -- Create the patient_notes table
    CREATE TABLE public.patient_notes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      patient_id TEXT NOT NULL,
      user_id UUID REFERENCES auth.users NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    -- Set up Row Level Security
    ALTER TABLE public.patient_notes ENABLE ROW LEVEL SECURITY;

    -- Create policy for users to see only their own notes
    CREATE POLICY "Users can view their own notes"
    ON public.patient_notes
    FOR SELECT
    USING (auth.uid() = user_id);

    -- Create policy for users to insert their own notes
    CREATE POLICY "Users can insert their own notes"
    ON public.patient_notes
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

    -- Create policy for users to update their own notes
    CREATE POLICY "Users can update their own notes"
    ON public.patient_notes
    FOR UPDATE
    USING (auth.uid() = user_id);

    -- Create policy for users to delete their own notes
    CREATE POLICY "Users can delete their own notes"
    ON public.patient_notes
    FOR DELETE
    USING (auth.uid() = user_id);
  END IF;
END;
$$ LANGUAGE plpgsql;
