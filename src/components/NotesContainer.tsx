
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Note, { NoteData } from "@/components/Note";
import { useToast } from "@/components/ui/use-toast";
import { EncryptionMethod } from "@/utils/encryption";

const STORAGE_KEY = 'secure-sticky-notes';

const NotesContainer: React.FC = () => {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const { toast } = useToast();

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error('Failed to parse saved notes:', error);
        toast({
          title: "Error",
          description: "Failed to load your saved notes",
          variant: "destructive"
        });
      }
    }
  }, [toast]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote: NoteData = {
      id: Date.now().toString(),
      content: '',
      isEncrypted: false,
      encryptionMethod: 'none'
    };
    
    setNotes(prevNotes => [newNote, ...prevNotes]);
  };

  const deleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    toast({
      title: "Note deleted",
      description: "Your note has been deleted"
    });
  };

  const updateNote = (id: string, content: string, encryptionMethod: EncryptionMethod) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id 
          ? { 
              ...note, 
              content, 
              isEncrypted: encryptionMethod !== 'none',
              encryptionMethod 
            } 
          : note
      )
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Secure Notes</h2>
        <Button 
          onClick={addNote}
          className="bg-orange hover:bg-orange/90"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Note
        </Button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-muted-foreground/20 rounded-lg">
          <p className="text-muted-foreground">You don't have any notes yet.</p>
          <Button 
            onClick={addNote} 
            variant="outline" 
            className="mt-4 border-orange text-orange hover:bg-orange/10"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create your first note
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <div key={note.id} className="animate-scale-in">
              <Note 
                note={note} 
                onDelete={deleteNote} 
                onUpdate={updateNote} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesContainer;
