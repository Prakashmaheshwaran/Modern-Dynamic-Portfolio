import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { scrollToSection } from '../../utils/scrollUtils';
import soundManager from '../../utils/soundManager';
import {
  FaHome,
  FaRoute,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaLink
} from 'react-icons/fa';
import { SiDevdotto } from 'react-icons/si';
import { IconType } from 'react-icons';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: IconType;
  tooltip: string;
  isExternal?: boolean;
  url?: string;
}

const activePulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 140, 0, 0.3); }
  50% { box-shadow: 0 0 0 4px rgba(255, 140, 0, 0.1); }
`;

const NavContainer = styled(motion.nav)<{ $isHidden: boolean }>`
  position: fixed;
  right: ${props => props.$isHidden ? '-80px' : '0.75rem'};
  top: 50%;
  transform: translateY(-50%);
  background: rgba(10, 11, 13, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 140, 0, 0.1);
  border-radius: 2px;
  padding: 0.6rem 0.4rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 140, 0, 0.05);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.$isHidden ? 0.3 : 1};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 140, 0, 0.4), transparent);
  }

  &:hover {
    background: rgba(10, 11, 13, 0.97);
    border-color: rgba(255, 140, 0, 0.2);
    right: 0.75rem;
    opacity: 1;
  }

  @media (max-width: 768px) {
    right: ${props => props.$isHidden ? '-80px' : '0.5rem'};
    padding: 0.4rem 0.3rem;
    gap: 0.2rem;
    top: 15%;
    transform: none;
  }

  @media (max-width: 480px) {
    right: ${props => props.$isHidden ? '-80px' : '0.4rem'};
    top: 10%;
  }

  @media (max-width: 320px) { display: none; }
`;

const NavIcon = styled(motion.button)<{ $isActive: boolean }>`
  width: 36px;
  height: 36px;
  background: ${props => props.$isActive ? 'rgba(255, 140, 0, 0.12)' : 'transparent'};
  border: ${props => props.$isActive ? '1px solid rgba(255, 140, 0, 0.3)' : '1px solid transparent'};
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$isActive ? '#ff8c00' : 'rgba(255, 255, 255, 0.5)'};
  transition: all 0.2s ease;
  position: relative;
  font-size: 0.9rem;
  ${props => props.$isActive && css`animation: ${activePulse} 2s ease-in-out infinite;`}

  &:hover {
    color: #ff8c00;
    background: rgba(255, 140, 0, 0.1);
    border-color: rgba(255, 140, 0, 0.2);
  }

  &:active {
    transform: scale(0.92);
  }

  @media (max-width: 768px) { width: 30px; height: 30px; font-size: 0.8rem; }
  @media (max-width: 480px) { width: 26px; height: 26px; font-size: 0.75rem; }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 0.75rem;
  background: rgba(10, 11, 13, 0.95);
  color: var(--cod-orange, #ff8c00);
  padding: 0.35rem 0.7rem;
  border-radius: 2px;
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
  pointer-events: none;
  border: 1px solid rgba(255, 140, 0, 0.15);

  &::before {
    content: '';
    position: absolute;
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid rgba(10, 11, 13, 0.95);
  }

  @media (max-width: 768px) { display: none; }
`;

const Divider = styled.div`
  width: 60%;
  height: 1px;
  background: rgba(255, 140, 0, 0.1);
  margin: 0.15rem 0;
`;

const navItems: NavItem[] = [
  { id: 'hero', label: 'HQ', icon: FaHome, tooltip: 'HQ' },
  { id: 'about', label: 'Dossier', icon: FaRoute, tooltip: 'Dossier' },
  { id: 'github', label: 'GitHub', icon: FaGithub, tooltip: 'Arsenal', isExternal: true, url: 'https://github.com/Prakashmaheshwaran' },
  { id: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, tooltip: 'Network', isExternal: true, url: 'https://www.linkedin.com/in/prakash-maheshwaran/' },
  { id: 'devto', label: 'Dev.to', icon: SiDevdotto, tooltip: 'Dispatch', isExternal: true, url: 'https://dev.to/prakash_maheshwaran' },
  { id: 'biolink', label: 'Bio Link', icon: FaLink, tooltip: 'Comms', isExternal: true, url: 'https://bio.link/kash_' },
  { id: 'email', label: 'Email', icon: FaEnvelope, tooltip: 'Contact', isExternal: true, url: 'mailto:pmaheshwaran@binghamton.edu' }
];

const Navigation: React.FC<NavigationProps> = ({ currentSection, onSectionChange }) => {
  const sectionIds = navItems.filter(item => !item.isExternal).map(item => item.id);
  const activeSection = useScrollSpy({ sections: sectionIds, offset: 100 });
  const [isHidden, setIsHidden] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    onSectionChange(activeSection);
  }, [activeSection, onSectionChange]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) { setIsHidden(false); return; }

    const handleScroll = () => {
      setIsHidden(false);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      const timeout = setTimeout(() => setIsHidden(true), 6000);
      setScrollTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const initialTimeout = setTimeout(() => setIsHidden(true), 6000);
    setScrollTimeout(initialTimeout);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [scrollTimeout]);

  const handleNavClick = (item: NavItem) => {
    soundManager.playUIClick();
    if (item.isExternal && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      scrollToSection(item.id);
    }
  };

  const navVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.06, delayChildren: 0.2 }
    }
  };

  const iconVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  const internalItems = navItems.filter(i => !i.isExternal);
  const externalItems = navItems.filter(i => i.isExternal);

  return (
    <NavContainer
      $isHidden={isHidden}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      {internalItems.map((item) => {
        const IconComponent = item.icon as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
        const isActive = activeSection === item.id;
        return (
          <motion.div key={item.id} variants={iconVariants} style={{ position: 'relative' }}>
            <NavIcon
              $isActive={isActive}
              onClick={() => handleNavClick(item)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={item.tooltip}
            >
              <IconComponent />
              <Tooltip
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
              >
                {item.tooltip}
              </Tooltip>
            </NavIcon>
          </motion.div>
        );
      })}
      <Divider />
      {externalItems.map((item) => {
        const IconComponent = item.icon as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
        return (
          <motion.div key={item.id} variants={iconVariants} style={{ position: 'relative' }}>
            <NavIcon
              $isActive={false}
              onClick={() => handleNavClick(item)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={item.tooltip}
            >
              <IconComponent />
              <Tooltip
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
              >
                {item.tooltip}
              </Tooltip>
            </NavIcon>
          </motion.div>
        );
      })}
    </NavContainer>
  );
};

export default Navigation;
