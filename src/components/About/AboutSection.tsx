import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const hudPulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
`;

const AboutContainer = styled.section`
  padding: 4rem 0;
  background: linear-gradient(180deg, var(--primary-bg) 0%, var(--secondary-bg) 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 140, 0, 0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 140, 0, 0.015) 1px, transparent 1px);
    background-size: 80px 80px;
    pointer-events: none;
  }

  @media (max-width: 768px) { padding: 2.5rem 0; }
  @media (max-width: 480px) { padding: 2rem 0; }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--cod-orange, #ff8c00), transparent);
  }

  @media (max-width: 768px) { margin-bottom: 2rem; }
`;

const SectionLabel = styled(motion.div)`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.5em;
  color: var(--cod-orange, #ff8c00);
  margin-bottom: 0.5rem;
  opacity: 0.6;
`;

const SectionTitle = styled(motion.h2)`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-bright, #ffffff);
  margin: 0;
  text-shadow: 0 0 30px rgba(255, 140, 0, 0.1);
`;

const SectionSubtitle = styled(motion.p)`
  font-family: var(--font-primary, 'Rajdhani', sans-serif);
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0.5rem auto 0;
  letter-spacing: 0.05em;
`;

const AboutContent = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1px;
    height: 60%;
    background: linear-gradient(180deg, transparent, rgba(255, 140, 0, 0.1), transparent);
  }

  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 2rem; &::before { display: none; } }
`;

const JourneyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  h3 {
    font-family: var(--font-secondary, 'Teko', sans-serif);
    font-size: 1.4rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-bright, #ffffff);
    margin: 0;
    padding-left: 1rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 22px;
      background: var(--cod-orange, #ff8c00);
    }
  }
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, var(--cod-orange, #ff8c00), rgba(255, 140, 0, 0.1));
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 1.5rem;

  &::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 6px;
    width: 8px;
    height: 8px;
    background: var(--cod-orange, #ff8c00);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }

  @media (max-width: 480px) { margin-bottom: 1.25rem; }
`;

const TimelineContent = styled.div`
  h4 {
    font-family: var(--font-primary, 'Rajdhani', sans-serif);
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.3rem;
  }

  .timeline-date {
    font-family: var(--font-mono, 'Share Tech Mono', monospace);
    color: var(--cod-orange, #ff8c00);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  p {
    color: var(--text-muted);
    margin-top: 0.3rem;
    font-size: 0.85rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) { h4 { font-size: 0.95rem; } p { font-size: 0.8rem; } }
`;

const BioSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BioBlock = styled(motion.div)`
  background: rgba(16, 18, 22, 0.8);
  border: 1px solid rgba(255, 140, 0, 0.08);
  padding: 1.2rem;
  position: relative;
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: var(--cod-orange, #ff8c00);
    opacity: 0.3;
  }

  strong {
    font-family: var(--font-secondary, 'Teko', sans-serif);
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--cod-orange, #ff8c00);
    display: block;
    margin-bottom: 0.3rem;
  }

  p {
    font-size: 0.88rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
`;

const ClassifiedStamp = styled.div`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(255, 140, 0, 0.2);
  text-align: center;
  margin-top: 2rem;
  animation: ${hudPulse} 3s ease-in-out infinite;
`;

const AboutSection: React.FC = () => {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
  const timelineVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

  return (
    <AboutContainer ref={sectionRef} id="about">
      <div className="container">
        <SectionHeader>
          <motion.div variants={containerVariants} initial="hidden" animate={isIntersecting ? "visible" : "hidden"}>
            <SectionLabel variants={itemVariants}>{'// Profile'}</SectionLabel>
            <SectionTitle variants={itemVariants}>About Me</SectionTitle>
            <SectionSubtitle variants={itemVariants}>AI Architect @ Autodesk | Y Combinator Alum | MS Computer Science, SUNY</SectionSubtitle>
          </motion.div>
        </SectionHeader>
        <AboutContent variants={containerVariants} initial="hidden" animate={isIntersecting ? "visible" : "hidden"}>
          <motion.div variants={itemVariants}>
            <JourneyHeader><h3>Experience</h3></JourneyHeader>
            <Timeline>
              <TimelineItem variants={timelineVariants}><TimelineContent><h4>AI Architect, People and Places | Autodesk</h4><span className="timeline-date">2026 - Present</span><p>Architecting AI solutions for People and Places, driving intelligent automation and AI-powered systems at enterprise scale</p></TimelineContent></TimelineItem>
              <TimelineItem variants={timelineVariants}><TimelineContent><h4>Senior Research Assistant | SUNY Research Foundry</h4><span className="timeline-date">2025 - 2026</span><p>Led cutting-edge automation research with advanced AI/ML implementations and publications</p></TimelineContent></TimelineItem>
              <TimelineItem variants={timelineVariants}><TimelineContent><h4>Automation Assistant | Flomenco</h4><span className="timeline-date">Fall 2025</span><p>Production automation systems and enterprise-level implementations for process optimization</p></TimelineContent></TimelineItem>
              <TimelineItem variants={timelineVariants}><TimelineContent><h4>Agentic Automation Intern | Skyvern - Y Combinator</h4><span className="timeline-date">Summer 2025</span><p>Y Combinator-backed startup with AI agent development and browser automation at scale</p></TimelineContent></TimelineItem>
              <TimelineItem variants={timelineVariants}><TimelineContent><h4>Master's in Computer Science | SUNY Binghamton</h4><span className="timeline-date">2024 - 2026</span><p>Advanced AI/ML research, automation systems, and graduate research publications</p></TimelineContent></TimelineItem>
              <TimelineItem variants={timelineVariants}><TimelineContent><h4>Bachelor's in Computer Science | ANNA University</h4><span className="timeline-date">2019 - 2023</span><p>Magna Cum Laude distinction with focus on software engineering and AI/ML fundamentals</p></TimelineContent></TimelineItem>
            </Timeline>
          </motion.div>
          <BioSection>
            <BioBlock variants={itemVariants}><strong>Primary Specialization</strong><p>AI Architect at Autodesk, designing and deploying intelligent systems for the People and Places division. Specializing in AI architecture, automation systems, and enterprise-scale AI solutions.</p></BioBlock>
            <BioBlock variants={itemVariants}><strong>Combat Experience: Y Combinator</strong><p>Gained invaluable startup experience at Skyvern, developing sophisticated browser automation agents and contributing to production-level AI systems serving enterprise clients.</p></BioBlock>
            <BioBlock variants={itemVariants}><strong>Field Leadership</strong><p>Led innovative projects in machine learning and automation at SUNY Research Foundry, with publications bridging theoretical AI research with practical solutions.</p></BioBlock>
            <BioBlock variants={itemVariants}><strong>Current Operations</strong><p>Driving AI innovation at Autodesk, architecting intelligent solutions that transform how people interact with spaces and workplaces through cutting-edge AI and automation.</p></BioBlock>
          </BioSection>
        </AboutContent>
        <ClassifiedStamp>[ Classified // Eyes Only ]</ClassifiedStamp>
      </div>
    </AboutContainer>
  );
};

export default AboutSection;
