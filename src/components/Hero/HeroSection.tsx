import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import soundManager from '../../utils/soundManager';
import myGif from '../../assets/images/my.gif';

interface HeroSectionProps {
  onSectionChange: (section: string) => void;
}

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const hudPulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const cursorBlink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const subtleGlow = keyframes`
  0%, 100% { text-shadow: 0 0 5px rgba(255, 140, 0, 0.3); }
  50% { text-shadow: 0 0 20px rgba(255, 140, 0, 0.6), 0 0 40px rgba(255, 140, 0, 0.3); }
`;

const radarSweep = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const HeroContainer = styled.section`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background: var(--primary-bg);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 50%, rgba(255, 140, 0, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(251, 191, 36, 0.02) 0%, transparent 50%);
    pointer-events: none;
  }

  @media (max-width: 768px) { padding-top: 4rem; align-items: flex-start; }
  @media (max-width: 480px) { padding-top: 5rem; }
`;

const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 140, 0, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 140, 0, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.5;
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  align-items: center;

  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 1.5rem; text-align: center; }
  @media (max-width: 480px) { gap: 0.75rem; display: flex; flex-direction: column; }
`;

const HeroImage = styled.div`
  width: 100%;
  max-width: 300px;
  height: 350px;
  border: 1px solid rgba(255, 140, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeInLeft} 1s ease-out;
  position: relative;
  overflow: hidden;
  background: var(--primary-bg);
  clip-path: polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);

  img { width: 100%; height: 100%; object-fit: cover; }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(10, 11, 13, 0.8) 100%);
    pointer-events: none;
  }

  @media (max-width: 1024px) { max-width: 250px; height: 280px; margin: 0 auto; }
  @media (max-width: 768px) { max-width: 200px; height: 220px; }
  @media (max-width: 480px) { max-width: 150px; height: 180px; order: 2; }
