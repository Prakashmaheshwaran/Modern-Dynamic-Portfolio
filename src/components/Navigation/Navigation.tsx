import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { scrollToSection } from '../../utils/scrollUtils';
import { 
  FaHome, 
  FaRoute, 
  FaCalendarAlt, 
  FaGithub, 
  FaLinkedin,
  FaEnvelope
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

const NavContainer = styled(motion.nav)<{ isHidden: boolean }>`
  position: fixed;
  right: ${props => props.isHidden ? '-80px' : '1rem'};
  top: 20%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 0.8rem 0.6rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 4px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.isHidden ? 0.3 : 1};

  &:hover {
    background: rgba(0, 0, 0, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.5),
      0 6px 20px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    right: 1rem;
    opacity: 1;
  }

  /* Tablet styles */
  @media (max-width: 1024px) {
    right: ${props => props.isHidden ? '-80px' : '1.5rem'};
    padding: 0.7rem 0.5rem;
    gap: 0.4rem;
  }

  /* Mobile landscape */
  @media (max-width: 768px) {
    right: ${props => props.isHidden ? '-80px' : '1rem'};
    padding: 0.6rem 0.4rem;
    gap: 0.3rem;
    border-radius: 12px;
    top: 15%;
  }

  /* Mobile portrait */
  @media (max-width: 480px) {
    right: ${props => props.isHidden ? '-80px' : '0.75rem'};
    padding: 0.5rem 0.3rem;
    gap: 0.25rem;
    border-radius: 10px;
    top: 10%;
  }

  /* Very small screens */
  @media (max-width: 360px) {
    right: ${props => props.isHidden ? '-80px' : '0.5rem'};
    padding: 0.4rem 0.25rem;
    gap: 0.2rem;
    border-radius: 8px;
    top: 8%;
  }
  
  /* Hide navigation on very small screens to prevent clutter */
  @media (max-width: 320px) {
    display: none;
  }
`;

const NavIcon = styled(motion.button)<{ isActive: boolean }>`
  width: 40px;
  height: 40px;
  background: ${props => props.isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
  border: ${props => props.isActive ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent'};
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  font-size: 1rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
    border-radius: 10px;
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover {
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    
    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0px) scale(0.95);
  }

  /* Tablet styles */
  @media (max-width: 1024px) {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }

  /* Mobile landscape */
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 0.85rem;
    border-radius: 8px;
  }

  /* Mobile portrait */
  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
    border-radius: 6px;
  }

  /* Very small screens */
  @media (max-width: 360px) {
    width: 24px;
    height: 24px;
    font-size: 0.7rem;
    border-radius: 5px;
  }

  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: none;
      background: ${props => props.isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
      border: ${props => props.isActive ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent'};
      box-shadow: none;
    }

    &:active {
      transform: scale(0.9);
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.4);
    }
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 1rem;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  white-space: nowrap;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid rgba(0, 0, 0, 0.9);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: FaHome, tooltip: 'Home' },
  { id: 'about', label: 'Roadmap', icon: FaRoute, tooltip: 'About & Roadmap' },
  { id: 'meeting', label: 'Schedule', icon: FaCalendarAlt, tooltip: 'Schedule a Meeting', isExternal: true, url: 'https://calendar.app.google/QSuCRsA3F3YooueM6' },
  { id: 'github', label: 'GitHub', icon: FaGithub, tooltip: 'GitHub Profile', isExternal: true, url: 'https://github.com/Prakashmaheshwaran' },
  { id: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, tooltip: 'LinkedIn Profile', isExternal: true, url: 'https://www.linkedin.com/in/prakash-maheshwaran/' },
  { id: 'devto', label: 'Dev.to', icon: SiDevdotto, tooltip: 'Dev.to Blog', isExternal: true, url: 'https://dev.to/prakash_maheshwaran' },
  { id: 'email', label: 'Email', icon: FaEnvelope, tooltip: 'Send Email', isExternal: true, url: 'mailto:pmaheshwaran@binghamton.edu' }
];

const Navigation: React.FC<NavigationProps> = ({ currentSection, onSectionChange }) => {
  const sectionIds = navItems.filter(item => !item.isExternal).map(item => item.id);
  const activeSection = useScrollSpy({ sections: sectionIds, offset: 100 });
  const [isHidden, setIsHidden] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  // Update parent component when section changes
  useEffect(() => {
    onSectionChange(activeSection);
  }, [activeSection, onSectionChange]);

  // Auto-hide navigation only on mobile devices
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    
    // Only apply auto-hide behavior on mobile devices
    if (!isMobile) {
      setIsHidden(false); // Always show on desktop
      return;
    }

    const handleScroll = () => {
      // Show navigation immediately when scrolling
      setIsHidden(false);
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Set new timeout to hide navigation after 6 seconds
      const timeout = setTimeout(() => {
        setIsHidden(true);
      }, 6000);
      
      setScrollTimeout(timeout);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial timeout to hide navigation after 6 seconds
    const initialTimeout = setTimeout(() => {
      setIsHidden(true);
    }, 6000);
    setScrollTimeout(initialTimeout);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  const handleNavClick = (item: NavItem) => {
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
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const iconVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  };

  return (
    <NavContainer
      isHidden={isHidden}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      {navItems.map((item) => {
        const IconComponent = item.icon as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
        const isActive = activeSection === item.id;
        
        return (
          <motion.div key={item.id} variants={iconVariants} style={{ position: 'relative' }}>
            <NavIcon
              isActive={isActive}
              onClick={() => handleNavClick(item)}
              whileHover={{ 
                scale: 1.1,
                transition: { 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10 
                }
              }}
              whileTap={{ 
                scale: 0.9,
                transition: { 
                  type: "spring", 
                  stiffness: 600, 
                  damping: 15 
                }
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              title={item.tooltip}
            >
              <IconComponent />
              <Tooltip
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
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
