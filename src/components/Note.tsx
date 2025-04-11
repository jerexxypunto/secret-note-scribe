
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Lock, Unlock, Edit } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { EncryptionMethod, encryptText, decryptText } from "@/utils/encryption";
import { useToast } from "@/components/ui/use-toast";

export interface NoteData {
  id: string;
  content: string;
  isEncrypted: boolean;
  encryptionMethod: EncryptionMethod;
}

interface NoteProps {
  note: NoteData;
  onDelete: (id: string) => void;
  onUpdate: (id: string, content: string, encryptionMethod: EncryptionMethod) => void;
}

const Note: React.FC<NoteProps> = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [encryptionMethod, setEncryptionMethod] = useState<EncryptionMethod>(note.encryptionMethod || 'none');
  const [decryptedContent, setDecryptedContent] = useState('');
  const [isDecrypted, setIsDecrypted] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    // For Atbash cipher, we don't need a password
    if (encryptionMethod !== 'none' && encryptionMethod !== 'Atbash' && !password) {
      toast({
        title: "Password required",
        description: "Please enter a password to encrypt your note",
        variant: "destructive"
      });
      return;
    }

    try {
      let finalContent = content;
      if (encryptionMethod !== 'none') {
        finalContent = encryptText(content, encryptionMethod, password);
      }
      
      onUpdate(note.id, finalContent, encryptionMethod);
      setIsEditing(false);
      setShowPasswordInput(false);
      setIsDecrypted(false);
      
      toast({
        title: "Note updated",
        description: encryptionMethod !== 'none' 
          ? `Your note has been encrypted with ${encryptionMethod}` 
          : "Your note has been saved"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encrypt note",
        variant: "destructive"
      });
    }
  };

  const handleDecrypt = () => {
    // For Atbash, we don't need a password
    if (note.encryptionMethod !== 'Atbash' && !password) {
      toast({
        title: "Password required",
        description: "Please enter the password to decrypt this note",
        variant: "destructive"
      });
      return;
    }

    try {
      const decrypted = decryptText(note.content, note.encryptionMethod, password);
      if (decrypted) {
        setDecryptedContent(decrypted);
        setIsDecrypted(true);
        toast({
          title: "Note decrypted",
          description: "Your note has been successfully decrypted"
        });
      } else {
        toast({
          title: "Decryption failed",
          description: "Incorrect password or corrupted data",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decrypt note",
        variant: "destructive"
      });
    }
  };

  const handleEncryptionChange = (value: string) => {
    setEncryptionMethod(value as EncryptionMethod);
    // Only show password input for methods other than 'none' and 'Atbash'
    setShowPasswordInput(value !== 'none' && value !== 'Atbash');
  };

  return (
    <Card className="note bg-white border-orange/20 h-full flex flex-col">
      <CardHeader className="p-4 pb-0 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {note.encryptionMethod !== 'none' ? (
            <Lock className="h-4 w-4 text-orange" />
          ) : (
            <Unlock className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium">
            {note.encryptionMethod !== 'none' 
              ? `Encrypted with ${note.encryptionMethod}` 
              : 'Unencrypted'}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(note.id)}
          className="h-8 w-8 text-destructive hover:text-destructive/80"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-4 flex-grow">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note..."
              className="resize-none h-24 focus-visible:ring-orange"
            />
            
            <div className="flex flex-col space-y-2">
              <Select 
                onValueChange={handleEncryptionChange}
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
        ) : note.encryptionMethod !== 'none' && !isDecrypted ? (
          <div className="space-y-3">
            <div className="p-3 bg-muted/40 rounded text-muted-foreground text-sm">
              This note is encrypted
              {note.encryptionMethod !== 'Atbash' ? 
                ". Enter the password to decrypt." : 
                " with Atbash cipher."}
            </div>
            {note.encryptionMethod !== 'Atbash' && (
              <Input
                type="password"
                placeholder="Enter decryption password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus-visible:ring-orange"
              />
            )}
            <Button 
              onClick={handleDecrypt}
              variant="outline" 
              className="w-full border-orange text-orange hover:bg-orange/10"
            >
              Decrypt
            </Button>
          </div>
        ) : (
          <div className="prose-sm break-words">
            {isDecrypted ? decryptedContent : note.content}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {!isEditing && note.encryptionMethod !== 'none' && isDecrypted && (
          <Button 
            onClick={() => setIsDecrypted(false)}
            variant="outline" 
            className="w-full text-orange border-orange hover:bg-orange/10"
          >
            Hide Content
          </Button>
        )}
        
        {!isEditing && (note.encryptionMethod === 'none' || isDecrypted) && (
          <Button 
            onClick={() => {
              setIsEditing(true);
              setContent(isDecrypted ? decryptedContent : note.content);
            }}
            variant="outline" 
            className="w-full text-orange border-orange hover:bg-orange/10"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
        
        {isEditing && (
          <div className="flex space-x-2 w-full">
            <Button 
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="flex-1 bg-orange hover:bg-orange/90"
            >
              Save
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Note;
