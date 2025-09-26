import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import myGif from '../../assets/images/my.gif';

interface HeroSectionProps {
  onSectionChange: (section: string) => void;
}

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOutToLeft = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-20px);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
`;

const subtleGlow = keyframes`
  0%, 100% {
    text-shadow: 0 0 5px rgba(34, 197, 94, 0.3);
  }
  50% {
    text-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 30px rgba(34, 197, 94, 0.4);
  }
`;

const buttonPulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
`;

const cursorBlink = keyframes`
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
`;

const HeroContainer = styled.section`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background: var(--primary-bg);
  
  @media (max-width: 768px) {
    padding-top: 4rem;
    padding-bottom: 2rem;
    align-items: flex-start;
  }
  
  @media (max-width: 480px) {
    padding-top: 5rem;
    padding-bottom: 2rem;
    align-items: flex-start;
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  align-items: center;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0 1rem;
    margin-top: 1rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.75rem;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }
`;

const HeroImage = styled.div`
  width: 100%;
  max-width: 300px;
  height: 350px;
  border: 2px solid var(--accent-green);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeInLeft} 1s ease-out;
  position: relative;
  overflow: hidden;
  background: var(--primary-bg);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 1024px) {
    max-width: 250px;
    height: 280px;
    margin: 0 auto;
  }
  
  @media (max-width: 768px) {
    max-width: 200px;
    height: 220px;
  }
  
  @media (max-width: 480px) {
    max-width: 150px;
    height: 180px;
    order: 2; /* Move image below text and button on mobile */
    margin-top: 0.5rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${fadeInLeft} 1s ease-out 0.3s both;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.75rem;
    order: 1; /* Ensure text content comes first on mobile */
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 768px) {
    gap: 0.75rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const HeroGreeting = styled.span`
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  animation: ${fadeInUp} 1s ease-out 0.5s both;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const HeroName = styled.h1`
  font-family: var(--font-secondary);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: var(--text-primary);
  line-height: 1.1;
  letter-spacing: 0.02em;
  margin: 0;
  animation: ${fadeInUp} 1s ease-out 0.7s both;
  
  @media (max-width: 768px) {
    font-size: clamp(2rem, 8vw, 3rem);
    line-height: 1.2;
  }
  
  @media (max-width: 480px) {
    font-size: clamp(1.8rem, 10vw, 2.5rem);
    line-height: 1.3;
  }
`;

const RoleContainer = styled.div`
  position: relative;
  height: 50px;
  overflow: hidden;
  animation: ${fadeInUp} 1s ease-out 0.9s both;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    height: 45px;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    height: 40px;
    justify-content: center;
  }
`;

const AnimatedRole = styled.div<{ isVisible: boolean; isEntering: boolean; isLeaving: boolean }>`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 1.4rem;
  color: var(--accent-green);
  font-weight: 300;
  letter-spacing: 0.02em;
  white-space: nowrap;
  
  opacity: ${props => {
    if (props.isVisible && !props.isLeaving) return 1;
    if (props.isLeaving) return 0;
    return 0;
  }};
  
  transform: ${props => {
    const baseTransform = 'translateY(-50%)';
    if (props.isVisible && !props.isLeaving) return baseTransform;
    if (props.isLeaving) return `${baseTransform} translateX(-15px)`;
    return `${baseTransform} translateX(15px)`;
  }};
  
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${props => props.isVisible && !props.isLeaving && css`
    animation: ${subtleGlow} 2s ease-in-out infinite;
  `}
  
  @media (max-width: 1024px) {
    left: 50%;
    transform: translate(-50%, -50%);
    
    transform: ${props => {
      const baseTransform = 'translate(-50%, -50%)';
      if (props.isVisible && !props.isLeaving) return baseTransform;
      if (props.isLeaving) return `${baseTransform} translateX(-15px)`;
      return `${baseTransform} translateX(15px)`;
    }};
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const TypewriterCursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.4rem;
  background: var(--accent-green);
  margin-left: 2px;
  animation: ${cursorBlink} 1s infinite;
  vertical-align: text-bottom;
  
  @media (max-width: 768px) {
    height: 1.2rem;
  }
  
  @media (max-width: 480px) {
    height: 1.1rem;
  }
`;

const ActionSection = styled.div<{ isDropdownOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  align-items: flex-start;
  min-height: ${props => props.isDropdownOpen ? '80px' : 'auto'};
  transition: min-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 1024px) {
    align-items: center;
  }
  
  @media (max-width: 768px) {
    gap: 0.75rem;
    min-height: ${props => props.isDropdownOpen ? '80px' : 'auto'};
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
    min-height: ${props => props.isDropdownOpen ? '80px' : 'auto'};
  }
`;

const AnimatedButton = styled.button<{ isVisible: boolean }>`
  padding: 20px 40px;
  border: 2px solid var(--accent-green);
  background: transparent;
  color: var(--accent-green);
  font-size: 1.1rem;
  font-weight: 300;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)'};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--accent-green), transparent);
    transition: left 0.6s ease;
    z-index: -1;
  }
  
  &:hover {
    color: var(--primary-bg);
    border-color: var(--accent-green);
    transform: ${props => props.isVisible ? 'translateY(-2px) scale(1)' : 'translateY(-10px) scale(0.95)'};
    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: ${props => props.isVisible ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)'};
  }
  
  @media (max-width: 768px) {
    padding: 16px 32px;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 14px 28px;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
  }
`;

const ButtonText = styled.span`
  display: inline-block;
  transition: all 0.3s ease;
