import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { scrollToSection } from '../../utils/scrollUtils';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const NavContainer = styled(motion.nav)`
  position: fixed;
  bottom: 1rem;
  left: 30%;
  transform: translateX(-50%);
  background: rgba(15, 35, 65, 0.08);
  backdrop-filter: blur(60px) saturate(200%) brightness(120%);
  -webkit-backdrop-filter: blur(60px) saturate(200%) brightness(120%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 60px;
  padding: 0.3rem 2.5rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 8px 40px rgba(0, 0, 0, 0.08),
    0 4px 20px rgba(0, 0, 0, 0.05),
    0 2px 8px rgba(0, 0, 0, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(255, 255, 255, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateX(-50%) translateY(-4px);
    background: rgba(15, 35, 65, 0.12);
    border: 1px solid rgba(0, 255, 170, 0.4);
    box-shadow: 
      0 20px 80px rgba(0, 0, 0, 0.12),
      0 10px 40px rgba(0, 255, 170, 0.08),
      0 5px 20px rgba(0, 255, 170, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.5),
      inset 0 -1px 0 rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    left: 50%;
    bottom: 0.75rem;
    padding: 0.25rem 2rem;
    border-radius: 50px;
  }

  @media (max-width: 480px) {
    left: 50%;
    bottom: 0.5rem;
    padding: 0.2rem 1.5rem;
    border-radius: 40px;
  }
`;

const NavMenu = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.01rem;
`;

const NavLink = styled(motion.button)<{ isActive: boolean }>`
  padding: 0.8rem 1.6rem;
  background: ${props => props.isActive ? 'rgba(0, 255, 170, 0.12)' : 'transparent'};
  border: ${props => props.isActive ? '1px solid rgba(0, 255, 170, 0.25)' : '1px solid transparent'};
  border-radius: 40px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.isActive ? 'var(--accent-green)' : 'rgba(255, 255, 255, 0.9)'};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  white-space: nowrap;
  letter-spacing: 0.025em;
  min-width: fit-content;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: ${props => props.isActive ? 'blur(20px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.isActive ? 'blur(20px)' : 'none'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 255, 170, 0.1), rgba(255, 106, 255, 0.1));
    border-radius: 40px;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: scale(0.8);
  }

  &:hover {
    color: var(--accent-green);
    background: rgba(0, 255, 170, 0.12);
    border: 1px solid rgba(0, 255, 170, 0.25);
    transform: translateY(-2px) scale(1.05);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 
      0 8px 25px rgba(0, 255, 170, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    
    &::before {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    padding: 0.7rem 1.3rem;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1.1rem;
    font-size: 0.8rem;
  }
`;

const sections = [
  { id: 'hero', label: 'Home' },
  // { id: 'about', label: 'About' }, i commented out
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' }
];

const Navigation: React.FC<NavigationProps> = ({ currentSection, onSectionChange }) => {
  const sectionIds = sections.map(section => section.id);
  const activeSection = useScrollSpy({ sections: sectionIds, offset: 100 });

  // Update parent component when section changes
  useEffect(() => {
    onSectionChange(activeSection);
  }, [activeSection, onSectionChange]);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  const navVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const linkVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  };

  return (
    <NavContainer
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <NavMenu>
        {sections.map((section) => (
          <motion.div key={section.id} variants={linkVariants}>
            <NavLink
              isActive={activeSection === section.id}
              onClick={() => handleNavClick(section.id)}
              whileHover={{ 
                scale: 1.05,
                transition: { 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10 
                }
              }}
              whileTap={{ 
                scale: 0.95,
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
              title={section.label}
            >
              {section.label}
            </NavLink>
          </motion.div>
        ))}
      </NavMenu>
    </NavContainer>
  );
};

export default Navigation;
