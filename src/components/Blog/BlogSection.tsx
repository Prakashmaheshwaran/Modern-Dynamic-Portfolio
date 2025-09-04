import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const BlogContainer = styled.section`
  padding: var(--section-padding);
  background: var(--secondary-bg);
`;

const BlogContent = styled(motion.div)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const BlogTitle = styled(motion.h2)`
  font-family: var(--font-secondary);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const BlogSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const ComingSoon = styled(motion.div)`
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 4rem 2rem;
  text-align: center;

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

const NotifyButton = styled(motion.button)`
  padding: 12px 24px;
  background: linear-gradient(135deg, var(--accent-green), var(--accent-pink));
  border: none;
  border-radius: var(--border-radius);
  color: var(--primary-bg);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all var(--transition-medium);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
  }
`;

const BlogSection: React.FC = () => {
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

  return (
    <BlogContainer ref={sectionRef} id="blog">
      <div className="container">
        <BlogContent
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          <BlogTitle variants={itemVariants}>
            Blog
          </BlogTitle>
          
          <BlogSubtitle variants={itemVariants}>
            Sharing insights on automation, machine learning, and software development
          </BlogSubtitle>

          <ComingSoon variants={itemVariants}>
            <h3>Coming Soon!</h3>
            <p>
              I'm working on creating valuable content about automation research, 
              machine learning techniques, and software development best practices. 
              Stay tuned for technical insights and project deep-dives.
            </p>
            <NotifyButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Blog notification feature coming soon!')}
            >
              Get Notified
            </NotifyButton>
          </ComingSoon>
        </BlogContent>
      </div>
    </BlogContainer>
  );
};

export default BlogSection;
