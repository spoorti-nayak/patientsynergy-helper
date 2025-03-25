
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

-- Create a function to get patient notes
CREATE OR REPLACE FUNCTION public.get_patient_notes(p_patient_id TEXT)
RETURNS SETOF public.patient_notes AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.patient_notes
  WHERE patient_id = p_patient_id AND user_id = auth.uid()
  ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to add a patient note
CREATE OR REPLACE FUNCTION public.add_patient_note(p_patient_id TEXT, p_content TEXT)
RETURNS public.patient_notes AS $$
DECLARE
  new_note public.patient_notes;
BEGIN
  INSERT INTO public.patient_notes (patient_id, user_id, content)
  VALUES (p_patient_id, auth.uid(), p_content)
  RETURNING * INTO new_note;
  
  RETURN new_note;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to delete a patient note
CREATE OR REPLACE FUNCTION public.delete_patient_note(p_note_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  rows_affected INT;
BEGIN
  DELETE FROM public.patient_notes
  WHERE id = p_note_id AND user_id = auth.uid()
  RETURNING 1 INTO rows_affected;
  
  RETURN rows_affected > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
