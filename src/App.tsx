import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navigation from './components/Navigation/Navigation';
import HeroSection from './components/Hero/HeroSection';
import AboutSection from './components/About/AboutSection';
import ProjectsSection from './components/Projects/ProjectsSection';
import TechToolsSection from './components/TechTools/TechToolsSection';
import BlogSection from './components/Blog/BlogSection';
import ContactSection from './components/Contact/ContactSection';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

// Styles
import GlobalStyles from './styles/GlobalStyles';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #0B1D3A;
  overflow-x: hidden;
`;

const ContentWrapper = styled(motion.div)`
  opacity: 0;
`;

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <AnimatePresence>
          {isLoading && <LoadingScreen key="loading" />}
        </AnimatePresence>

        {!isLoading && (
          <ContentWrapper
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
            <ContactSection />
          </ContentWrapper>
        )}
      </AppContainer>
    </>
  );
}

export default App;