import React, { useState } from 'react';
import NotesContainer from '@/components/NotesContainer';
import HelpModal from '@/components/HelpModal';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';

const Index = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-light-green main-container">
      
      <Header setShowModal={setShowModal} />
      <HelpModal isVisible={showModal} onClose={() => setShowModal(false)} />
      <main className="container py-8 px-4 md:py-12 animate-fade-in">
        <NotesContainer />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
