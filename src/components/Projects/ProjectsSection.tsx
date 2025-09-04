import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { getProjectsByCategory } from '../../data/projectsData';

const ProjectsContainer = styled.section`
  padding: var(--section-padding);
  background: var(--primary-bg);
`;

const ProjectFilters = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
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
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all var(--transition-medium);

  &:hover {
    transform: translateY(-10px);
    border-color: var(--accent-green);
    box-shadow: var(--shadow-lg);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, var(--accent-green), var(--accent-pink));
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-bg);
  font-weight: 600;
  font-size: 1.1rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--overlay-bg);
    opacity: 0;
    transition: opacity var(--transition-medium);
  }

  ${ProjectCard}:hover &::before {
    opacity: 1;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background: var(--border-color);
  color: var(--text-secondary);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  color: var(--accent-green);
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--accent-pink);
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
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Innovative solutions and research implementations
          </motion.p>
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
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectImage>
                  {project.title}
                </ProjectImage>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectTech>
                    {project.technologies.map(tech => (
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
