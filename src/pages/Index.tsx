
import React from 'react';
import NotesContainer from '@/components/NotesContainer';
import { LockKeyhole } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-light-green">
      <header className="py-6 px-4 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center">
          <LockKeyhole className="h-8 w-8 text-orange mr-2" />
          <h1 className="text-2xl md:text-3xl font-bold">Secret Note Scribe</h1>
        </div>
      </header>
      
      <main className="container py-8 px-4 md:py-12 animate-fade-in">
        <NotesContainer />
      </main>
      
      <footer className="py-6 px-4 text-center text-sm text-muted-foreground">
        <p>Secret Note Scribe - Securely encrypt your personal notes</p>
      </footer>
    </div>
  );
};

export default Index;
