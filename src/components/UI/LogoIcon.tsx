import React from 'react';
import styled from 'styled-components';

// React Icons imports
import { 
  SiDjango, 
  SiFlask, 
  SiReact, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiWordpress,
  SiTensorflow,
  SiOpencv,
  SiAmazon,
  SiGooglecloud,
  SiOpenai,
  SiSelenium,
  SiUipath,
  SiZapier,
  SiGit,
  SiGitlab,
  SiDocker,
  SiKubernetes,
  SiHashicorp,
  SiAdobephotoshop,
  SiFigma,
  SiBlender,
  SiPython,
  SiJavascript,
  SiCplusplus,
  SiPytorch,
  SiScikitlearn,
  SiFastapi,
  SiGraphql,
  SiPostgresql,
  SiRedis,
  SiElasticsearch
} from 'react-icons/si';

import { 
  FaCode, 
  FaBrain, 
  FaChartLine, 
  FaEye, 
  FaRocket, 
  FaProjectDiagram, 
  FaDatabase, 
  FaMemory, 
  FaSearch,
  FaDesktop,
  FaServer,
  FaTools,
  FaPaintBrush,
  FaMobileAlt,
  FaCog,
  FaGlobe,
  FaHorse
} from 'react-icons/fa';
import { IconType, IconBaseProps } from 'react-icons';

// Logo mapping interface
interface LogoIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

// Logo mapping object
const logoMap: Record<string, any> = {
  // Tech Tools
  'django': SiDjango,
  'flask': SiFlask,
  'react': SiReact,
  'nodejs': SiNodedotjs,
  'express': SiExpress,
  'mongodb': SiMongodb,
  'wordpress': SiWordpress,
  'tensorflow': SiTensorflow,
  'opencv': SiOpencv,
  'aws': SiAmazon,
  'gcp': SiGooglecloud,
  'openai': SiOpenai,
  'selenium': SiSelenium,
  'uipath': SiUipath,
  'powerautomate': FaCog,
  'zapier': SiZapier,
  'git': SiGit,
  'gitlab': SiGitlab,
  'docker': SiDocker,
  'kubernetes': SiKubernetes,
  'terraform': SiHashicorp,
  'aftereffects': SiAdobephotoshop,
  'figma': SiFigma,
  'blender': SiBlender,
  'pegasus': FaHorse,
  
  // Skills
  'python': SiPython,
  'javascript': SiJavascript,
  'java': SiJavascript,
  'c++': SiCplusplus,
  'pytorch': SiPytorch,
  'scikit-learn': SiScikitlearn,
  'fastapi': SiFastapi,
  'graphql': SiGraphql,
  'postgresql': SiPostgresql,
  'redis': SiRedis,
  'elasticsearch': SiElasticsearch,
  
  // Generic icons
  'code': FaCode,
  'brain': FaBrain,
  'chart-line': FaChartLine,
  'eye': FaEye,
  'rocket': FaRocket,
  'project-diagram': FaProjectDiagram,
  'database': FaDatabase,
  'memory': FaMemory,
  'search': FaSearch,
  'desktop': FaDesktop,
  'server': FaServer,
  'tools': FaTools,
  'paint-brush': FaPaintBrush,
  'mobile-alt': FaMobileAlt,
  'cog': FaCog,
  'globe': FaGlobe
};

const StyledIcon = styled.div<{ color?: string; size?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || 'inherit'};
  font-size: ${props => props.size || 24}px;
  transition: all 0.3s ease;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const LogoIcon: React.FC<LogoIconProps> = ({ 
  name, 
  size = 24, 
  color, 
  className 
}) => {
  const IconComponent = logoMap[name.toLowerCase()];
  
  if (!IconComponent) {
    console.warn(`Logo icon not found for: ${name}`);
    return (
      <StyledIcon color={color} size={size} className={className}>
        {React.createElement(FaCode as any)}
      </StyledIcon>
    );
  }
  
  return (
    <StyledIcon color={color} size={size} className={className}>
      {React.createElement(IconComponent as any)}
    </StyledIcon>
  );
};

export default LogoIcon;
