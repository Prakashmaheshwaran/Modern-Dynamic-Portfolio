import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { skillsData, skillCategories } from '../../data/skillsData';
import LogoIcon from '../UI/LogoIcon';

const SkillsContainer = styled.section`
  padding: 4rem 0;
  background: var(--secondary-bg);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 140, 0, 0.01) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 140, 0, 0.01) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  @media (max-width: 768px) { padding: 2.5rem 0; }
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
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-bright, #ffffff);
  margin-bottom: 0.25rem;
`;

const SectionSubtitle = styled(motion.p)`
  font-family: var(--font-primary, 'Rajdhani', sans-serif);
  font-size: 0.9rem;
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) { grid-template-columns: 1fr; gap: 1.2rem; }
`;

const SkillCategory = styled(motion.div)`
  background: rgba(16, 18, 22, 0.9);
  border: 1px solid rgba(255, 140, 0, 0.06);
  padding: 1.5rem;
  transition: all 0.3s ease;
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));

  &:hover {
    border-color: rgba(255, 140, 0, 0.15);
    box-shadow: 0 4px 25px rgba(255, 140, 0, 0.04);
  }

  h3 {
    font-family: var(--font-secondary, 'Teko', sans-serif);
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--cod-orange, #ff8c00);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
`;

const SkillItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  gap: 0.8rem;

  @media (max-width: 480px) { grid-template-columns: repeat(auto-fit, minmax(60px, 1fr)); gap: 0.6rem; }
`;

const SkillItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 0.8rem 0.4rem;
  background: rgba(10, 11, 13, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.03);
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(255, 140, 0, 0.15);
    background: rgba(255, 140, 0, 0.04);
  }
`;

const SkillIcon = styled.div<{ color: string }>`
  font-size: 1.8rem;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;

  @media (max-width: 480px) { font-size: 1.5rem; width: 30px; height: 30px; }
`;

const SkillName = styled.span`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.6rem;
  color: var(--text-secondary);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.2;

  @media (max-width: 480px) { font-size: 0.55rem; }
`;

const SkillsSection: React.FC = () => {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
  const categoryVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };
  const skillItemVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } } };

  const getSkillsByCategory = (category: string) => skillsData.filter(skill => skill.category === category);

  return (
    <SkillsContainer ref={sectionRef} id="skills">
      <div className="container">
        <SectionLabel initial={{ opacity: 0 }} animate={isIntersecting ? { opacity: 0.6 } : { opacity: 0 }} transition={{ duration: 0.6 }}>// Skill Set</SectionLabel>
        <SectionTitle initial={{ opacity: 0, y: 30 }} animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6 }}>Skills</SectionTitle>
        <SectionSubtitle initial={{ opacity: 0 }} animate={isIntersecting ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>Core technologies and expertise</SectionSubtitle>

        <SkillsGrid variants={containerVariants} initial="hidden" animate={isIntersecting ? "visible" : "hidden"}>
          {skillCategories.map((category, categoryIndex) => {
            const categorySkills = getSkillsByCategory(category.key);
            return (
              <SkillCategory key={category.key} variants={categoryVariants}>
                <h3>
                  <LogoIcon name={category.icon} size={18} color="#ff8c00" />
                  {category.label}
                </h3>
                <SkillItems>
                  {categorySkills.map((skill, skillIndex) => (
                    <SkillItem key={skill.name} variants={skillItemVariants} whileHover={{ scale: 1.05 }} style={{ transitionDelay: `${(categoryIndex * 4 + skillIndex) * 0.03}s` }}>
                      <SkillIcon color={skill.color}><LogoIcon name={skill.icon || 'code'} size={28} color={skill.color} /></SkillIcon>
                      <SkillName>{skill.name}</SkillName>
                    </SkillItem>
                  ))}
                </SkillItems>
              </SkillCategory>
            );
          })}
        </SkillsGrid>
      </div>
    </SkillsContainer>
  );
};

export default SkillsSection;
