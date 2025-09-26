import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { getProjectsByCategory } from '../../data/projectsData';

const ProjectsContainer = styled.section`
  padding: 40px 0;
  background: var(--primary-bg);
  
  @media (max-width: 768px) {
    padding: 30px 0;
  }
  
  @media (max-width: 480px) {
    padding: 20px 0;
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

const ProjectFilters = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.75rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
`;

const FilterButton = styled(motion.button)<{ isActive: boolean }>`
  padding: 10px 20px;
  background: ${props => props.isActive ? 'var(--accent-green)' : 'transparent'};
  border: 2px solid var(--accent-green);
  color: ${props => props.isActive ? 'var(--primary-bg)' : 'var(--text-secondary)'};
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  font-family: inherit;
  transition: all var(--transition-medium);

  &:hover {
    background: var(--accent-green);
    color: var(--primary-bg);
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 1.5rem;
    max-width: 100%;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    gap: 1.25rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all var(--transition-medium);
  position: relative;
  display: flex;
  min-height: 200px;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--accent-green);
    box-shadow: 0 8px 32px rgba(120, 119, 198, 0.1);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
  }
`;

const ProjectImage = styled.div`
  width: 200px;
  min-width: 200px;
  background: linear-gradient(135deg, var(--accent-green), var(--accent-pink));
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-bg);
  font-weight: 700;
  font-size: 1.8rem;
  text-align: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
    height: 120px;
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    height: 100px;
    font-size: 1.2rem;
  }
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    text-align: center;
    gap: 0.5rem;
    padding: 1.25rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 0.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  line-height: 1.5;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 0.4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 0.4rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.3rem;
  }
`;

const TechTag = styled.span`
  background: var(--primary-bg);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.3rem 0.8rem;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all var(--transition-fast);
  
  &:hover {
    border-color: var(--accent-green);
    color: var(--accent-green);
  }
  
  @media (max-width: 768px) {
    padding: 0.25rem 0.6rem;
    font-size: 0.7rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.2rem 0.5rem;
    font-size: 0.65rem;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.4rem;
  }
`;

const ProjectLink = styled.a`
  color: var(--accent-green);
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: color var(--transition-fast);
  font-size: 0.8rem;

  &:hover {
    color: var(--accent-pink);
  }
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
    gap: 0.2rem;
  }
`;


const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const filteredProjects = useMemo(() => {
    return getProjectsByCategory(activeFilter);
  }, [activeFilter]);

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'automation', label: 'Automation' },
    { key: 'ml', label: 'Machine Learning' },
    { key: 'web', label: 'Web Development' },
    { key: 'research', label: 'Research' }
  ];

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

  const cardVariants = {
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

  return (
    <ProjectsContainer ref={sectionRef} id="projects">
      <div className="container">
        <div className="section-header">
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            My Creations
          </SectionTitle>
        </div>

        <ProjectFilters
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <FilterButton
              key={filter.key}
              isActive={activeFilter === filter.key}
              onClick={() => setActiveFilter(filter.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </FilterButton>
          ))}
        </ProjectFilters>

        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                variants={cardVariants}
                layout
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectImage>
                  {project.title.split(' ').map(word => word[0]).join('').toUpperCase()}
                </ProjectImage>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectTech>
                    {project.technologies.slice(0, 4).map(tech => (
                      <TechTag key={tech}>{tech}</TechTag>
                    ))}
                  </ProjectTech>
                  <ProjectLinks>
                    <ProjectLink href={project.github} target="_blank" rel="noopener">
                      <i className="fab fa-github" /> Code
                    </ProjectLink>
                    <ProjectLink href={project.demo} target="_blank" rel="noopener">
                      <i className="fas fa-external-link-alt" /> Demo
                    </ProjectLink>
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </div>
    </ProjectsContainer>
  );
};

export default ProjectsSection;

