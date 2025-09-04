import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

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

const LoaderWrapper = styled.div`
  text-align: center;
`;

const LoaderSphere = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--accent-green);
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: ${spin} 1s linear infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top: 2px solid var(--accent-pink);
    animation: ${spin} 1.5s linear infinite reverse;
  }
`;

const LoadingText = styled(motion.p)`
  color: var(--text-secondary);
  font-size: 1.1rem;
  font-weight: 500;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 2px;
  background: var(--border-color);
  border-radius: 1px;
  margin: 20px auto 0;
  overflow: hidden;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, var(--accent-green), var(--accent-pink));
  border-radius: 1px;
  width: 0%;
`;

const BrandName = styled(motion.h1)`
  font-family: var(--font-secondary);
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent-green), var(--accent-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
`;

const LoadingScreen: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  };

  const brandVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: 'easeOut'
      }
    }
  };

  const progressVariants = {
    hidden: { width: '0%' },
    visible: {
      width: '100%',
      transition: {
        duration: 2,
        ease: 'easeInOut'
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
      <LoaderWrapper>
        <BrandName
          variants={brandVariants}
          initial="hidden"
          animate="visible"
        >
          PM
        </BrandName>
        
        <LoaderSphere />
        
        <LoadingText
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Loading Portfolio...
        </LoadingText>
        
        <ProgressBar>
          <Progress
            variants={progressVariants}
            initial="hidden"
            animate="visible"
          />
        </ProgressBar>
      </LoaderWrapper>
    </LoadingContainer>
  );
};

export default LoadingScreen;
