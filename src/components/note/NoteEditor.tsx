
import React, { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EncryptionMethod, encryptText } from "@/utils/encryption";

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
  const [previewEncrypted, setPreviewEncrypted] = useState<string>('');
  
  // Update the preview when content, encryption method or password changes
  useEffect(() => {
    if (encryptionMethod !== 'none') {
      // For Atbash, we don't need a password
      const effectivePassword = encryptionMethod === 'Atbash' ? '' : password;
      // Only show preview if there's content to encrypt
      if (content) {
        try {
          const encrypted = encryptText(content, encryptionMethod, effectivePassword);
          setPreviewEncrypted(encrypted);
        } catch (error) {
          console.error('Preview encryption error:', error);
          setPreviewEncrypted('Error generating preview');
        }
      } else {
        setPreviewEncrypted('');
      }
    } else {
      setPreviewEncrypted('');
    }
  }, [content, encryptionMethod, password]);

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
        
        {encryptionMethod !== 'none' && previewEncrypted && (
          <div className="p-3 bg-muted/40 rounded border border-orange/20">
            <p className="text-xs text-muted-foreground mb-1">Encrypted preview:</p>
            <p className="text-sm font-mono break-words">{previewEncrypted}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
