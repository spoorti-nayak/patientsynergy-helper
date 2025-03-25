
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Trash2 } from 'lucide-react';
import { Note } from '@/types/patientNotes';

interface NoteItemProps {
  note: Note;
  formatDate: (timestamp: string) => string;
  onDelete: (id: string) => Promise<boolean>;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, formatDate, onDelete }) => {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {formatDate(note.timestamp)}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(note.id)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete note</span>
        </Button>
      </div>
      <div className="text-sm whitespace-pre-wrap">{note.content}</div>
    </div>
  );
};

export default NoteItem;
