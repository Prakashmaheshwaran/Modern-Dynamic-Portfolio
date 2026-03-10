import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import soundManager from '../../utils/soundManager';

const scanLines = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 4px; }
`;

const flicker = keyframes`
  0%, 95%, 100% { opacity: 1; }
  96% { opacity: 0.7; }
  97% { opacity: 1; }
  98% { opacity: 0.5; }
  99% { opacity: 1; }
`;

const progressFill = keyframes`
  0% { width: 0%; }
  15% { width: 12%; }
  30% { width: 28%; }
  50% { width: 52%; }
  70% { width: 75%; }
  85% { width: 90%; }
  100% { width: 100%; }
`;

const typingBlink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const warningPulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const dataStream = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
`;

const LoadingContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: #050607;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  flex-direction: column;
  gap: 1.2rem;
  animation: ${flicker} 5s ease-in-out infinite;
  overflow: hidden;
`;

const ScanOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15) 0px,
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 3px
  );
  animation: ${scanLines} 0.15s linear infinite;
  z-index: 1;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 25%, rgba(0, 0, 0, 0.95) 100%);
  z-index: 1;
`;

const DataStreamBg = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 10px;
  line-height: 1.2;
  color: var(--cod-orange, #ff8c00);
  overflow: hidden;
  white-space: pre;
  animation: ${dataStream} 20s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ClassificationBadge = styled(motion.div)`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: clamp(0.55rem, 1vw, 0.7rem);
  text-transform: uppercase;
  letter-spacing: 0.5em;
  color: var(--cod-orange, #ff8c00);
  border: 1px solid rgba(255, 140, 0, 0.3);
  padding: 0.3rem 1.5rem;
  animation: ${warningPulse} 2s ease-in-out infinite;
`;

const BrandName = styled(motion.h1)`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-shadow:
    0 0 40px rgba(255, 140, 0, 0.3),
    0 0 80px rgba(255, 140, 0, 0.1);
  position: relative;
  line-height: 1;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--cod-orange, #ff8c00), transparent);
    opacity: 0.5;
  }
`;

const SystemLines = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  width: 100%;
  max-width: 400px;
`;

const SystemLine = styled(motion.div)<{ $isActive?: boolean }>`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: clamp(0.6rem, 1vw, 0.72rem);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${({ $isActive }) => $isActive ? 'rgba(255, 140, 0, 0.8)' : 'rgba(255, 255, 255, 0.25)'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
  transition: color 0.3s ease;
`;

const ActiveDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 1px;
  flex-shrink: 0;
  background: #ff8c00;
  box-shadow: 0 0 8px rgba(255, 140, 0, 0.5);
  animation: ${warningPulse} 0.8s ease-in-out infinite;
`;

const InactiveDot = styled.span<{ $done: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 1px;
  flex-shrink: 0;
  background: ${({ $done }) => $done ? '#4ade80' : 'rgba(255, 255, 255, 0.15)'};
`;

const Cursor = styled.span`
  display: inline-block;
  width: 1px;
  height: 1em;
  background: rgba(255, 140, 0, 0.7);
  animation: ${typingBlink} 0.6s step-end infinite;
  margin-left: 2px;
`;

const ProgressContainer = styled(motion.div)`
  width: clamp(200px, 30vw, 350px);
  height: 3px;
  background: rgba(255, 140, 0, 0.08);
  position: relative;
  z-index: 2;
  overflow: hidden;
  border: 1px solid rgba(255, 140, 0, 0.1);

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    width: 1px;
    height: 11px;
    background: rgba(255, 140, 0, 0.3);
  }

  &::before { left: 0; }
  &::after { right: 0; }
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--cod-orange, #ff8c00), #fbbf24);
  box-shadow: 0 0 12px rgba(255, 140, 0, 0.4);
  animation: ${progressFill} 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
`;

const PercentText = styled(motion.div)`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.65rem;
  color: rgba(255, 140, 0, 0.5);
  letter-spacing: 0.15em;
  margin-top: 0.25rem;
`;

const CornerDecor = styled.div<{ $position: string }>`
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 3;
  pointer-events: none;

  ${({ $position }) => {
    const borderStyle = '1px solid rgba(255, 140, 0, 0.2)';
    switch ($position) {
      case 'top-left':
        return `top: 20px; left: 20px; border-top: ${borderStyle}; border-left: ${borderStyle};`;
      case 'top-right':
        return `top: 20px; right: 20px; border-top: ${borderStyle}; border-right: ${borderStyle};`;
      case 'bottom-left':
        return `bottom: 20px; left: 20px; border-bottom: ${borderStyle}; border-left: ${borderStyle};`;
      case 'bottom-right':
        return `bottom: 20px; right: 20px; border-bottom: ${borderStyle}; border-right: ${borderStyle};`;
      default:
        return '';
    }
  }}
`;

const bootSteps = [
  'CONNECTING TO SERVER',
  'LOADING ASSETS',
  'VERIFYING CREDENTIALS',
  'INITIALIZING COMBAT HUD',
  'MISSION READY',
];

// Generate fake data stream text
const generateDataStream = () => {
  const chars = '0123456789ABCDEF';
  let result = '';
  for (let i = 0; i < 2000; i++) {
    result += Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * 16)]).join('') + '\n';
  }
  return result;
};

const LoadingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [percent, setPercent] = useState(0);
  const dataStreamText = React.useMemo(() => generateDataStream(), []);

  useEffect(() => {
    soundManager.playAmbientHum(2.8);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < bootSteps.length - 1) {
          soundManager.playBootBeep(1 + prev * 0.15);
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 450);

    const percentInterval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(percentInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(percentInterval);
    };
  }, []);

  return (
    <LoadingContainer
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: 'brightness(2.5)',
        transition: { duration: 0.6, ease: 'easeInOut' },
      }}
    >
      <ScanOverlay />
      <Vignette />
      <DataStreamBg>{dataStreamText}</DataStreamBg>

      <CornerDecor $position="top-left" />
      <CornerDecor $position="top-right" />
      <CornerDecor $position="bottom-left" />
      <CornerDecor $position="bottom-right" />

      <ContentWrapper>
        <ClassificationBadge
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } }}
        >
          Classified // Portfolio
        </ClassificationBadge>

        <BrandName
          initial={{ opacity: 0, y: 30, letterSpacing: '0.5em' }}
          animate={{
            opacity: 1,
            y: 0,
            letterSpacing: '0.2em',
            transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
        >
          PRAKASH
        </BrandName>

        <SystemLines
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.4 } }}
        >
          {bootSteps.map((step, i) => (
            <SystemLine
              key={step}
              $isActive={i === currentStep}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: i <= currentStep ? 1 : 0.3,
                x: 0,
                transition: { delay: 0.5 + i * 0.1, duration: 0.3 }
              }}
            >
              {i === currentStep ? <ActiveDot /> : <InactiveDot $done={i < currentStep} />}
              {step}
              {i === currentStep && <Cursor />}
            </SystemLine>
          ))}
        </SystemLines>

        <ProgressContainer
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{
            opacity: 1,
            scaleX: 1,
            transition: { delay: 0.7, duration: 0.4 },
          }}
        >
          <ProgressBar />
        </ProgressContainer>

        <PercentText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.8 } }}
        >
          {Math.min(percent, 100)}% LOADED
        </PercentText>
      </ContentWrapper>
    </LoadingContainer>
  );
};

export default LoadingScreen;
