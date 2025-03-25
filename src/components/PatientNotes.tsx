
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePatientNotes } from '@/hooks/usePatientNotes';
import NoteForm from './NoteForm';
import NotesList from './NotesList';

interface PatientNotesProps {
  patientId: string;
}

const PatientNotes: React.FC<PatientNotesProps> = ({ patientId }) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const { user } = useAuth();
  const { 
    notes, 
    isLoading, 
    isSaving, 
    addNote, 
    deleteNote, 
    formatDate 
  } = usePatientNotes(patientId);

  const handleAddNote = async (content: string) => {
    const success = await addNote(content);
    if (success) {
      setIsAddingNote(false);
      setNewNote('');
    }
    return success;
  };

  const handleCancelAdd = () => {
    setIsAddingNote(false);
    setNewNote('');
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
          <NoteForm 
            onSave={handleAddNote}
            onCancel={handleCancelAdd}
            isSaving={isSaving}
          />
        )}

        <NotesList
          notes={notes}
          isLoading={isLoading}
          formatDate={formatDate}
          onDelete={deleteNote}
          onAddClick={() => setIsAddingNote(true)}
          isAddingNote={isAddingNote}
        />
      </CardContent>
    </Card>
  );
};

export default PatientNotes;
