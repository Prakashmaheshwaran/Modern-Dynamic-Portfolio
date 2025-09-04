import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { scrollToSection } from '../../utils/scrollUtils';

interface HeroSectionProps {
  onSectionChange: (section: string) => void;
}

const HeroContainer = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--primary-bg);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 80%, rgba(0, 255, 170, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 106, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(0, 255, 170, 0.05) 0%, transparent 30%);
    z-index: 1;
    animation: backgroundFloat 20s ease-in-out infinite;
  }

  @keyframes backgroundFloat {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    33% {
      transform: translateY(-10px) rotate(1deg);
    }
    66% {
      transform: translateY(5px) rotate(-1deg);
    }
  }
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border: 1px solid rgba(0, 255, 170, 0.1);
    border-radius: 50%;
    top: 10%;
    right: 10%;
    animation: float 15s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border: 1px solid rgba(255, 106, 255, 0.1);
    border-radius: 50%;
    bottom: 20%;
    left: 15%;
    animation: float 12s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) translateX(0px);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-20px) translateX(10px);
      opacity: 0.6;
    }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
`;

const HeroText = styled(motion.div)`
  margin-bottom: 2.5rem;
`;

const HeroGreeting = styled(motion.span)`
  display: block;
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const HeroName = styled(motion.h1)`
  font-family: var(--font-secondary);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent-green), var(--accent-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1.1;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.1rem;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
`;

const HeroCTA = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(motion.button)<{ variant: 'primary' | 'secondary' }>`
  padding: 15px 30px;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  min-width: 180px;
  justify-content: center;
  font-family: inherit;
  
  background: ${props => props.variant === 'primary' 
    ? 'linear-gradient(135deg, var(--accent-green), var(--accent-pink))'
    : 'transparent'
  };
  
  color: ${props => props.variant === 'primary' 
    ? 'var(--primary-bg)'
    : 'var(--text-primary)'
  };
  
  border: ${props => props.variant === 'secondary' 
    ? '2px solid var(--accent-green)'
    : 'none'
  };

  transition: all var(--transition-medium);

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.variant === 'primary'
      ? '0 10px 40px rgba(0, 255, 170, 0.4)'
      : 'var(--shadow-md)'
    };
    
    background: ${props => props.variant === 'secondary'
      ? 'var(--accent-green)'
      : undefined
    };
    
    color: ${props => props.variant === 'secondary'
      ? 'var(--primary-bg)'
      : undefined
    };
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  z-index: 2;
`;

const ScrollArrow = styled(motion.div)`
  width: 2px;
  height: 30px;
  background: var(--accent-green);
  margin: 0 auto 10px;
`;



const HeroSection: React.FC<HeroSectionProps> = ({ onSectionChange }) => {
  const handleCTAClick = (section: string) => {
    scrollToSection(section);
    onSectionChange(section);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
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

  const nameVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 1.5,
        ease: 'easeOut'
      }
    }
  };

  const arrowVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <HeroContainer id="hero">
      <AnimatedBackground />

      <HeroContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <HeroText>
            <HeroGreeting variants={itemVariants}>
              Hi, I'm
            </HeroGreeting>
            
            <HeroName variants={nameVariants}>
              Prakash Maheshwaran
            </HeroName>
            
            <HeroSubtitle variants={itemVariants}>
              Automation RA & MS in CS @ SUNY Binghamton
            </HeroSubtitle>
            
            <HeroDescription variants={itemVariants}>
              Passionate about automation research, machine learning, and building innovative solutions. 
              Currently seeking H-1B sponsorship opportunities to contribute to cutting-edge tech companies.
            </HeroDescription>
          </HeroText>

          <HeroCTA variants={ctaVariants}>
            <motion.div variants={buttonVariants}>
              <CTAButton
                variant="primary"
                onClick={() => handleCTAClick('projects')}
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <span>View Projects</span>
                <i className="fas fa-arrow-right" />
              </CTAButton>
            </motion.div>
            
            <motion.div variants={buttonVariants}>
              <CTAButton
                variant="secondary"
                onClick={() => handleCTAClick('contact')}
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <span>Get In Touch</span>
              </CTAButton>
            </motion.div>
          </HeroCTA>
        </motion.div>
      </HeroContent>

      <ScrollIndicator
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
      >
        <ScrollArrow
          variants={arrowVariants}
          animate="animate"
        />
        <span>Scroll to explore</span>
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default HeroSection;
