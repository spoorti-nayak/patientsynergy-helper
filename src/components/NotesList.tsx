
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { Note } from '@/types/patientNotes';
import NoteItem from './NoteItem';

interface NotesListProps {
  notes: Note[];
  isLoading: boolean;
  formatDate: (timestamp: string) => string;
  onDelete: (id: string) => Promise<boolean>;
  onAddClick: () => void;
  isAddingNote: boolean;
}

const NotesList: React.FC<NotesListProps> = ({ 
  notes, 
  isLoading, 
  formatDate, 
  onDelete, 
  onAddClick,
  isAddingNote
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-medical-blue" />
        <span className="ml-2">Loading notes...</span>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No notes have been added for this patient yet.</p>
        {!isAddingNote && (
          <Button 
            variant="outline" 
            className="mt-2" 
            size="sm" 
            onClick={onAddClick}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add the first note
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          formatDate={formatDate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NotesList;
