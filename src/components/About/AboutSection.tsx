import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const AboutContainer = styled.section`
  padding: 1.6rem 0;
  background: linear-gradient(180deg, var(--primary-bg) 0%, var(--secondary-bg) 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: 
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(204, 204, 204, 0.02) 0%, transparent 50%);
    animation: float 20s ease-in-out infinite;
    z-index: 0;
  }
  
  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
  }
  
  .container {
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 1rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent-green), var(--accent-pink), transparent);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: var(--font-secondary);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-green) 50%, var(--accent-pink) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -20px;
    right: -20px;
    bottom: -10px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(204, 204, 204, 0.05));
    border-radius: 20px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 100%;
    padding: 0 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0 0.5rem;
  }
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
    background: linear-gradient(180deg, transparent, var(--border-color), transparent);
    opacity: 0.3;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    
    &::before {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const BioSection = styled.div`
  display: grid;
  gap: 2rem;
  
  h3 {
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    position: relative;
    padding-left: 2rem;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 30px;
      background: linear-gradient(180deg, var(--accent-green), var(--accent-pink));
      border-radius: 2px;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 2rem;
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, var(--accent-green), transparent);
      border-radius: 2px;
    }
  }
`;

const JourneyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.5rem;
    color: var(--text-primary);
    margin: 0;
    position: relative;
    padding-left: 2rem;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 30px;
      background: linear-gradient(180deg, var(--accent-green), var(--accent-pink));
      border-radius: 2px;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 2rem;
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, var(--accent-green), transparent);
      border-radius: 2px;
    }
  }
`;

const JourneyIcon = styled.span`
  font-size: 1.5rem;
  animation: bounce 2s ease-in-out infinite;
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }
`;

const BioText = styled(motion.div)`
  p {
    font-size: 1.1rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.8;
  }
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border-color);
  }
  
  @media (max-width: 768px) {
    padding-left: 1.5rem;
    
    &::before {
      left: 8px;
    }
  }
  
  @media (max-width: 480px) {
    padding-left: 1.25rem;
    
    &::before {
      left: 6px;
      width: 1px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: -25px;
    top: 5px;
    width: 12px;
    height: 12px;
    background: var(--accent-green);
    border-radius: 50%;
    border: 3px solid var(--primary-bg);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    
    &::before {
      left: -20px;
      width: 10px;
      height: 10px;
      border: 2px solid var(--primary-bg);
    }
  }
  
  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
    
    &::before {
      left: -18px;
      width: 8px;
      height: 8px;
      border: 2px solid var(--primary-bg);
    }
  }
`;

const TimelineContent = styled.div`
  h4 {
    font-size: 1.2rem;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .timeline-date {
    color: var(--accent-pink);
    font-size: 0.9rem;
    font-weight: 600;
  }

  p {
    color: var(--text-muted);
    margin-top: 0.5rem;
  }
  
  @media (max-width: 768px) {
    h4 {
      font-size: 1.1rem;
    }
    
    .timeline-date {
      font-size: 0.85rem;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 480px) {
    h4 {
      font-size: 1rem;
    }
    
    .timeline-date {
      font-size: 0.8rem;
    }
    
    p {
      font-size: 0.85rem;
    }
  }
`;



const AboutSection: React.FC = () => {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };



  return (
    <AboutContainer ref={sectionRef} id="about">
      <div className="container">
        <SectionHeader>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
          >
            <SectionTitle variants={itemVariants}>Who I Am</SectionTitle>
            <SectionSubtitle variants={itemVariants}>
              AI Researcher • Y Combinator Intern • Master's Student at SUNY
            </SectionSubtitle>
          </motion.div>
        </SectionHeader>

        <AboutContent
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <JourneyHeader>
              <h3>Professional & Academic Journey</h3>
              <JourneyIcon>🚀</JourneyIcon>
            </JourneyHeader>
            <Timeline>
              <TimelineItem variants={timelineVariants}>
                <TimelineContent>
                  <h4>Senior Research Assistant  • SUNY Research Foundry</h4>
                  <span className="timeline-date">2025 - Present</span>
                  <p>Leading cutting-edge automation research • Advanced AI/ML implementations • Publications in progress</p>
                </TimelineContent>
              </TimelineItem>
              
              <TimelineItem variants={timelineVariants}>
                <TimelineContent>
                  <h4>Automation Assistant • Flomenco</h4>
                  <span className="timeline-date">Fall 2025 - Present</span>
                  <p>Production automation systems • Process optimization • Enterprise-level implementations</p>
                </TimelineContent>
              </TimelineItem>
              
              <TimelineItem variants={timelineVariants}>
                <TimelineContent>
                  <h4>Agentic Automation Intern • Skyvern - Y Combinator</h4>
                  <span className="timeline-date">Summer 2025</span>
                  <p>Y Combinator-backed startup • AI agent development • Browser automation at scale</p>
                </TimelineContent>
              </TimelineItem>
              
              <TimelineItem variants={timelineVariants}>
                <TimelineContent>
                  <h4>Master's in Computer Science • SUNY Binghamton</h4>
                  <span className="timeline-date">2024 - Present</span>
                  <p>Advanced AI/ML research • Automation systems • Graduate research publications</p>
                </TimelineContent>
              </TimelineItem>
              
              <TimelineItem variants={timelineVariants}>
                <TimelineContent>
                  <h4>Bachelor's in Computer Science  • ANNA University</h4>
                  <span className="timeline-date">2019 - 2023</span>
                  <p>Magna Cum Laude • Software Engineering • AI/ML Fundamentals</p>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </motion.div>

          <BioSection>
            <BioText variants={itemVariants}>
              <p>
                <strong>AI Researcher & Senior Graduate Student</strong> at SUNY Binghamton, specializing in advanced automation systems and intelligent agent development. Currently pursuing cutting-edge research in agentic AI systems with a focus on real-world applications and scalable solutions.
              </p>
              <p>
                <strong>Y Combinator Experience:</strong> Gained invaluable startup experience as an Agentic Automation Intern at Skyvern, a Y Combinator-backed company, where I developed sophisticated browser automation agents and contributed to production-level AI systems serving enterprise clients.
              </p>
              <p>
                <strong>Research Leadership:</strong> As a Senior Research Assistant, I lead innovative projects in machine learning and automation, with ongoing publications in prestigious conferences. My work bridges theoretical AI research with practical automation solutions.
              </p>
              <p>
                <strong>Industry Impact:</strong> Currently contributing to automation systems at Flomenco while maintaining my research commitments, demonstrating the ability to excel in both academic and industry environments. Seeking H-1B sponsorship opportunities to bring my expertise to forward-thinking technology companies.
              </p>
            </BioText>
          </BioSection>
        </AboutContent>
      </div>
    </AboutContainer>
  );
};

export default AboutSection;
