
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { EncryptionMethod } from "@/utils/encryption";
import { useToast } from "@/components/ui/use-toast";
import NoteHeader from "@/components/note/NoteHeader";
import NoteEditor from "@/components/note/NoteEditor";
import EncryptedNoteView from "@/components/note/EncryptedNoteView";
import NoteFooterActions from "@/components/note/NoteFooterActions";
import { useNoteEncryption } from "@/components/note/NoteEncryptionUtils";

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
  const { handleEncrypt, handleDecrypt } = useNoteEncryption();

  const handleSave = () => {
    const finalContent = handleEncrypt(content, encryptionMethod, password);
    if (finalContent !== null) {
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
    }
  };

  const handleDecryptNote = () => {
    const decrypted = handleDecrypt(note.content, note.encryptionMethod, password);
    if (decrypted !== null) {
      setDecryptedContent(decrypted);
      setIsDecrypted(true);
    }
  };

  const handleEncryptionChange = (value: string) => {
    setEncryptionMethod(value as EncryptionMethod);
    // Only show password input for methods other than 'none' and 'Atbash'
    setShowPasswordInput(value !== 'none' && value !== 'Atbash');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setContent(isDecrypted ? decryptedContent : note.content);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleHideContent = () => {
    setIsDecrypted(false);
  };

  return (
    <Card className="note bg-white border-orange/20 h-full flex flex-col">
      <CardHeader className="p-0">
        <NoteHeader 
          encryptionMethod={note.encryptionMethod} 
          onDelete={() => onDelete(note.id)} 
        />
      </CardHeader>
      
      <CardContent className="p-4 flex-grow">
        {isEditing ? (
          <NoteEditor
            content={content}
            setContent={setContent}
            encryptionMethod={encryptionMethod}
            onEncryptionChange={handleEncryptionChange}
            showPasswordInput={showPasswordInput}
            password={password}
            setPassword={setPassword}
          />
        ) : note.encryptionMethod !== 'none' && !isDecrypted ? (
          <EncryptedNoteView
            encryptionMethod={note.encryptionMethod}
            password={password}
            setPassword={setPassword}
            onDecrypt={handleDecryptNote}
          />
        ) : (
          <div className="prose-sm break-words">
            {isDecrypted ? decryptedContent : note.content}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <NoteFooterActions
          isEditing={isEditing}
          isDecrypted={isDecrypted}
          encryptionMethod={note.encryptionMethod}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onSave={handleSave}
          onHideContent={handleHideContent}
        />
      </CardFooter>
    </Card>
  );
};

export default Note;
