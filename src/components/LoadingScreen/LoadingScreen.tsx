import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--primary-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  flex-direction: column;
`;

const BrandName = styled(motion.h1)`
  font-family: var(--font-secondary);
  font-size: 3rem;
  font-weight: 300;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Subtitle = styled(motion.p)`
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 300;
  margin: 1rem 0 0 0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const LoadingScreen: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut'
      }
    }
  };

  const brandVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <LoadingContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <BrandName
        variants={brandVariants}
        initial="hidden"
        animate="visible"
      >
        Prakash
      </BrandName>
      
      <Subtitle
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
      >
        AI Researcher & Developer
      </Subtitle>
    </LoadingContainer>
  );
};

export default LoadingScreen;
