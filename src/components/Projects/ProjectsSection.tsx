import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useProjectsData } from '../../hooks/useProjectsData';
import { ProcessedProject } from '../../config/projectsConfig';
import { getProjectsByCategory } from '../../data/projectsData';
import soundManager from '../../utils/soundManager';

const ProjectsContainer = styled.section`
  padding: 4rem 0;
  background: var(--primary-bg);
  position: relative;

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
  margin-bottom: 0.5rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-bright, #ffffff);
`;

const ProjectFilters = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;

  @media (max-width: 480px) { gap: 0.4rem; margin-bottom: 1.5rem; }
`;

const FilterButton = styled(motion.button)<{ $isActive: boolean }>`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  padding: 8px 18px;
  background: ${props => props.$isActive ? 'rgba(255, 140, 0, 0.15)' : 'transparent'};
  border: 1px solid ${props => props.$isActive ? 'rgba(255, 140, 0, 0.4)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$isActive ? '#ff8c00' : 'var(--text-secondary)'};
  cursor: pointer;
  font-weight: 500;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all 0.2s ease;
  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));

  &:hover {
    background: rgba(255, 140, 0, 0.1);
    border-color: rgba(255, 140, 0, 0.3);
    color: #ff8c00;
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) { gap: 1rem; padding: 0 1rem; }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(16, 18, 22, 0.9);
  border: 1px solid rgba(255, 140, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  min-height: 160px;
  overflow: hidden;
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: var(--cod-orange, #ff8c00);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: rgba(255, 140, 0, 0.2);
    box-shadow: 0 4px 30px rgba(255, 140, 0, 0.05);
    &::before { opacity: 0.5; }
  }

  @media (max-width: 768px) { flex-direction: column; min-height: auto; }
`;

const ProjectImage = styled.div`
  width: 160px;
  min-width: 160px;
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.1), rgba(251, 191, 36, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cod-orange, #ff8c00);
  font-family: var(--font-secondary, 'Teko', sans-serif);
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: 0.1em;

  @media (max-width: 768px) { width: 100%; min-width: 100%; height: 80px; font-size: 1.2rem; }
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  padding: 1.2rem;

  @media (max-width: 768px) { text-align: center; padding: 1rem; }
`;

const ProjectTitle = styled.h3`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-bright, #ffffff);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.2;
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;

  @media (max-width: 768px) { justify-content: center; }
`;

const TechTag = styled.span`
  background: rgba(255, 140, 0, 0.06);
  border: 1px solid rgba(255, 140, 0, 0.1);
  color: var(--text-primary);
  padding: 0.2rem 0.6rem;
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;

  &:hover { border-color: rgba(255, 140, 0, 0.3); color: var(--cod-orange, #ff8c00); }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 0.6rem;
  @media (max-width: 768px) { justify-content: center; }
`;

const ProjectLink = styled.a`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  color: var(--cod-orange, #ff8c00);
  text-decoration: none;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: color 0.2s ease;

  &:hover { color: var(--cod-gold, #fbbf24); }
`;

const ProjectMetadata = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.6rem;
  color: var(--text-muted);
  text-transform: uppercase;

  @media (max-width: 768px) { justify-content: center; }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
`;

const LoadingSpinner = styled(motion.div)`
  width: 30px;
  height: 30px;
  border: 2px solid rgba(255, 140, 0, 0.1);
  border-top: 2px solid var(--cod-orange, #ff8c00);
  border-radius: 50%;
  margin: 0 auto 1rem;
`;

const ErrorContainer = styled(motion.div)`
  background: rgba(16, 18, 22, 0.9);
  border: 1px solid rgba(255, 140, 0, 0.1);
  padding: 2.5rem;
  text-align: center;
  margin-top: 1.5rem;
`;

const RetryButton = styled(motion.button)`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  padding: 10px 24px;
  background: rgba(255, 140, 0, 0.12);
  border: 1px solid rgba(255, 140, 0, 0.3);
  color: var(--cod-orange, #ff8c00);
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.2s ease;

  &:hover { background: rgba(255, 140, 0, 0.2); }
`;

const EmptyState = styled(motion.div)`
  background: rgba(16, 18, 22, 0.9);
  border: 1px solid rgba(255, 140, 0, 0.08);
  padding: 3rem 2rem;
  text-align: center;
  margin-top: 1.5rem;

  h3 { font-family: var(--font-secondary, 'Teko', sans-serif); font-size: 1.4rem; color: var(--cod-orange, #ff8c00); margin-bottom: 0.5rem; text-transform: uppercase; }
  p { color: var(--text-muted); font-size: 0.9rem; }
`;

const ViewMoreContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const ViewMoreButton = styled(motion.a)`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 28px;
  background: rgba(255, 140, 0, 0.1);
  border: 1px solid rgba(255, 140, 0, 0.3);
  color: var(--cod-orange, #ff8c00);
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s ease;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));

  &:hover { background: rgba(255, 140, 0, 0.2); box-shadow: 0 0 25px rgba(255, 140, 0, 0.1); }
`;

const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showDynamic, setShowDynamic] = useState(true);
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const { projects: githubProjects, loading, error, refetch } = useProjectsData();

  const filteredProjects = useMemo(() => {
    if (showDynamic && githubProjects.length > 0) {
      if (activeFilter === 'all') return githubProjects;
      return githubProjects.filter(p => p.language.toLowerCase() === activeFilter.toLowerCase());
    }
    return getProjectsByCategory(activeFilter);
  }, [activeFilter, githubProjects, showDynamic]);

  const filters = useMemo(() => {
    if (showDynamic && githubProjects.length > 0) {
      const languages = Array.from(new Set(githubProjects.map(p => p.language).filter(Boolean)));
      return [{ key: 'all', label: 'All Ops' }, ...languages.slice(0, 4).map(lang => ({ key: lang.toLowerCase(), label: lang }))];
    }
    return [{ key: 'all', label: 'All Ops' }, { key: 'automation', label: 'Automation' }, { key: 'ml', label: 'AI/ML' }, { key: 'web', label: 'Web Ops' }, { key: 'research', label: 'Recon' }];
  }, [showDynamic, githubProjects]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
  const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

  const handleProjectClick = (url: string) => { soundManager.playUIClick(); window.open(url, '_blank', 'noopener,noreferrer'); };
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

  const renderGitHubProjectCard = (project: ProcessedProject) => (
    <ProjectCard key={`github-${project.id}`} variants={cardVariants} layout whileHover={{ scale: 1.01 }} onClick={() => handleProjectClick(project.github)}>
      <ProjectImage>{project.title.split(' ').map(word => word[0]).join('').toUpperCase()}</ProjectImage>
      <ProjectContent>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
        <ProjectMetadata>
          <span>{project.stars} stars</span>
          <span>{project.language}</span>
          <span>{formatDate(project.lastUpdated)}</span>
          {project.isForked && <span>Fork</span>}
        </ProjectMetadata>
        <ProjectTech>{project.technologies.slice(0, 4).map(tech => <TechTag key={tech}>{tech}</TechTag>)}</ProjectTech>
        <ProjectLinks>
          <ProjectLink href={project.github} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>[ Code ]</ProjectLink>
          <ProjectLink href={project.demo} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>[ Deploy ]</ProjectLink>
        </ProjectLinks>
      </ProjectContent>
    </ProjectCard>
  );

  const renderStaticProjectCard = (project: any) => (
    <ProjectCard key={`static-${project.id}`} variants={cardVariants} layout whileHover={{ scale: 1.01 }}>
      <ProjectImage>{project.title.split(' ').map((word: string) => word[0]).join('').toUpperCase()}</ProjectImage>
      <ProjectContent>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
        <ProjectTech>{project.technologies.slice(0, 4).map((tech: string) => <TechTag key={tech}>{tech}</TechTag>)}</ProjectTech>
        <ProjectLinks>
          <ProjectLink href={project.github} target="_blank" rel="noopener">[ Code ]</ProjectLink>
          <ProjectLink href={project.demo} target="_blank" rel="noopener">[ Deploy ]</ProjectLink>
        </ProjectLinks>
      </ProjectContent>
    </ProjectCard>
  );

  return (
    <ProjectsContainer ref={sectionRef} id="projects">
      <div className="container">
        <SectionLabel initial={{ opacity: 0 }} animate={isIntersecting ? { opacity: 0.6 } : { opacity: 0 }} transition={{ duration: 0.6 }}>{'// Mission Log'}</SectionLabel>
        <SectionTitle initial={{ opacity: 0, y: 30 }} animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6 }}>Operations</SectionTitle>
        <ProjectFilters initial={{ opacity: 0 }} animate={isIntersecting ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          {filters.map(filter => (
            <FilterButton key={filter.key} $isActive={activeFilter === filter.key} onClick={() => { soundManager.playUIClick(); setActiveFilter(filter.key); }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{filter.label}</FilterButton>
          ))}
        </ProjectFilters>

        {loading ? (
          <LoadingContainer><div><LoadingSpinner animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} /><p>Loading missions...</p></div></LoadingContainer>
        ) : error && showDynamic ? (
          <ErrorContainer><h3>Signal Lost</h3><p>{error}</p><RetryButton onClick={() => { refetch(); setTimeout(() => setShowDynamic(false), 5000); }}>Retry</RetryButton><RetryButton onClick={() => setShowDynamic(false)} style={{ marginLeft: '0.5rem', background: 'transparent' }}>Use Cached Data</RetryButton></ErrorContainer>
        ) : filteredProjects.length === 0 ? (
          <EmptyState><h3>No Missions Found</h3><p>Working on new projects in AI, automation, and web development. Check back soon.</p></EmptyState>
        ) : (
          <>
            <ProjectsGrid variants={containerVariants} initial="hidden" animate={isIntersecting ? "visible" : "hidden"}>
              <AnimatePresence mode="wait">
                {filteredProjects.map(project => showDynamic && githubProjects.length > 0 ? renderGitHubProjectCard(project as ProcessedProject) : renderStaticProjectCard(project))}
              </AnimatePresence>
            </ProjectsGrid>
            <ViewMoreContainer initial={{ opacity: 0 }} animate={isIntersecting ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
              <ViewMoreButton href="https://github.com/Prakashmaheshwaran" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}>Full Arsenal on GitHub</ViewMoreButton>
            </ViewMoreContainer>
          </>
        )}
      </div>
    </ProjectsContainer>
  );
};

export default ProjectsSection;
