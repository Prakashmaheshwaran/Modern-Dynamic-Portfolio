import React from 'react';
import styled from 'styled-components';

import {
  SiDjango,
  SiFlask,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTensorflow,
  SiOpencv,
  SiAmazon,
  SiGooglecloud,
  SiOpenai,
  SiSelenium,
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
  SiTypescript,
  SiCplusplus,
  SiPytorch,
  SiScikitlearn,
  SiFastapi,
  SiGraphql,
  SiPostgresql,
  SiRedis,
  SiElasticsearch,
  SiNextdotjs,
  SiAnthropic,
  SiLangchain,
  SiHuggingface,
  SiStreamlit,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiMlflow,
  SiTailwindcss,
  SiVite,
  SiPrisma,
  SiGithubactions,
  SiNginx,
  SiJest,
  SiCypress,
  SiLinux,
  SiVercel,
  SiPostman,
  SiSupabase,
  SiApachekafka,
  SiNotion
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
  FaLaptop,
  FaServer,
  FaTools,
  FaPaintBrush,
  FaMobileAlt,
  FaCog,
  FaGlobe,
  FaHorse
} from 'react-icons/fa';

interface LogoIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const logoMap: Record<string, any> = {
  // Full Stack
  'django': SiDjango,
  'flask': SiFlask,
  'react': SiReact,
  'nodejs': SiNodedotjs,
  'express': SiExpress,
  'nextjs': SiNextdotjs,
  'fastapi': SiFastapi,
  'graphql': SiGraphql,
  'tailwindcss': SiTailwindcss,
  'vite': SiVite,
  'prisma': SiPrisma,

  // AI / ML
  'tensorflow': SiTensorflow,
  'pytorch': SiPytorch,
  'opencv': SiOpencv,
  'openai': SiOpenai,
  'anthropic': SiAnthropic,
  'huggingface': SiHuggingface,
  'langchain': SiLangchain,
  'scikit-learn': SiScikitlearn,
  'streamlit': SiStreamlit,
  'pandas': SiPandas,
  'numpy': SiNumpy,
  'jupyter': SiJupyter,
  'mlflow': SiMlflow,

  // Cloud & Data
  'aws': SiAmazon,
  'gcp': SiGooglecloud,
  'azure': FaServer,
  'supabase': SiSupabase,
  'pinecone': FaDatabase,
  'mongodb': SiMongodb,
  'postgresql': SiPostgresql,
  'redis': SiRedis,
  'elasticsearch': SiElasticsearch,
  'kafka': SiApachekafka,

  // Automation
  'selenium': SiSelenium,
  'playwright': FaGlobe,
  'n8n': FaCog,
  'zapier': SiZapier,
  'powerautomate': FaCog,

  // DevOps & Testing
  'git': SiGit,
  'gitlab': SiGitlab,
  'githubactions': SiGithubactions,
  'docker': SiDocker,
  'kubernetes': SiKubernetes,
  'terraform': SiHashicorp,
  'nginx': SiNginx,
  'jest': SiJest,
  'cypress': SiCypress,
  'linux': SiLinux,
  'vercel': SiVercel,
  'postman': SiPostman,

  // Creative & Productivity
  'aftereffects': SiAdobephotoshop,
  'figma': SiFigma,
  'blender': SiBlender,
  'notion': SiNotion,
  'pegasus': FaHorse,

  // Programming Languages
  'python': SiPython,
  'javascript': SiJavascript,
  'typescript': SiTypescript,
  'java': SiJavascript,
  'c++': SiCplusplus,

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
  'laptop': FaLaptop,
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
