import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useBlogData } from '../../hooks/useBlogData';
import { BlogPost } from '../../config/blogConfig';

const BlogContainer = styled.section`
  padding: 40px 0;
  background: var(--secondary-bg);
`;

const BlogContent = styled(motion.div)`
  text-align: center;
`;

const BlogTitle = styled(motion.h2)`
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

const BlogGrid = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    gap: 1rem;
    max-width: 100%;
    padding: 0 1rem;
  }
`;

const BlogCardWrapper = styled.div`
  @media (max-width: 768px) {
    /* No special styling needed - cards handle their own appearance */
  }
`;

const BlogCard = styled(motion.article)`
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0;
  overflow: hidden;
  transition: all var(--transition-medium);
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.85rem;
  gap: 1.3rem;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--accent-green);
    box-shadow: var(--shadow-glow);
  }

  @media (max-width: 768px) {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 0;
    flex-direction: row;
    text-align: left;
    gap: 1rem;
    padding: 1rem;
    align-items: center;
    min-height: auto;
    box-shadow: none;
    
    &:hover {
      transform: translateY(-2px);
      border-color: var(--accent-green);
      box-shadow: var(--shadow-glow);
    }
  }
`;

const BlogImage = styled.div<{ $imageUrl: string }>`
  width: 102px;
  height: 102px;
  min-width: 102px;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    transition: opacity var(--transition-medium);
  }

  ${BlogCard}:hover &::before {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    min-width: 60px;
    border-radius: 0;
  }
`;

const BlogCardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;

  @media (max-width: 768px) {
    padding: 0;
    text-align: left;
  }
`;

const BlogCardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.4rem;
    font-weight: 500;
    text-align: left;
  }
`;

const BlogDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 0.6rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ReadMoreButton = styled(motion.button)`
  background: transparent;
  border: 1px solid var(--accent-green);
  color: var(--accent-green);
  padding: 0.4rem 0.8rem;
  border-radius: 0;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-medium);
  align-self: center;

  &:hover {
    background: var(--accent-green);
    color: var(--primary-bg);
  }

  @media (max-width: 768px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
    margin-top: 0;
    align-self: flex-start;
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

const BlogSection: React.FC = () => {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  const { blogs, loading, error, refetch } = useBlogData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const cardVariants = {
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

  const handleBlogClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderBlogCard = (blog: BlogPost, index: number) => (
    <BlogCardWrapper key={`${blog.title}-${index}`}>
      <BlogCard
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleBlogClick(blog.url)}
      >
        <BlogImage $imageUrl={blog.cover_image} />
        <BlogCardContent>
          <BlogCardTitle>{blog.title}</BlogCardTitle>
          <BlogDescription>{blog.description}</BlogDescription>
          <ReadMoreButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Read More
          </ReadMoreButton>
        </BlogCardContent>
      </BlogCard>
    </BlogCardWrapper>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <LoadingContainer variants={itemVariants}>
          <div>
            <LoadingSpinner
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p>Loading latest blog posts...</p>
          </div>
        </LoadingContainer>
      );
    }

    if (error) {
      return (
        <ErrorContainer variants={itemVariants}>
          <h3>Unable to Load Blog Posts</h3>
          <p>{error}</p>
          <RetryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refetch}
          >
            Try Again
          </RetryButton>
        </ErrorContainer>
      );
    }

    if (blogs.length === 0) {
      return (
        <EmptyState variants={itemVariants}>
          <h3>No Blog Posts Available</h3>
          <p>
            I'm working on creating valuable content about automation research, 
            machine learning techniques, and software development best practices. 
            Stay tuned for technical insights and project deep-dives.
          </p>
        </EmptyState>
      );
    }

    return (
      <BlogGrid
        variants={containerVariants}
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
      >
        {blogs.map((blog, index) => renderBlogCard(blog, index))}
      </BlogGrid>
    );
  };

  return (
    <BlogContainer ref={sectionRef} id="blog">
      <div className="container">
        <BlogContent
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          <BlogTitle variants={itemVariants}>
            Thoughts & Insights
          </BlogTitle>
          
          {renderContent()}
        </BlogContent>
      </div>
    </BlogContainer>
  );
};

export default BlogSection;
