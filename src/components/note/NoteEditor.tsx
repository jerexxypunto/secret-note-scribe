
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EncryptionMethod } from "@/utils/encryption";

interface NoteEditorProps {
  content: string;
  setContent: (content: string) => void;
  encryptionMethod: EncryptionMethod;
  onEncryptionChange: (value: string) => void;
  showPasswordInput: boolean;
  password: string;
  setPassword: (password: string) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  content,
  setContent,
  encryptionMethod,
  onEncryptionChange,
  showPasswordInput,
  password,
  setPassword
}) => {
  return (
    <div className="space-y-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        className="resize-none h-24 focus-visible:ring-orange"
      />
      
      <div className="flex flex-col space-y-2">
        <Select 
          onValueChange={onEncryptionChange}
          defaultValue={encryptionMethod}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Encryption Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Encryption</SelectItem>
            <SelectItem value="AES">AES</SelectItem>
            <SelectItem value="DES">DES</SelectItem>
            <SelectItem value="RC4">RC4</SelectItem>
            <SelectItem value="Atbash">Atbash</SelectItem>
          </SelectContent>
        </Select>
        
        {showPasswordInput && (
          <Input
            type="password"
            placeholder="Enter encryption password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus-visible:ring-orange"
          />
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
