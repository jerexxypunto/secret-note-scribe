
import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { EncryptionMethod } from "@/utils/encryption";

interface NoteFooterActionsProps {
  isEditing: boolean;
  isDecrypted: boolean;
  encryptionMethod: EncryptionMethod;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onHideContent: () => void;
}

const NoteFooterActions: React.FC<NoteFooterActionsProps> = ({
  isEditing,
  isDecrypted,
  encryptionMethod,
  onEdit,
  onCancel,
  onSave,
  onHideContent
}) => {
  if (isEditing) {
    return (
      <div className="flex space-x-2 w-full">
        <Button 
          onClick={onCancel}
          variant="outline"
          className="flex-1"
        >
          Cancel
        </Button>
        <Button 
          onClick={onSave}
          className="flex-1 bg-orange hover:bg-orange/90"
        >
          Save
        </Button>
      </div>
    );
  }

  if (encryptionMethod !== 'none' && isDecrypted) {
    return (
      <Button 
        onClick={onHideContent}
        variant="outline" 
        className="w-full text-orange border-orange hover:bg-orange/10"
      >
        Hide Content
      </Button>
    );
  }

  if (encryptionMethod === 'none' || isDecrypted) {
    return (
      <Button 
        onClick={onEdit}
        variant="outline" 
        className="w-full text-orange border-orange hover:bg-orange/10"
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </Button>
    );
  }

  return null;
};

export default NoteFooterActions;
