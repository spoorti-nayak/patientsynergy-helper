
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save } from 'lucide-react';

interface NoteFormProps {
  onSave: (content: string) => Promise<boolean>;
  onCancel: () => void;
  isSaving: boolean;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSave, onCancel, isSaving }) => {
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!content.trim()) return;
    
    const success = await onSave(content);
    if (success) {
      setContent('');
    }
  };

  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Enter your notes about the patient here..."
        className="min-h-[120px] resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          size="sm" 
          onClick={handleSave}
          disabled={!content.trim() || isSaving}
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
  );
};

export default NoteForm;
