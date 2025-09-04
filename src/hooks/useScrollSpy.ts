import { useState, useEffect } from 'react';
import { throttle } from '../utils/scrollUtils';

interface UseScrollSpyOptions {
  sections: string[];
  offset?: number;
  throttleMs?: number;
}

export const useScrollSpy = ({ 
  sections, 
  offset = 100, 
  throttleMs = 100 
}: UseScrollSpyOptions) => {
  const [currentSection, setCurrentSection] = useState<string>(sections[0] || 'hero');

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY + offset;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(sections[i]);
          break;
        }
      }
    }, throttleMs);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, offset, throttleMs]);

  return currentSection;
};
