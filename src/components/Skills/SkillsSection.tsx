import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { skillsData, skillCategories } from '../../data/skillsData';
import LogoIcon from '../UI/LogoIcon';

const SkillsContainer = styled.section`
  padding: var(--section-padding);
  background: var(--secondary-bg);
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const SkillCategory = styled(motion.div)`
  background: var(--card-bg);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
  padding: 2rem;
  transition: all var(--transition-medium);

  &:hover {
    transform: translateY(-5px);
    border-color: var(--accent-green);
    box-shadow: var(--shadow-md);
  }

  h3 {
    font-size: 1.4rem;
    color: var(--accent-green);
    margin-bottom: 1.5rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    i {
      font-size: 1.2rem;
    }
  }
`;

const SkillItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1rem;
`;

const SkillItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--secondary-bg);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  transition: all var(--transition-medium);

  &:hover {
    transform: translateY(-3px);
    border-color: var(--accent-green);
    box-shadow: var(--shadow-sm);
  }
`;

const SkillIcon = styled.div<{ color: string }>`
  font-size: 2rem;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

const SkillName = styled.span`
  font-size: 0.85rem;
  color: var(--text-primary);
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
`;

const SkillsSection: React.FC = () => {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const categoryVariants = {
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

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  };

  const getSkillsByCategory = (category: string) => {
    return skillsData.filter(skill => skill.category === category);
  };

  return (
    <SkillsContainer ref={sectionRef} id="skills">
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            Technical Skills
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Technologies and tools I work with
          </motion.p>
        </div>

        <SkillsGrid
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          {skillCategories.map((category, categoryIndex) => {
            const categorySkills = getSkillsByCategory(category.key);
            
            return (
              <SkillCategory
                key={category.key}
                variants={categoryVariants}
                whileHover={{ scale: 1.02 }}
              >
                <h3>
                  <LogoIcon name={category.icon} size={20} color="var(--accent-green)" />
                  {category.label}
                </h3>
                <SkillItems>
                  {categorySkills.map((skill, skillIndex) => (
                    <SkillItem
                      key={skill.name}
                      variants={skillItemVariants}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        transitionDelay: `${(categoryIndex * 4 + skillIndex) * 0.05}s`
                      }}
                    >
                      <SkillIcon color={skill.color}>
                        <LogoIcon 
                          name={skill.icon || 'code'} 
                          size={32} 
                          color={skill.color} 
                        />
                      </SkillIcon>
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
