import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { getAllTechTools } from '../../data/techToolsData';
import LogoIcon from '../UI/LogoIcon';

const TechToolsContainer = styled.section`
  padding: 4rem 0;
  background: var(--secondary-bg);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.02) 0%, transparent 50%),
      radial-gradient(circle at 70% 30%, rgba(251, 191, 36, 0.01) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const SectionLabel = styled(motion.div)`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.5em;
  color: var(--cod-orange, #ff8c00);
  text-align: center;
  margin-bottom: 0.5rem;
  opacity: 0.6;
`;

const SectionTitle = styled(motion.h2)`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-bright, #ffffff);
`;

const TechToolsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) { grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 0.8rem; }
  @media (max-width: 480px) { grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)); gap: 0.6rem; }
`;

const TechToolItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.8rem 0.4rem;
  transition: all 0.2s ease;
  cursor: pointer;
  background: rgba(16, 18, 22, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.02);

  &:hover {
    border-color: rgba(255, 140, 0, 0.12);
    background: rgba(255, 140, 0, 0.04);
    transform: translateY(-3px);
  }
`;

const TechIcon = styled.div<{ color: string }>`
  font-size: 2rem;
  color: ${props => props.color};
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;

  @media (max-width: 768px) { font-size: 1.6rem; width: 40px; height: 40px; }
  @media (max-width: 480px) { font-size: 1.4rem; width: 34px; height: 34px; }
`;

const TechName = styled.span`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.6rem;
  color: var(--text-secondary);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.2;
  word-break: break-word;

  @media (max-width: 480px) { font-size: 0.5rem; }
`;

const TechToolsSection: React.FC = () => {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const allTools = getAllTechTools();

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.03, delayChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } };

  return (
    <TechToolsContainer ref={sectionRef} id="tech-tools">
      <div className="container">
        <SectionLabel initial={{ opacity: 0 }} animate={isIntersecting ? { opacity: 0.6 } : { opacity: 0 }} transition={{ duration: 0.6 }}>{'// Loadout'}</SectionLabel>
        <SectionTitle initial={{ opacity: 0, y: 30 }} animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6 }}>Tech Arsenal</SectionTitle>

        <TechToolsGrid variants={containerVariants} initial="hidden" animate={isIntersecting ? "visible" : "hidden"}>
          {allTools.map((tool) => (
            <TechToolItem key={tool.id} variants={itemVariants} whileHover={{ scale: 1.08 }} title={tool.name} aria-label={`Technology: ${tool.name}`}>
              <TechIcon color={tool.color}><LogoIcon name={tool.icon} size={36} color={tool.color} /></TechIcon>
              <TechName>{tool.name}</TechName>
            </TechToolItem>
          ))}
        </TechToolsGrid>
      </div>
    </TechToolsContainer>
  );
};

export default TechToolsSection;
