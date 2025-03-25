
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
      
      const { data, error } = await supabase
        .from('patient_notes')
        .select('*')
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Convert data to Note format
      const loadedNotes: Note[] = data.map(note => ({
        id: note.id,
        content: note.content,
        timestamp: new Date(note.created_at).toISOString()
      }));
      
      setNotes(loadedNotes);
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
      const timestamp = new Date().toISOString();
      const noteId = `note-${Date.now()}`;
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('patient_notes')
        .insert({
          id: noteId,
          patient_id: patientId,
          content: newNote,
          user_id: user?.id
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Update local state
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
      // Delete from Supabase
      const { error } = await supabase
        .from('patient_notes')
        .delete()
        .eq('id', noteId);
        
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
