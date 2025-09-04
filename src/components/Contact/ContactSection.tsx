import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const ContactContainer = styled.section`
  padding: var(--section-padding);
  background: var(--primary-bg);
  border-top: 1px solid var(--border-color);
`;

const ContactContent = styled(motion.div)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const ContactTitle = styled(motion.h2)`
  font-family: var(--font-secondary);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--accent-green), var(--accent-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ContactSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const EmailSection = styled(motion.div)`
  margin-bottom: 4rem;
`;

const EmailLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  color: var(--accent-green);
  text-decoration: none;
  padding: 1.5rem 2rem;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-medium);

  &:hover {
    background: var(--accent-green);
    color: var(--primary-bg);
    transform: translateY(-3px);
    box-shadow: var(--shadow-glow);
  }

  i {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 1rem 1.5rem;
    
    i {
      font-size: 1.3rem;
    }
  }
`;

const SocialSection = styled(motion.div)`
  margin-bottom: 3rem;
`;

const SocialTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
  font-weight: 600;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const SocialLink = styled(motion.a)`
  width: 70px;
  height: 70px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 1.8rem;
  transition: all var(--transition-medium);
  position: relative;

  &:hover {
    color: var(--primary-bg);
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }

  &.linkedin:hover {
    background: #0077b5;
    border-color: #0077b5;
  }

  &.github:hover {
    background: #333;
    border-color: #333;
  }

  &.scholar:hover {
    background: #4285f4;
    border-color: #4285f4;
  }

  &.email:hover {
    background: var(--accent-green);
    border-color: var(--accent-green);
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
`;

const LocationSection = styled(motion.div)`
  padding: 2rem;
  background: var(--card-bg);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
`;

const LocationTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--accent-green);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  i {
    font-size: 1.1rem;
  }
`;

const LocationText = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin: 0;
`;

const ContactSection: React.FC = () => {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
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
    <ContactContainer ref={sectionRef} id="contact">
      <div className="container">
        <ContactContent
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          <ContactTitle variants={itemVariants}>
            Let's Connect
          </ContactTitle>
          
          <ContactSubtitle variants={itemVariants}>
            Ready to collaborate on innovative projects or discuss exciting opportunities? 
            I'm always open to connecting with fellow developers, researchers, and companies looking for H-1B sponsorship candidates.
          </ContactSubtitle>

          <EmailSection variants={itemVariants}>
            <EmailLink
              href="mailto:prakash.maheshwaran@binghamton.edu"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <i className="fas fa-envelope" />
              prakash.maheshwaran@binghamton.edu
            </EmailLink>
          </EmailSection>

          <SocialSection variants={itemVariants}>
            <SocialTitle>Find me on</SocialTitle>
            <SocialLinks>
              <SocialLink
                href="https://linkedin.com/in/prakash-maheshwaran"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-linkedin-in" />
              </SocialLink>
              
              <SocialLink
                href="https://github.com/prakash-maheshwaran"
                target="_blank"
                rel="noopener noreferrer"
                className="github"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-github" />
              </SocialLink>
              
              <SocialLink
                href="https://scholar.google.com/citations?user=example"
                target="_blank"
                rel="noopener noreferrer"
                className="scholar"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-graduation-cap" />
              </SocialLink>
              
              <SocialLink
                href="mailto:prakash.maheshwaran@binghamton.edu"
                className="email"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-envelope" />
              </SocialLink>
            </SocialLinks>
          </SocialSection>

          <LocationSection variants={itemVariants}>
            <LocationTitle>
              <i className="fas fa-map-marker-alt" />
              Current Location
            </LocationTitle>
            <LocationText>
              Binghamton, NY • SUNY Binghamton Campus
            </LocationText>
          </LocationSection>
        </ContactContent>
      </div>
    </ContactContainer>
  );
};

export default ContactSection;