`;

const ImageHUD = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  right: 8px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const HUDLabel = styled.span`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.55rem;
  color: var(--cod-orange, #ff8c00);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.7;
`;

const RadarDot = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid rgba(255, 140, 0, 0.3);
  border-radius: 50%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border-top: 1px solid rgba(255, 140, 0, 0.6);
    animation: ${radarSweep} 3s linear infinite;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  animation: ${fadeInLeft} 1s ease-out 0.3s both;

  @media (max-width: 480px) { gap: 0.75rem; order: 1; }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: 480px) { gap: 0.5rem; }
`;

const ClassLabel = styled.span`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.65rem;
  color: var(--cod-orange, #ff8c00);
  text-transform: uppercase;
  letter-spacing: 0.4em;
  opacity: 0.7;
  animation: ${fadeInUp} 1s ease-out 0.4s both;
`;

const HeroGreeting = styled.span`
  font-family: var(--font-primary, 'Rajdhani', sans-serif);
  font-size: 1.1rem;
  color: var(--text-secondary);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  animation: ${fadeInUp} 1s ease-out 0.5s both;

  @media (max-width: 480px) { font-size: 0.95rem; }
`;

const HeroName = styled.h1`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 700;
  color: var(--text-bright, #ffffff);
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
  animation: ${fadeInUp} 1s ease-out 0.6s both;
  text-shadow: 0 0 40px rgba(255, 140, 0, 0.15);

  @media (max-width: 480px) { font-size: clamp(2rem, 10vw, 2.8rem); }
`;

const RoleContainer = styled.div`
  position: relative;
  height: 45px;
  overflow: hidden;
  animation: ${fadeInUp} 1s ease-out 0.8s both;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 1024px) { justify-content: center; }
  @media (max-width: 480px) { height: 38px; justify-content: center; }
`;

const AnimatedRole = styled.div<{ $isVisible: boolean; $isLeaving: boolean }>`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-family: var(--font-primary, 'Rajdhani', sans-serif);
  font-size: 1.3rem;
  color: var(--cod-orange, #ff8c00);
  font-weight: 500;
  letter-spacing: 0.05em;
  white-space: nowrap;

  opacity: ${props => (props.$isVisible && !props.$isLeaving) ? 1 : 0};
  transform: ${props => {
    const base = 'translateY(-50%)';
    if (props.$isVisible && !props.$isLeaving) return base;
    if (props.$isLeaving) return `${base} translateX(-15px)`;
    return `${base} translateX(15px)`;
  }};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${props => props.$isVisible && !props.$isLeaving && css`animation: ${subtleGlow} 2.5s ease-in-out infinite;`}

  @media (max-width: 1024px) {
    left: 50%;
    transform: translate(-50%, -50%);
    transform: ${props => {
      const base = 'translate(-50%, -50%)';
      if (props.$isVisible && !props.$isLeaving) return base;
      return `${base} translateX(-15px)`;
    }};
  }

  @media (max-width: 480px) { font-size: 1.1rem; }
`;

const TypewriterCursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.3rem;
  background: var(--cod-orange, #ff8c00);
  margin-left: 2px;
  animation: ${cursorBlink} 0.8s infinite;
  vertical-align: text-bottom;
`;

const ActionSection = styled.div<{ $isDropdownOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  position: relative;
  align-items: flex-start;
  min-height: ${props => props.$isDropdownOpen ? '70px' : 'auto'};
  transition: min-height 0.3s ease;

  @media (max-width: 1024px) { align-items: center; }
`;

const AnimatedButton = styled.button<{ $isVisible: boolean }>`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  padding: 14px 40px;
  border: 1px solid var(--cod-orange, #ff8c00);
  background: rgba(255, 140, 0, 0.06);
  color: var(--cod-orange, #ff8c00);
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));

  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(-10px)'};
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 140, 0, 0.15), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: rgba(255, 140, 0, 0.12);
    box-shadow: 0 0 30px rgba(255, 140, 0, 0.15);
    &::before { left: 100%; }
  }

  @media (max-width: 480px) { padding: 12px 28px; font-size: 1rem; }
`;

const ContactButtons = styled.div<{ $isOpen: boolean; $isClosing: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;

  opacity: ${props => props.$isOpen && !props.$isClosing ? 1 : 0};
  visibility: ${props => props.$isOpen || props.$isClosing ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen && !props.$isClosing ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease;

  @media (max-width: 480px) { gap: 0.6rem; max-width: 350px; }
`;

const ContactOption = styled.button`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  border: 1px solid rgba(255, 140, 0, 0.3);
  background: rgba(255, 140, 0, 0.05);
  color: var(--cod-orange, #ff8c00);
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 46px;
  width: 100%;
  max-width: 170px;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));

  &:hover {
    background: rgba(255, 140, 0, 0.15);
    border-color: rgba(255, 140, 0, 0.5);
    box-shadow: 0 0 20px rgba(255, 140, 0, 0.1);
  }

  &:active { transform: scale(0.97); }

  @media (max-width: 480px) { padding: 0.6rem 0.8rem; font-size: 0.85rem; flex: 1; }
`;

const StatusBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  animation: ${fadeInUp} 1s ease-out 1.2s both;

  @media (max-width: 768px) { display: none; }
`;

const StatusItem = styled.span<{ $color?: string }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  &::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 1px;
    background: ${props => props.$color || 'rgba(74, 222, 128, 0.6)'};
    animation: ${hudPulse} 2s ease-in-out infinite;
  }
`;

const HeroSection: React.FC<HeroSectionProps> = ({ onSectionChange }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownClosing, setIsDropdownClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const roles = useMemo(() => [
    'AI Architect — Autodesk',
    'AI Researcher',
    'Automation Engineer',
    'Full Stack Developer',
    'Love to draw and bake'
  ], []);

  useEffect(() => {
    if (!isTyping) return;
    const currentRole = roles[currentRoleIndex];
    if (displayedText.length < currentRole.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, isTyping, currentRoleIndex, roles]);

  useEffect(() => {
    if (isTyping) return;
    const currentRole = roles[currentRoleIndex];
    if (displayedText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, isTyping, currentRoleIndex, roles]);

  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');
  }, [currentRoleIndex]);

  const handleButtonClick = () => {
    soundManager.playUIClick();
    setIsDropdownOpen(true);
    setIsDropdownClosing(false);
  };

  const closeDropdown = () => {
    setIsDropdownClosing(true);
    setTimeout(() => { setIsDropdownOpen(false); setIsDropdownClosing(false); }, 300);
  };

  const handleLinkedIn = () => { soundManager.playUIClick(); window.open('https://www.linkedin.com/in/prakash-maheshwaran/', '_blank'); closeDropdown(); };
  const handleSendEmail = () => { soundManager.playUIClick(); window.open('mailto:pmaheshwaran@binghamton.edu?subject=Hello from Portfolio', '_blank'); closeDropdown(); };
  const handleBioLink = () => { soundManager.playUIClick(); window.open('https://bio.link/kash_', '_blank'); closeDropdown(); };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape' && isDropdownOpen) closeDropdown(); };
    const handleClickOutside = () => { if (isDropdownOpen) closeDropdown(); };
    if (isDropdownOpen) {
      document.addEventListener('keydown', handleKeyDown);
      const timeoutId = setTimeout(() => document.addEventListener('click', handleClickOutside), 100);
      return () => { document.removeEventListener('keydown', handleKeyDown); document.removeEventListener('click', handleClickOutside); clearTimeout(timeoutId); };
    }
    return () => { document.removeEventListener('keydown', handleKeyDown); document.removeEventListener('click', handleClickOutside); };
  }, [isDropdownOpen]);

  return (
    <HeroContainer id="hero">
      <GridOverlay />
      <div className="container">
        <HeroContent>
          <LeftSection>
            <MainContent>
              <ClassLabel>{'// Operator Profile'}</ClassLabel>
              <HeroGreeting>Callsign:</HeroGreeting>
              <HeroName>Prakash Maheshwaran</HeroName>
              <RoleContainer>
                <AnimatedRole $isVisible={true} $isLeaving={false}>
                  {displayedText}
                  <TypewriterCursor />
                </AnimatedRole>
              </RoleContainer>
            </MainContent>

            <ActionSection ref={dropdownRef} $isDropdownOpen={isDropdownOpen}>
              <AnimatedButton onClick={handleButtonClick} $isVisible={!isDropdownOpen}>
                Contact Me
              </AnimatedButton>
              <ContactButtons $isOpen={isDropdownOpen} $isClosing={isDropdownClosing}>
                <ContactOption onClick={handleLinkedIn}>LinkedIn</ContactOption>
                <ContactOption onClick={handleSendEmail}>Email</ContactOption>
                <ContactOption onClick={handleBioLink}>Bio Link</ContactOption>
              </ContactButtons>
            </ActionSection>

            <StatusBar>
              <StatusItem $color="rgba(74, 222, 128, 0.7)">Status: Active</StatusItem>
              <StatusItem $color="rgba(255, 140, 0, 0.7)">Clearance: Top Secret</StatusItem>
              <StatusItem $color="rgba(56, 189, 248, 0.7)">Location: USA</StatusItem>
            </StatusBar>
          </LeftSection>

          <HeroImage>
            <img src={myGif} alt="Prakash Maheshwaran" />
            <ImageHUD>
              <HUDLabel>ID Verified</HUDLabel>
              <RadarDot />
            </ImageHUD>
          </HeroImage>
        </HeroContent>
      </div>
    </HeroContainer>
  );
};

export default HeroSection;