`;

const ContactButtons = styled.div<{ isOpen: boolean; isClosing: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  
  opacity: ${props => props.isOpen && !props.isClosing ? 1 : 0};
  visibility: ${props => props.isOpen || props.isClosing ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen && !props.isClosing ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)'};
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 0.875rem;
    max-width: 400px;
  }
  
  @media (max-width: 480px) {
    flex-direction: row;
    gap: 0.75rem;
    max-width: 350px;
  }
`;


const ContactOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.5rem;
  border: 2px solid var(--accent-green);
  border-radius: 0;
  background: rgba(34, 197, 94, 0.1);
  color: var(--accent-green);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-height: 50px;
  width: 100%;
  max-width: 200px;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.2), transparent);
    transition: left 0.6s ease;
    z-index: 0;
  }
  
  &:hover {
    background: var(--accent-green);
    color: var(--primary-bg);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
    border-color: var(--accent-green);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
    min-height: 45px;
    max-width: 180px;
    flex: 1;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    max-width: 160px;
    flex: 1;
  }
`;

const OptionText = styled.span`
  z-index: 1;
  position: relative;
  font-weight: 500;
`;





const HeroSection: React.FC<HeroSectionProps> = ({ onSectionChange }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownClosing, setIsDropdownClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const roles = [
    'AI Researcher',
    'Automation Engineer', 
    'AI Developer',
    'Full Stack Developer',
    'Love to draw and bake'
  ];

  // Typewriter effect
  useEffect(() => {
    if (!isTyping) return;

    const currentRole = roles[currentRoleIndex];
    const currentLength = displayedText.length;

    if (currentLength < currentRole.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, currentLength + 1));
      }, 100); // Typing speed: 100ms per character

      return () => clearTimeout(timeout);
    } else {
      // Finished typing, wait a bit then start erasing
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, 2000); // Wait 2 seconds before erasing

      return () => clearTimeout(timeout);
    }
  }, [displayedText, isTyping, currentRoleIndex, roles]);

  // Erasing effect
  useEffect(() => {
    if (isTyping) return;

    const currentRole = roles[currentRoleIndex];
    const currentLength = displayedText.length;

    if (currentLength > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, currentLength - 1));
      }, 50); // Erasing speed: 50ms per character

      return () => clearTimeout(timeout);
    } else {
      // Finished erasing, move to next role
      const timeout = setTimeout(() => {
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setIsTyping(true);
      }, 500); // Wait 500ms before starting next role

      return () => clearTimeout(timeout);
    }
  }, [displayedText, isTyping, currentRoleIndex, roles]);

  // Start typing when component mounts or role changes
  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');
  }, [currentRoleIndex]);

  const handleButtonClick = () => {
    setIsDropdownOpen(true);
    setIsDropdownClosing(false);
  };

  const closeDropdown = () => {
    setIsDropdownClosing(true);
    setTimeout(() => {
      setIsDropdownOpen(false);
      setIsDropdownClosing(false);
    }, 300);
  };


  const handleScheduleMeeting = () => {
    // You can replace this with your actual calendar link
    window.open('https://calendar.app.google/QSuCRsA3F3YooueM6', '_blank');
    closeDropdown();
  };

  const handleSendEmail = () => {
    // You can replace this with your actual email
    window.open('mailto:pmaheshwaran@binghamton.edu?subject=Hello from Portfolio', '_blank');
    closeDropdown();
  };

  const handleBioLink = () => {
    window.open('https://bio.link/kash_', '_blank');
    closeDropdown();
  };

  // Close dropdown when pressing Escape key or clicking outside
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDropdownOpen) {
        closeDropdown();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Add a small delay to prevent immediate closing when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('click', handleClickOutside);
        clearTimeout(timeoutId);
      };
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <HeroContainer id="hero">
      <div className="container">
        <HeroContent>
          {/* Left Section - Text Content and Button */}
          <LeftSection>
            {/* Main Content */}
            <MainContent>
              <HeroGreeting>
                Hi, I'm
              </HeroGreeting>
              
              <HeroName>
                Prakash Maheshwaran
              </HeroName>
              
              <RoleContainer>
                <AnimatedRole
                  isVisible={true}
                  isEntering={true}
                  isLeaving={false}
                >
                  {displayedText}
                  <TypewriterCursor />
                </AnimatedRole>
              </RoleContainer>
            </MainContent>

            {/* Action Section */}
            <ActionSection ref={dropdownRef} isDropdownOpen={isDropdownOpen}>
              <AnimatedButton
                onClick={handleButtonClick}
                isVisible={!isDropdownOpen}
              >
                <ButtonText>
                  Get In Touch
                </ButtonText>
              </AnimatedButton>
              
              {/* Contact Buttons */}
              <ContactButtons 
                isOpen={isDropdownOpen} 
                isClosing={isDropdownClosing}
              >
                <ContactOption onClick={handleScheduleMeeting}>
                  <OptionText>Schedule</OptionText>
                </ContactOption>
                
                <ContactOption onClick={handleSendEmail}>
                  <OptionText>Email</OptionText>
                </ContactOption>
                
                <ContactOption onClick={handleBioLink}>
                  <OptionText>More Links</OptionText>
                </ContactOption>
              </ContactButtons>
            </ActionSection>
          </LeftSection>

          {/* Right Section - Image */}
          <HeroImage>
            <img src={myGif} alt="Prakash Maheshwaran" />
          </HeroImage>
        </HeroContent>
      </div>
    </HeroContainer>
  );
};

export default HeroSection;
