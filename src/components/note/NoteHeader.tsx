
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash, Lock, Unlock } from "lucide-react";
import { EncryptionMethod } from "@/utils/encryption";

interface NoteHeaderProps {
  encryptionMethod: EncryptionMethod;
  onDelete: () => void;
}

const NoteHeader: React.FC<NoteHeaderProps> = ({
  encryptionMethod,
  onDelete
}) => {
  return (
    <div className="p-4 pb-0 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {encryptionMethod !== 'none' ? (
          <Lock className="h-4 w-4 text-orange" />
        ) : (
          <Unlock className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="text-sm font-medium">
          {encryptionMethod !== 'none' 
            ? `Encrypted with ${encryptionMethod}` 
            : 'Unencrypted'}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="h-8 w-8 text-destructive hover:text-destructive/80"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NoteHeader;
