import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Save, Clock, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Note {
  id: string;
  content: string;
  timestamp: string;
}

interface PatientNotesProps {
  patientId: string;
}

// Define interfaces for our RPC function responses
interface PatientNoteRecord {
  id: string;
  patient_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

// Define RPC function parameter types
interface GetPatientNotesParams {
  p_patient_id: string;
}

interface AddPatientNoteParams {
  p_patient_id: string;
  p_content: string;
}

interface DeletePatientNoteParams {
  p_note_id: string;
}

const PatientNotes: React.FC<PatientNotesProps> = ({ patientId }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (patientId && user) {
      loadNotes();
    }
  }, [patientId, user]);

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
      const { data, error } = await supabase.rpc<PatientNoteRecord[]>(
        'get_patient_notes', 
        { p_patient_id: patientId } as GetPatientNotesParams
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

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    
    try {
      setIsSaving(true);
      
      // Save to Supabase using RPC function
      const { data, error } = await supabase.rpc<PatientNoteRecord>(
        'add_patient_note',
        {
          p_patient_id: patientId,
          p_content: newNote
        } as AddPatientNoteParams
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
        setNewNote('');
        setIsAddingNote(false);
        
        toast({
          title: "Note saved",
          description: "Your note has been saved successfully."
        });
      }
    } catch (error) {
      console.error('Error saving note:', error);
      toast({
        title: "Failed to save note",
        description: "There was an error saving your note.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      // Delete from Supabase using RPC function
      const { error } = await supabase.rpc(
        'delete_patient_note',
        { p_note_id: noteId } as DeletePatientNoteParams
      );
      
      if (error) throw error;
      
      // Update local state
      setNotes(notes.filter(note => note.id !== noteId));
      
      toast({
        title: "Note deleted",
        description: "The note has been deleted successfully."
      });
    } catch (error) {
      console.error('Error deleting note:', error);
      toast({
        title: "Failed to delete note",
        description: "There was an error deleting the note.",
        variant: "destructive"
      });
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

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Patient Notes</CardTitle>
        {!isAddingNote && (
          <Button onClick={() => setIsAddingNote(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Note
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {isAddingNote && (
          <div className="space-y-2">
            <Textarea
              placeholder="Enter your notes about the patient here..."
              className="min-h-[120px] resize-none"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNote('');
                }}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={handleAddNote}
                disabled={!newNote.trim() || isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Note
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-medical-blue" />
            <span className="ml-2">Loading notes...</span>
          </div>
        ) : notes.length > 0 ? (
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(note.timestamp)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete note</span>
                  </Button>
                </div>
                <div className="text-sm whitespace-pre-wrap">{note.content}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No notes have been added for this patient yet.</p>
            {!isAddingNote && (
              <Button 
                variant="outline" 
                className="mt-2" 
                size="sm" 
                onClick={() => setIsAddingNote(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add the first note
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientNotes;
