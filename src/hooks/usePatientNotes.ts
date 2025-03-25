
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Note, PatientNoteRecord, GetPatientNotesParams, AddPatientNoteParams, DeletePatientNoteParams } from '@/types/patientNotes';

export const usePatientNotes = (patientId: string) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (patientId) {
      loadNotes();
    }
  }, [patientId]);

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      
      // Try to create the notes table if it doesn't exist
      try {
        await supabase.functions.invoke('create-notes-table');
      } catch (error) {
        console.log('Note: Table may already exist or function failed:', error);
      }
      
      // Query the patient_notes table using RPC function
      const { data, error } = await supabase.rpc<PatientNoteRecord[], GetPatientNotesParams>(
        'get_patient_notes', 
        { p_patient_id: patientId }
      );
      
      if (error) throw error;
      
      if (data && Array.isArray(data)) {
        // Convert data to Note format
        const loadedNotes = data.map((note: PatientNoteRecord) => ({
          id: note.id,
          content: note.content,
          timestamp: note.created_at
        }));
        
        setNotes(loadedNotes);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
      toast({
        title: "Failed to load notes",
        description: "There was an error loading patient notes.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addNote = async (content: string) => {
    if (!content.trim()) return;
    
    try {
      setIsSaving(true);
      
      // Save to Supabase using RPC function
      const { data, error } = await supabase.rpc<PatientNoteRecord, AddPatientNoteParams>(
        'add_patient_note',
        {
          p_patient_id: patientId,
          p_content: content
        }
      );
      
      if (error) throw error;
      
      if (data) {
        // Create a new note object from the response
        const savedNote: Note = {
          id: data.id,
          content: data.content,
          timestamp: data.created_at
        };
        
        setNotes([savedNote, ...notes]);
        
        toast({
          title: "Note saved",
          description: "Your note has been saved successfully."
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving note:', error);
      toast({
        title: "Failed to save note",
        description: "There was an error saving your note.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      // Delete from Supabase using RPC function
      const { error } = await supabase.rpc<boolean, DeletePatientNoteParams>(
        'delete_patient_note',
        { p_note_id: noteId }
      );
      
      if (error) throw error;
      
      // Update local state
      setNotes(notes.filter(note => note.id !== noteId));
      
      toast({
        title: "Note deleted",
        description: "The note has been deleted successfully."
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      toast({
        title: "Failed to delete note",
        description: "There was an error deleting the note.",
        variant: "destructive"
      });
      return false;
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  return {
    notes,
    isLoading,
    isSaving,
    addNote,
    deleteNote,
    formatDate
  };
};
