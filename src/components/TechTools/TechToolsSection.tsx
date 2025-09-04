import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { getAllTechTools } from '../../data/techToolsData';
import LogoIcon from '../UI/LogoIcon';

const TechToolsContainer = styled.section`
  padding: 40px 0;
  background: var(--secondary-bg);
  position: relative;
  overflow: hidden;
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
    background: linear-gradient(135deg, rgba(120, 119, 198, 0.1), rgba(255, 119, 198, 0.1));
    border-radius: 20px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const TechToolsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 1rem;
  }
`;

const TechToolItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem 0.5rem;
  transition: all var(--transition-medium);
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TechIcon = styled.div<{ color: string }>`
  font-size: 2.5rem;
  color: ${props => props.color};
  margin-bottom: 0.5rem;
  transition: all var(--transition-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;

  @media (max-width: 768px) {
    font-size: 2rem;
    width: 50px;
    height: 50px;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    width: 40px;
    height: 40px;
  }
`;

const TechName = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.2;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const TechToolsSection: React.FC = () => {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const allTools = getAllTechTools();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <TechToolsContainer ref={sectionRef} id="tech-tools">
      <div className="container">
        <div className="section-header">
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            Tech Stack & Tools
          </SectionTitle>
        </div>

        <TechToolsGrid
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          {allTools.map((tool) => (
            <TechToolItem
              key={tool.id}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <TechIcon color={tool.color}>
                <LogoIcon name={tool.icon} size={40} color={tool.color} />
              </TechIcon>
              <TechName>{tool.name}</TechName>
            </TechToolItem>
          ))}
        </TechToolsGrid>
      </div>
    </TechToolsContainer>
  );
};

export default TechToolsSection;
