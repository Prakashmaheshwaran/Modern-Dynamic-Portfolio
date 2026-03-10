import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navigation from './components/Navigation/Navigation';
import HeroSection from './components/Hero/HeroSection';
import AboutSection from './components/About/AboutSection';
import ProjectsSection from './components/Projects/ProjectsSection';
import TechToolsSection from './components/TechTools/TechToolsSection';
import BlogSection from './components/Blog/BlogSection';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import CharacterSelectScreen from './components/CharacterSelect/CharacterSelectScreen';
import ComingSoonScreen from './components/ComingSoon/ComingSoonScreen';

// Data & Types
import { PersonaType } from './types/persona';
import { personas } from './data/personaData';

// Styles
import GlobalStyles from './styles/GlobalStyles';

// Sound
import soundManager from './utils/soundManager';

type AppPhase = 'loading' | 'character-select' | 'portfolio' | 'coming-soon';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: var(--primary-bg, #0a0b0d);
  overflow-x: hidden;
`;

const ContentWrapper = styled(motion.div)`
  opacity: 0;
`;

const MuteButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1001;
  width: 36px;
  height: 36px;
  background: rgba(10, 11, 13, 0.9);
  border: 1px solid rgba(255, 140, 0, 0.15);
  color: rgba(255, 140, 0, 0.6);
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));

  &:hover {
    border-color: rgba(255, 140, 0, 0.3);
    color: rgba(255, 140, 0, 0.9);
  }

  @media (max-width: 480px) {
    bottom: 0.5rem;
    right: 0.5rem;
    width: 30px;
    height: 30px;
    font-size: 0.7rem;
  }
`;

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

function App() {
  const [appPhase, setAppPhase] = useState<AppPhase>('loading');
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(null);
  const [currentSection, setCurrentSection] = useState('hero');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppPhase('character-select');
      soundManager.playNotification();
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const handleCharacterSelect = useCallback((persona: PersonaType) => {
    setSelectedPersona(persona);
    window.scrollTo(0, 0);

    const personaConfig = personas.find(p => p.id === persona);
    if (personaConfig?.isAvailable) {
      setAppPhase('portfolio');
    } else {
      setAppPhase('coming-soon');
    }
  }, []);

  const handleBackToSelect = useCallback(() => {
    setSelectedPersona(null);
    setAppPhase('character-select');
  }, []);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  const handleMuteToggle = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const selectedPersonaConfig = personas.find(p => p.id === selectedPersona);

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <AnimatePresence mode="wait">
          {appPhase === 'loading' && <LoadingScreen key="loading" />}

          {appPhase === 'character-select' && (
            <CharacterSelectScreen
              key="character-select"
              onSelect={handleCharacterSelect}
            />
          )}

          {appPhase === 'portfolio' && (
            <ContentWrapper
              key="portfolio"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <Navigation
                currentSection={currentSection}
                onSectionChange={handleSectionChange}
              />

              <HeroSection onSectionChange={handleSectionChange} />
              <AboutSection />
              <ProjectsSection />
              <TechToolsSection />
              <BlogSection />
            </ContentWrapper>
          )}

          {appPhase === 'coming-soon' && selectedPersonaConfig && (
            <ComingSoonScreen
              key="coming-soon"
              persona={selectedPersonaConfig}
              onBack={handleBackToSelect}
            />
          )}
        </AnimatePresence>

        <MuteButton
          onClick={handleMuteToggle}
          title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        >
          {isMuted ? '🔇' : '🔊'}
        </MuteButton>
      </AppContainer>
    </>
  );
}

export default App;
