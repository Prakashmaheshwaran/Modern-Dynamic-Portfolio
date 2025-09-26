import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useProjectsData } from '../../hooks/useProjectsData';
import { ProcessedProject } from '../../config/projectsConfig';
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

const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  text-align: center;
`;

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--accent-green);
  border-radius: 50%;
  margin: 0 auto 1rem;
`;

const ErrorContainer = styled(motion.div)`
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 3rem 2rem;
  text-align: center;
  margin-top: 2rem;
`;

const RetryButton = styled(motion.button)`
  padding: 12px 24px;
  background: linear-gradient(135deg, var(--accent-green), var(--accent-pink));
  border: none;
  border-radius: var(--border-radius);
  color: var(--primary-bg);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all var(--transition-medium);
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
  }
`;

const EmptyState = styled(motion.div)`
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 4rem 2rem;
  text-align: center;
  margin-top: 2rem;

  h3 {
    font-size: 1.5rem;
    color: var(--accent-green);
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-muted);
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const ProjectMetadata = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 0.75rem;
  }
`;

const MetadataItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  i {
    color: var(--accent-green);
  }
`;

const ViewMoreContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const ViewMoreButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 14px 28px;
  background: linear-gradient(135deg, var(--accent-green), var(--accent-pink));
  border: none;
  border-radius: var(--border-radius);
  color: var(--primary-bg);
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-medium);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(120, 119, 198, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  i {
    font-size: 1.1rem;
    transition: transform var(--transition-medium);
  }

  &:hover i {
    transform: translateX(2px);
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 0.9rem;
    
    i {
      font-size: 1rem;
    }
  }
`;


const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showDynamic, setShowDynamic] = useState(true);
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const { projects: githubProjects, loading, error, refetch } = useProjectsData();

  const filteredProjects = useMemo(() => {
    if (showDynamic && githubProjects.length > 0) {
      // Filter GitHub projects by language if not 'all'
      if (activeFilter === 'all') {
        return githubProjects;
      }
      return githubProjects.filter(project => 
        project.language.toLowerCase() === activeFilter.toLowerCase()
      );
    }
    // Fallback to static data with filtering
    return getProjectsByCategory(activeFilter);
  }, [activeFilter, githubProjects, showDynamic]);

  const filters = useMemo(() => {
    if (showDynamic && githubProjects.length > 0) {
      // For GitHub projects, show language-based filters
      const languages = Array.from(new Set(githubProjects.map(p => p.language).filter(Boolean)));
      return [
        { key: 'all', label: 'All Projects' },
        ...languages.slice(0, 4).map(lang => ({ key: lang.toLowerCase(), label: lang }))
      ];
    }
    // Static filters for fallback data
    return [
      { key: 'all', label: 'All Projects' },
      { key: 'automation', label: 'Automation' },
      { key: 'ml', label: 'Machine Learning' },
      { key: 'web', label: 'Web Development' },
      { key: 'research', label: 'Research' }
    ];
  }, [showDynamic, githubProjects]);

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

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const renderGitHubProjectCard = (project: ProcessedProject, index: number) => (
    <ProjectCard
      key={`github-${project.id}`}
      variants={cardVariants}
      layout
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      onClick={() => handleProjectClick(project.github)}
    >
      <ProjectImage>
        {project.title.split(' ').map(word => word[0]).join('').toUpperCase()}
      </ProjectImage>
      <ProjectContent>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
        <ProjectMetadata>
          <MetadataItem>
            <i className="fas fa-star" /> {project.stars}
          </MetadataItem>
          <MetadataItem>
            <i className="fas fa-code" /> {project.language}
          </MetadataItem>
          <MetadataItem>
            <i className="fas fa-calendar" /> {formatDate(project.lastUpdated)}
          </MetadataItem>
          {project.isForked && (
            <MetadataItem>
              <i className="fas fa-code-branch" /> Fork
            </MetadataItem>
          )}
        </ProjectMetadata>
        <ProjectTech>
          {project.technologies.slice(0, 4).map(tech => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </ProjectTech>
        <ProjectLinks>
          <ProjectLink href={project.github} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
            <i className="fab fa-github" /> Code
          </ProjectLink>
          <ProjectLink href={project.demo} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
            <i className="fas fa-external-link-alt" /> View
          </ProjectLink>
        </ProjectLinks>
      </ProjectContent>
    </ProjectCard>
  );

  const renderStaticProjectCard = (project: any, index: number) => (
    <ProjectCard
      key={`static-${project.id}`}
      variants={cardVariants}
      layout
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <ProjectImage>
        {project.title.split(' ').map((word: string) => word[0]).join('').toUpperCase()}
      </ProjectImage>
      <ProjectContent>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
        <ProjectTech>
          {project.technologies.slice(0, 4).map((tech: string) => (
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
  );

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

        {loading ? (
          <LoadingContainer
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <LoadingSpinner
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p>Loading GitHub projects...</p>
            </div>
          </LoadingContainer>
        ) : error && showDynamic ? (
          <ErrorContainer
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3>Unable to Load GitHub Projects</h3>
            <p>{error}</p>
            <RetryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                refetch();
                // Also toggle to static if retry fails
                setTimeout(() => setShowDynamic(false), 5000);
              }}
            >
              Try Again
            </RetryButton>
            <RetryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDynamic(false)}
              style={{ marginLeft: '1rem', background: 'transparent', border: '1px solid var(--accent-green)', color: 'var(--accent-green)' }}
            >
              Show Static Projects
            </RetryButton>
          </ErrorContainer>
        ) : filteredProjects.length === 0 ? (
          <EmptyState
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3>No Projects Available</h3>
            <p>
              I'm constantly working on exciting projects involving automation, 
              machine learning, and web development. Check back soon for updates!
            </p>
          </EmptyState>
        ) : (
          <>
            <ProjectsGrid
              variants={containerVariants}
              initial="hidden"
              animate={isIntersecting ? "visible" : "hidden"}
            >
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => 
                  showDynamic && githubProjects.length > 0
                    ? renderGitHubProjectCard(project as ProcessedProject, index)
                    : renderStaticProjectCard(project, index)
                )}
              </AnimatePresence>
            </ProjectsGrid>
            
            <ViewMoreContainer
              initial={{ opacity: 0, y: 20 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <ViewMoreButton
                href="https://github.com/Prakashmaheshwaran"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View More Projects
                <i className="fab fa-github" />
              </ViewMoreButton>
            </ViewMoreContainer>
          </>
        )}
      </div>
    </ProjectsContainer>
  );
};

export default ProjectsSection;

