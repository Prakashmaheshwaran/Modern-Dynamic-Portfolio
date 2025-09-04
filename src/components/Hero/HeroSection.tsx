import React from 'react';
import styled from 'styled-components';
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
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
`;

const HeroGreeting = styled.span`
  display: block;
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 300;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const HeroName = styled.h1`
  font-family: var(--font-secondary);
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 300;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.1;
  letter-spacing: 0.02em;
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: var(--text-secondary);
  font-weight: 300;
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
`;

const HeroDescription = styled.p`
  font-size: 1.1rem;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.7;
  font-weight: 300;
`;

const HeroCTA = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 15px 30px;
  border: none;
  border-radius: 0;
  font-size: 1rem;
  font-weight: 300;
  cursor: pointer;
  text-decoration: none;
  min-width: 180px;
  font-family: inherit;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  
  background: ${props => props.variant === 'primary' 
    ? 'var(--text-primary)'
    : 'transparent'
  };
  
  color: ${props => props.variant === 'primary' 
    ? 'var(--primary-bg)'
    : 'var(--text-primary)'
  };
  
  border: ${props => props.variant === 'secondary' 
    ? '1px solid var(--text-primary)'
    : 'none'
  };

  &:hover {
    background: ${props => props.variant === 'secondary'
      ? 'var(--text-primary)'
      : 'var(--text-secondary)'
    };
    
    color: ${props => props.variant === 'secondary'
      ? 'var(--primary-bg)'
      : 'var(--primary-bg)'
    };
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
    padding: 12px 25px;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: var(--text-muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const ScrollArrow = styled.div`
  width: 1px;
  height: 30px;
  background: var(--accent-green);
  margin: 0 auto 10px;
`;



const HeroSection: React.FC<HeroSectionProps> = ({ onSectionChange }) => {
  const handleCTAClick = (section: string) => {
    scrollToSection(section);
    onSectionChange(section);
  };

  return (
    <HeroContainer id="hero">
      <HeroContent>
        <HeroGreeting>
          Hi, I'm
        </HeroGreeting>
        
        <HeroName>
          Prakash Maheshwaran
        </HeroName>
        
        <HeroSubtitle>
          AI Researcher & Developer
        </HeroSubtitle>
        
        <HeroDescription>
          Passionate about automation research, machine learning, and building innovative solutions. 
          Currently seeking H-1B sponsorship opportunities to contribute to cutting-edge tech companies.
        </HeroDescription>

        <HeroCTA>
          <CTAButton
            variant="primary"
            onClick={() => handleCTAClick('projects')}
          >
            View Projects
          </CTAButton>
          
          <CTAButton
            variant="secondary"
            onClick={() => handleCTAClick('contact')}
          >
            Get In Touch
          </CTAButton>
        </HeroCTA>
      </HeroContent>

      <ScrollIndicator>
        <ScrollArrow />
        <span>Scroll to explore</span>
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default HeroSection;
