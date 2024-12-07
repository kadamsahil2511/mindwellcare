import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { AboutPage } from './pages/AboutPage';
import { DailyNotes } from './components/DailyNotes';
import { Chat } from './components/Chat';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  // Handle hash-based navigation
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'landing';
      setCurrentPage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Handle initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'assessment' && <AssessmentPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'notes' && <DailyNotes />}
      {currentPage === 'chat' && <Chat />}
    </>
  );
}

export default App;