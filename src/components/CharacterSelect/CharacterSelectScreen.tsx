import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes, css } from 'styled-components';
import { FaSkull, FaFireAlt, FaCrosshairs, FaFistRaised } from 'react-icons/fa';
import { PersonaType, PersonaConfig } from '../../types/persona';
import { personas } from '../../data/personaData';
import ParticleBackground from './ParticleBackground';
import soundManager from '../../utils/soundManager';

interface CharacterSelectScreenProps {
  onSelect: (persona: PersonaType) => void;
}

type IconComponent = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
const iconMap: Record<PersonaType, IconComponent> = {
  techie: FaSkull as unknown as IconComponent,
  influencer: FaFireAlt as unknown as IconComponent,
  branding: FaCrosshairs as unknown as IconComponent,
  fitness: FaFistRaised as unknown as IconComponent,
};

const scanLineScroll = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 4px; }
`;

const glitchFlicker = keyframes`
  0%, 88%, 100% { opacity: 1; transform: translate(0) skewX(0); }
  89% { opacity: 0.8; transform: translate(-3px, 1px) skewX(-2deg); }
  90% { opacity: 1; transform: translate(3px, -1px) skewX(2deg); }
  91% { opacity: 0.7; transform: translate(-1px, 2px) skewX(-1deg); }
  92% { opacity: 1; transform: translate(0) skewX(0); }
`;

const screenShake = keyframes`
  0%, 100% { transform: translate(0); }
  10% { transform: translate(-5px, -3px); }
  20% { transform: translate(5px, 3px); }
  30% { transform: translate(-3px, 5px); }
  40% { transform: translate(3px, -5px); }
  50% { transform: translate(-5px, 3px); }
  60% { transform: translate(5px, -3px); }
  70% { transform: translate(-3px, -5px); }
  80% { transform: translate(3px, 5px); }
  90% { transform: translate(-5px, -3px); }
`;

const cornerBlink = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.7; }
`;

const hexRotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const ScreenContainer = styled(motion.div)<{ $shaking: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: #060709;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 480px) {
    justify-content: flex-start;
    overflow-y: auto;
    padding-top: 2rem;
  }

  ${({ $shaking }) =>
    $shaking &&
    css`
      animation: ${screenShake} 0.4s ease-in-out;
    `}
`;

const ScanLineOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.12) 0px,
    rgba(0, 0, 0, 0.12) 1px,
    transparent 1px,
    transparent 3px
  );
  animation: ${scanLineScroll} 0.2s linear infinite;

  @media (max-width: 480px) { display: none; }
`;

const VignetteOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.9) 100%);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 1.5rem 2rem;
  gap: 2rem;

  @media (max-width: 768px) { padding: 1rem 1.5rem; gap: 1.5rem; }
  @media (max-width: 480px) { padding: 0.75rem 1rem; gap: 1rem; }
`;

const Header = styled(motion.div)`
  text-align: center;
