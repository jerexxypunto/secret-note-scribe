import React, { useState } from 'react';
import NotesContainer from '@/components/NotesContainer';
import { LockKeyhole } from 'lucide-react';
import HelpModal from '@/components/HelpModal';

const Index = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-light-green">
      <header className="py-6 px-4 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <LockKeyhole className="h-8 w-8 text-orange mr-2" />
            <h1 className="text-2xl md:text-3xl font-bold">Secret Note Scribe</h1>
          </div>
          <button
            className="h-8 w-8 flex items-center justify-center bg-light-green text-white rounded-full shadow hover:bg-green-600 focus:outline-none"
            aria-label="Help"
            onClick={() => setShowModal(true)}
          >
            ?
          </button>
        </div>
      </header>

      <HelpModal isVisible={showModal} onClose={() => setShowModal(false)} />

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
