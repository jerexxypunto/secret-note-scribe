
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EncryptionMethod } from "@/utils/encryption";

interface EncryptedNoteViewProps {
  encryptionMethod: EncryptionMethod;
  password: string;
  setPassword: (password: string) => void;
  onDecrypt: () => void;
}

const EncryptedNoteView: React.FC<EncryptedNoteViewProps> = ({
  encryptionMethod,
  password,
  setPassword,
  onDecrypt
}) => {
  return (
    <div className="space-y-3">
      <div className="p-3 bg-muted/40 rounded text-muted-foreground text-sm">
        This note is encrypted
        {encryptionMethod !== 'Atbash' ? 
          ". Enter the password to decrypt." : 
          " with Atbash cipher."}
      </div>
      {encryptionMethod !== 'Atbash' && (
        <Input
          type="password"
          placeholder="Enter decryption password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="focus-visible:ring-orange"
        />
      )}
      <Button 
        onClick={onDecrypt}
        variant="outline" 
        className="w-full border-orange text-orange hover:bg-orange/10"
      >
        Decrypt
      </Button>
    </div>
  );
};

export default EncryptedNoteView;