`;

const HeaderLabel = styled(motion.div)`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: clamp(0.55rem, 1vw, 0.65rem);
  text-transform: uppercase;
  letter-spacing: 0.6em;
  color: var(--cod-orange, #ff8c00);
  margin-bottom: 0.5rem;
  opacity: 0.7;
`;

const HeaderTitle = styled(motion.h1)`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  font-size: clamp(1.6rem, 4vw, 3rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ffffff;
  animation: ${glitchFlicker} 6s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(255, 140, 0, 0.2);
  margin: 0;
  line-height: 1;

  @media (max-width: 480px) { letter-spacing: 0.08em; }
`;

const HeaderSubline = styled(motion.p)`
  font-family: var(--font-primary, 'Rajdhani', sans-serif);
  font-size: clamp(0.7rem, 1.2vw, 0.85rem);
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 0.5rem;
`;

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
  width: 100%;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  @media (max-width: 480px) { grid-template-columns: 1fr; gap: 0.8rem; }
`;

const CharacterCard = styled(motion.div)<{
  $accentColor: string;
  $isSelected: boolean;
  $isOther: boolean;
}>`
  position: relative;
  background: rgba(12, 13, 16, 0.95);
  border: 1px solid ${({ $accentColor }) => $accentColor}15;
  padding: 2rem 1.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  user-select: none;
  min-height: 260px;
  transition: all 0.4s ease;
  clip-path: polygon(
    0 14px, 14px 0,
    calc(100% - 14px) 0, 100% 14px,
    100% calc(100% - 14px), calc(100% - 14px) 100%,
    14px 100%, 0 calc(100% - 14px)
  );

  ${({ $isOther }) => $isOther && css`opacity: 0.15; pointer-events: none;`}

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    clip-path: inherit;
    background: linear-gradient(
      180deg,
      ${({ $accentColor }) => $accentColor}08 0%,
      transparent 40%
    );
    pointer-events: none;
    transition: background 0.4s ease;
  }

  &:hover::before {
    background: linear-gradient(
      180deg,
      ${({ $accentColor }) => $accentColor}20 0%,
      ${({ $accentColor }) => $accentColor}08 60%,
      transparent 100%
    );
  }

  @media (max-width: 480px) {
    flex-direction: row;
    min-height: auto;
    padding: 1rem;
    gap: 0.8rem;
    clip-path: polygon(
      0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px,
      100% calc(100% - 8px), calc(100% - 8px) 100%,
      8px 100%, 0 calc(100% - 8px)
    );
  }
`;

const GlowBorder = styled.div<{ $accentColor: string; $active: boolean }>`
  position: absolute;
  inset: -1px;
  clip-path: polygon(
    0 14px, 14px 0,
    calc(100% - 14px) 0, 100% 14px,
    100% calc(100% - 14px), calc(100% - 14px) 100%,
    14px 100%, 0 calc(100% - 14px)
  );
  pointer-events: none;
  box-shadow: inset 0 0 ${({ $active }) => ($active ? '25px' : '6px')}
      ${({ $accentColor }) => $accentColor}35,
    0 0 ${({ $active }) => ($active ? '30px' : '8px')}
      ${({ $accentColor }) => $accentColor}15;
  transition: box-shadow 0.4s ease;
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
`;

const CornerBracket = styled.div<{ $position: string; $accentColor: string }>`
  position: absolute;
  width: 14px;
  height: 14px;
  pointer-events: none;
  animation: ${cornerBlink} 3s ease-in-out infinite;
  z-index: 3;

  ${({ $position, $accentColor }) => {
    const borderStyle = `1.5px solid ${$accentColor}`;
    switch ($position) {
      case 'top-left': return css`top: 4px; left: 4px; border-top: ${borderStyle}; border-left: ${borderStyle};`;
      case 'top-right': return css`top: 4px; right: 4px; border-top: ${borderStyle}; border-right: ${borderStyle};`;
      case 'bottom-left': return css`bottom: 4px; left: 4px; border-bottom: ${borderStyle}; border-left: ${borderStyle};`;
      case 'bottom-right': return css`bottom: 4px; right: 4px; border-bottom: ${borderStyle}; border-right: ${borderStyle};`;
      default: return '';
    }
  }}

  @media (max-width: 480px) { width: 10px; height: 10px; }
`;

const IconWrapper = styled.div<{ $accentColor: string }>`
  font-size: 3rem;
  color: ${({ $accentColor }) => $accentColor};
  filter: drop-shadow(0 0 20px ${({ $accentColor }) => $accentColor}40);
  transition: filter 0.4s ease, transform 0.4s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -15px;
    border-radius: 50%;
    border: 1px solid ${({ $accentColor }) => $accentColor}15;
    animation: ${hexRotate} 12s linear infinite;
  }

  @media (max-width: 480px) { font-size: 2rem; flex-shrink: 0; &::after { display: none; } }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  text-align: center;

  @media (max-width: 480px) { align-items: flex-start; text-align: left; }
`;

const PersonaTitle = styled.h2<{ $accentColor: string }>`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  font-size: clamp(1.2rem, 1.8vw, 1.6rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 0 10px ${({ $accentColor }) => $accentColor}25;
`;

const PersonaSubtitle = styled.p<{ $accentColor: string }>`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.35em;
  color: ${({ $accentColor }) => $accentColor};
  margin: 0;
`;

const PersonaDescription = styled.p`
  font-family: var(--font-primary, 'Rajdhani', sans-serif);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.5;
  margin: 0;

  @media (max-width: 480px) { display: none; }
`;

const Tagline = styled(motion.p)<{ $accentColor: string }>`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${({ $accentColor }) => $accentColor};
  margin-top: auto;
  padding-top: 0.5rem;
  opacity: 0.6;

  @media (max-width: 480px) { display: none; }
`;

const StatsContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 0.5rem;

  @media (max-width: 480px) { display: none; }
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatLabel = styled.span`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.4);
  width: 65px;
  text-align: right;
  flex-shrink: 0;
`;

const StatBarOuter = styled.div`
  flex: 1;
  height: 3px;
  background: rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;
`;

const StatBarFill = styled(motion.div)<{ $accentColor: string }>`
  height: 100%;
  background: ${({ $accentColor }) => $accentColor};
  box-shadow: 0 0 6px ${({ $accentColor }) => $accentColor}50;
  transform-origin: left;
`;

const StatValue = styled.span<{ $accentColor: string }>`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.55rem;
  font-weight: 600;
  color: ${({ $accentColor }) => $accentColor};
  width: 28px;
  text-align: right;
`;

const SelectionFlash = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #ffffff;
  pointer-events: none;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      when: 'beforeChildren' as const,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -60, skewX: -3 },
  visible: {
    opacity: 1,
    y: 0,
    skewX: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const CharacterSelectScreen: React.FC<CharacterSelectScreenProps> = ({ onSelect }) => {
  const [hoveredPersona, setHoveredPersona] = useState<PersonaType | null>(null);
  const [selectionPhase, setSelectionPhase] = useState<'idle' | 'selected' | 'flash' | 'exit'>('idle');
  const [selectedId, setSelectedId] = useState<PersonaType | null>(null);

  const handleSelect = useCallback(
    (persona: PersonaType) => {
      if (selectionPhase !== 'idle') return;
      soundManager.playSelectConfirm();
      setSelectedId(persona);
      setSelectionPhase('selected');
      setTimeout(() => setSelectionPhase('flash'), 400);
      setTimeout(() => {
        setSelectionPhase('exit');
        soundManager.playDeploy();
      }, 1000);
      setTimeout(() => onSelect(persona), 1500);
    },
    [selectionPhase, onSelect]
  );

  const handleHover = useCallback((id: PersonaType | null) => {
    if (id) soundManager.playUIHover();
    setHoveredPersona(id);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, persona: PersonaType) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelect(persona);
      }
    },
    [handleSelect]
  );

  const activeColor = hoveredPersona
    ? personas.find((p) => p.id === hoveredPersona)?.accentColor
    : undefined;

  return (
    <ScreenContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      $shaking={selectionPhase === 'selected'}
    >
      <ScanLineOverlay />
      <VignetteOverlay />
      <ParticleBackground accentColor={activeColor || 'rgba(255, 140, 0, 0.5)'} />

      <ContentWrapper>
        <Header variants={headerVariants}>
          <HeaderLabel
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Select Operator
          </HeaderLabel>
          <HeaderTitle>Choose Your Callsign</HeaderTitle>
          <HeaderSubline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Deploy with your preferred loadout
          </HeaderSubline>
        </Header>

        <CharacterGrid>
          {personas.map((persona) => (
            <CharacterCardItem
              key={persona.id}
              persona={persona}
              isHovered={hoveredPersona === persona.id}
              isSelected={selectedId === persona.id}
              isOther={selectedId !== null && selectedId !== persona.id}
              selectionPhase={selectionPhase}
              onHover={handleHover}
              onSelect={handleSelect}
              onKeyDown={handleKeyDown}
            />
          ))}
        </CharacterGrid>
      </ContentWrapper>

      <AnimatePresence>
        {selectionPhase === 'flash' && (
          <SelectionFlash
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8, 0] }}
            transition={{ duration: 0.6, times: [0, 0.15, 0.4, 1] }}
          />
        )}
      </AnimatePresence>
    </ScreenContainer>
  );
};

