import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useBlogData } from '../../hooks/useBlogData';
import { BlogPost } from '../../config/blogConfig';
import soundManager from '../../utils/soundManager';
import { SITE_CONFIG } from '../../config/siteConfig';

const BlogContainer = styled.section`
  padding: 4rem 0;
  background: var(--secondary-bg);

  @media (max-width: 768px) { padding: 2.5rem 0; }
`;

const BlogContent = styled(motion.div)`
  text-align: center;
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

const BlogTitle = styled(motion.h2)`
  font-family: var(--font-secondary, 'Teko', sans-serif);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-bright, #ffffff);
`;

const BlogGrid = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) { gap: 0.8rem; padding: 0 1rem; }
`;

const BlogCard = styled(motion.article)`
  background: rgba(16, 18, 22, 0.9);
  border: 1px solid rgba(255, 140, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.8rem;
  gap: 1rem;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));

  &:hover {
    border-color: rgba(255, 140, 0, 0.2);
    box-shadow: 0 4px 25px rgba(255, 140, 0, 0.05);
  }

  @media (max-width: 768px) { gap: 0.8rem; padding: 0.7rem; }
`;

const BlogImage = styled.div<{ $imageUrl: string }>`
  width: 90px;
  height: 90px;
  min-width: 90px;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 140, 0, 0.1), rgba(0, 0, 0, 0.3));
  }

  @media (max-width: 768px) { width: 55px; height: 55px; min-width: 55px; }
`;

const BlogCardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
`;

const BlogCardTitle = styled.h3`
  font-family: var(--font-primary, 'Rajdhani', sans-serif);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.3rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) { font-size: 0.9rem; }
`;

const BlogDescription = styled.p`
  color: var(--text-muted);
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: 0.4rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) { display: none; }
`;

const BlogMetadata = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.6rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
`;

const BlogTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 0.4rem;

  @media (max-width: 768px) { display: none; }
`;

const TagItem = styled.span`
  background: rgba(255, 140, 0, 0.06);
  border: 1px solid rgba(255, 140, 0, 0.08);
  color: var(--text-secondary);
  padding: 0.15rem 0.4rem;
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const ReadMoreButton = styled(motion.button)`
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
  background: transparent;
  border: 1px solid rgba(255, 140, 0, 0.2);
  color: var(--cod-orange, #ff8c00);
  padding: 0.3rem 0.6rem;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;

  &:hover { background: rgba(255, 140, 0, 0.1); }

  @media (max-width: 768px) { font-size: 0.55rem; padding: 0.25rem 0.5rem; }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 3rem 2rem;
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
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-top: 1rem;
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
  font-size: 1rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s ease;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));

  &:hover { background: rgba(255, 140, 0, 0.2); box-shadow: 0 0 25px rgba(255, 140, 0, 0.1); }
`;

const BlogSection: React.FC = () => {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
  const { blogs, loading, error, refetch } = useBlogData();

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };
  const cardVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } };

  const handleBlogClick = (url: string) => { soundManager.playUIClick(); window.open(url, '_blank', 'noopener,noreferrer'); };
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const renderBlogCard = (blog: BlogPost, index: number) => (
    <BlogCard key={`${blog.id || blog.title}-${index}`} variants={cardVariants} whileHover={{ scale: 1.01 }} onClick={() => handleBlogClick(blog.url)} aria-label={`Read blog post: ${blog.title}`}>
      <BlogImage $imageUrl={blog.cover_image} />
      <BlogCardContent>
        <BlogCardTitle>{blog.title}</BlogCardTitle>
        <BlogDescription>{blog.description}</BlogDescription>
        {blog.published_at && (
          <BlogMetadata>
            <span>{blog.reading_time_minutes || 1} min</span>
            <span>{blog.public_reactions_count || 0} reactions</span>
            <span>{formatDate(blog.published_at)}</span>
            {blog.comments_count > 0 && <span>{blog.comments_count} comments</span>}
          </BlogMetadata>
        )}
        {blog.tag_list && blog.tag_list.length > 0 && (
          <BlogTags>{blog.tag_list.slice(0, 3).map(tag => <TagItem key={tag}>#{tag}</TagItem>)}</BlogTags>
        )}
        <ReadMoreButton whileHover={{ scale: 1.05 }} onClick={(e: React.MouseEvent) => e.stopPropagation()}>[ Read Report ]</ReadMoreButton>
      </BlogCardContent>
    </BlogCard>
  );

  return (
    <BlogContainer ref={sectionRef} id="blog">
      <div className="container">
        <BlogContent variants={containerVariants} initial="hidden" animate={isIntersecting ? "visible" : "hidden"}>
          <SectionLabel variants={itemVariants}>{'// Dispatch'}</SectionLabel>
          <BlogTitle variants={itemVariants}>Field Reports</BlogTitle>

          {loading ? (
            <LoadingContainer variants={itemVariants}><div><LoadingSpinner animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} /><p>Decrypting reports...</p></div></LoadingContainer>
          ) : error ? (
            <ErrorContainer variants={itemVariants}><h3>Signal Lost</h3><p>{error}</p><RetryButton onClick={refetch}>Retry</RetryButton></ErrorContainer>
          ) : blogs.length === 0 ? (
            <EmptyState variants={itemVariants}><h3>No Reports Filed</h3><p>New field reports on AI, automation, and development incoming. Stand by.</p></EmptyState>
          ) : (
            <>
              <BlogGrid variants={containerVariants} initial="hidden" animate={isIntersecting ? "visible" : "hidden"}>
                {blogs.map((blog, index) => renderBlogCard(blog, index))}
              </BlogGrid>
              <ViewMoreContainer initial={{ opacity: 0 }} animate={isIntersecting ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
                <ViewMoreButton href={SITE_CONFIG.links.devTo} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}>View All Reports</ViewMoreButton>
              </ViewMoreContainer>
            </>
          )}
        </BlogContent>
      </div>
    </BlogContainer>
  );
};

export default BlogSection;
