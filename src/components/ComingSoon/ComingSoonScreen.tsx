import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaLock, FaFireAlt, FaFistRaised } from 'react-icons/fa';
import { PersonaType, PersonaConfig } from '../../types/persona';
import ParticleBackground from '../CharacterSelect/ParticleBackground';
import soundManager from '../../utils/soundManager';

interface ComingSoonScreenProps {
  persona: PersonaConfig;
  onBack: () => void;
}

type IconComponent = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
const iconMap: Record<Exclude<PersonaType, 'techie'>, IconComponent> = {
  influencer: FaFireAlt as unknown as IconComponent,
  fitness: FaFistRaised as unknown as IconComponent,
};
const LockIcon = FaLock as unknown as IconComponent;

const scanLineScroll = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 4px; }
`;

const hudPulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
`;

const glitchFlicker = keyframes`
  0%, 88%, 100% { opacity: 1; transform: translate(0) skewX(0); }
  89% { opacity: 0.8; transform: translate(-3px, 1px) skewX(-2deg); }
  90% { opacity: 1; transform: translate(3px, -1px) skewX(2deg); }
  91% { opacity: 0.7; transform: translate(-1px, 2px) skewX(-1deg); }
`;

const Container = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ScanLines = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.15) 2px,
    rgba(0, 0, 0, 0.15) 4px
  );
  animation: ${scanLineScroll} 0.3s linear infinite;
  z-index: 2;
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.7) 100%);
  z-index: 3;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  padding: 2rem;
`;

const IconContainer = styled(motion.div)<{ $accentColor: string }>`
  width: 100px;
  height: 100px;
  border: 2px solid ${props => props.$accentColor};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  clip-path: polygon(
    0 12px, 12px 0,
    calc(100% - 12px) 0, 100% 12px,
    100% calc(100% - 12px), calc(100% - 12px) 100%,
    12px 100%, 0 calc(100% - 12px)
  );
  background: rgba(0, 0, 0, 0.5);

  svg {
    font-size: 2.5rem;
    color: ${props => props.$accentColor};
    opacity: 0.6;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    svg { font-size: 2rem; }
  }
`;

const LockBadge = styled.div<{ $accentColor: string }>`
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 30px;
  height: 30px;
  background: ${props => props.$accentColor};
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

  svg { font-size: 0.7rem; color: #0a0a0a; }
`;

const PersonaTitle = styled(motion.h2)<{ $accentColor: string }>`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${props => props.$accentColor};
  margin: 0;
  animation: ${glitchFlicker} 8s ease-in-out infinite;
`;

const PersonaSubtitle = styled(motion.span)`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--text-muted, #6b7280);
`;

const MainTitle = styled(motion.h1)`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-bright, #ffffff);
  margin: 0;
  line-height: 1.2;
`;

const ClassifiedLabel = styled(motion.div)`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: var(--cod-orange, #ff8c00);
  opacity: 0.6;
  animation: ${hudPulse} 3s ease-in-out infinite;
  padding: 0.5rem 1.5rem;
  border: 1px solid rgba(255, 140, 0, 0.15);
  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
`;

const BackButton = styled(motion.button)`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  padding: 14px 40px;
  border: 1px solid rgba(255, 140, 0, 0.4);
  background: rgba(255, 140, 0, 0.08);
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
  margin-top: 1rem;

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
    background: rgba(255, 140, 0, 0.15);
    box-shadow: 0 0 30px rgba(255, 140, 0, 0.15);
    &::before { left: 100%; }
  }

  @media (max-width: 480px) {
    padding: 12px 28px;
    font-size: 1rem;
  }
`;

const CornerDecor = styled.div<{ $position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; $accentColor: string }>`
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 5;
  pointer-events: none;

  ${props => props.$position === 'top-left' && `top: 20px; left: 20px; border-top: 1px solid ${props.$accentColor}40; border-left: 1px solid ${props.$accentColor}40;`}
  ${props => props.$position === 'top-right' && `top: 20px; right: 20px; border-top: 1px solid ${props.$accentColor}40; border-right: 1px solid ${props.$accentColor}40;`}
  ${props => props.$position === 'bottom-left' && `bottom: 20px; left: 20px; border-bottom: 1px solid ${props.$accentColor}40; border-left: 1px solid ${props.$accentColor}40;`}
  ${props => props.$position === 'bottom-right' && `bottom: 20px; right: 20px; border-bottom: 1px solid ${props.$accentColor}40; border-right: 1px solid ${props.$accentColor}40;`}

  @media (max-width: 480px) { width: 25px; height: 25px; }
`;

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.12, delayChildren: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4 }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ComingSoonScreen: React.FC<ComingSoonScreenProps> = ({ persona, onBack }) => {
  const IconComp = iconMap[persona.id as Exclude<PersonaType, 'techie'>];

  const handleBack = () => {
    soundManager.playUIClick();
    onBack();
  };

  return (
    <Container
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <ParticleBackground accentColor={persona.accentColor} />
      <ScanLines />
      <Vignette />

      <CornerDecor $position="top-left" $accentColor={persona.accentColor} />
      <CornerDecor $position="top-right" $accentColor={persona.accentColor} />
      <CornerDecor $position="bottom-left" $accentColor={persona.accentColor} />
      <CornerDecor $position="bottom-right" $accentColor={persona.accentColor} />

      <Content>
        <IconContainer $accentColor={persona.accentColor} variants={itemVariants}>
          {IconComp && <IconComp />}
          <LockBadge $accentColor={persona.accentColor}>
            <LockIcon />
          </LockBadge>
        </IconContainer>

        <PersonaTitle $accentColor={persona.accentColor} variants={itemVariants}>
          {persona.title}
        </PersonaTitle>

        <PersonaSubtitle variants={itemVariants}>
          {persona.subtitle}
        </PersonaSubtitle>

        <MainTitle variants={itemVariants}>
          Dossier Under Construction
        </MainTitle>

        <ClassifiedLabel variants={itemVariants}>
          Classified — Deployment Pending
        </ClassifiedLabel>

        <BackButton
          variants={itemVariants}
          onClick={handleBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Return to operator selection"
        >
          Return To Base
        </BackButton>
      </Content>
    </Container>
  );
};

export default ComingSoonScreen;