interface CardItemProps {
  persona: PersonaConfig;
  isHovered: boolean;
  isSelected: boolean;
  isOther: boolean;
  selectionPhase: string;
  onHover: (id: PersonaType | null) => void;
  onSelect: (id: PersonaType) => void;
  onKeyDown: (e: React.KeyboardEvent, id: PersonaType) => void;
}

const CharacterCardItem: React.FC<CardItemProps> = ({
  persona,
  isHovered,
  isSelected,
  isOther,
  onHover,
  onSelect,
  onKeyDown,
}) => {
  return (
    <CharacterCard
      variants={cardVariants}
      whileHover={
        !isSelected && !isOther
          ? { scale: 1.03, y: -6, transition: { type: 'spring', stiffness: 300, damping: 18 } }
          : undefined
      }
      whileTap={!isSelected && !isOther ? { scale: 0.98 } : undefined}
      animate={isSelected ? { scale: 1.06, transition: { duration: 0.4 } } : undefined}
      $accentColor={persona.accentColor}
      $isSelected={isSelected}
      $isOther={isOther}
      onMouseEnter={() => onHover(persona.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(persona.id)}
      onKeyDown={(e) => onKeyDown(e, persona.id)}
      role="button"
      tabIndex={0}
      aria-label={`Select ${persona.title} operator: ${persona.description}`}
    >
      <GlowBorder $accentColor={persona.accentColor} $active={isHovered || isSelected} />
      <CornerBracket $position="top-left" $accentColor={persona.accentColor} />
      <CornerBracket $position="top-right" $accentColor={persona.accentColor} />
      <CornerBracket $position="bottom-left" $accentColor={persona.accentColor} />
      <CornerBracket $position="bottom-right" $accentColor={persona.accentColor} />

      <IconWrapper $accentColor={persona.accentColor}>
        {(() => { const Icon = iconMap[persona.id]; return <Icon />; })()}
      </IconWrapper>

      <CardContent>
        <PersonaTitle $accentColor={persona.accentColor}>{persona.title}</PersonaTitle>
        <PersonaSubtitle $accentColor={persona.accentColor}>{persona.subtitle}</PersonaSubtitle>
        <PersonaDescription>{persona.description}</PersonaDescription>
      </CardContent>

      <Tagline
        $accentColor={persona.accentColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.8 : 0.3 }}
        transition={{ duration: 0.3 }}
      >
        {persona.tagline}
      </Tagline>

      <StatsContainer
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          height: isHovered ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {persona.stats.map((stat, i) => (
          <StatRow key={stat.label}>
            <StatLabel>{stat.label}</StatLabel>
            <StatBarOuter>
              <StatBarFill
                $accentColor={persona.accentColor}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? stat.value / 100 : 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              />
            </StatBarOuter>
            <StatValue $accentColor={persona.accentColor}>{stat.value}</StatValue>
          </StatRow>
        ))}
      </StatsContainer>
    </CharacterCard>
  );
};

export default CharacterSelectScreen;
