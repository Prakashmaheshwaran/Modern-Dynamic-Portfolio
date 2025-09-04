export interface TechTool {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'design' | 'mobile' | 'ai-ml' | 'automation' | 'other';
  color: string;
  description?: string;
}

export const techToolsData: TechTool[] = [
  // Full Stack
  {
    id: 'django',
    name: 'Django',
    icon: 'fas fa-pepper-hot',
    category: 'frontend',
    color: '#092e20',
    description: 'High-level Python web framework'
  },
  {
    id: 'flask',
    name: 'Flask',
    icon: 'fas fa-flask',
    category: 'frontend',
    color: '#000000',
    description: 'Lightweight Python web framework'
  },
  {
    id: 'react',
    name: 'React',
    icon: 'fab fa-react',
    category: 'frontend',
    color: '#61dafb',
    description: 'Frontend library for building user interfaces'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: 'fab fa-node-js',
    category: 'frontend',
    color: '#339933',
    description: 'JavaScript runtime for server-side development'
  },
  {
    id: 'express',
    name: 'Express',
    icon: 'fas fa-server',
    category: 'frontend',
    color: '#000000',
    description: 'Web framework for Node.js'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: 'fas fa-leaf',
    category: 'frontend',
    color: '#47a248',
    description: 'NoSQL document database'
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    icon: 'fab fa-wordpress',
    category: 'frontend',
    color: '#21759b',
    description: 'Content management system'
  },

  // AI / ML
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    icon: 'fas fa-brain',
    category: 'ai-ml',
    color: '#ff6f00',
    description: 'Open source machine learning platform'
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    icon: 'fas fa-eye',
    category: 'ai-ml',
    color: '#5c85d6',
    description: 'Computer vision library'
  },
  {
    id: 'aws',
    name: 'AWS',
    icon: 'fab fa-aws',
    category: 'ai-ml',
    color: '#ff9900',
    description: 'Amazon Web Services cloud platform'
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    icon: 'fab fa-google',
    category: 'ai-ml',
    color: '#4285f4',
    description: 'Google Cloud Platform'
  },
  {
    id: 'powerbi',
    name: 'Power BI',
    icon: 'fas fa-chart-bar',
    category: 'ai-ml',
    color: '#f2c811',
    description: 'Business analytics service'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: 'fas fa-robot',
    category: 'ai-ml',
    color: '#412991',
    description: 'AI research and deployment company'
  },

  // Automation
  {
    id: 'selenium',
    name: 'Selenium',
    icon: 'fas fa-check-circle',
    category: 'automation',
    color: '#43b02a',
    description: 'Web browser automation'
  },
  {
    id: 'uipath',
    name: 'UiPath',
    icon: 'fas fa-robot',
    category: 'automation',
    color: '#d83b01',
    description: 'Robotic process automation platform'
  },
  {
    id: 'powerautomate',
    name: 'Power Automate',
    icon: 'fas fa-bolt',
    category: 'automation',
    color: '#0078d4',
    description: 'Microsoft workflow automation'
  },
  {
    id: 'api',
    name: 'API',
    icon: 'fas fa-plug',
    category: 'automation',
    color: '#6c757d',
    description: 'Application Programming Interface'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    icon: 'fas fa-bolt',
    category: 'automation',
    color: '#ff4a00',
    description: 'Workflow automation platform'
  },

  // DevOps
  {
    id: 'git',
    name: 'Git',
    icon: 'fab fa-git-alt',
    category: 'devops',
    color: '#f05032',
    description: 'Distributed version control system'
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    icon: 'fab fa-gitlab',
    category: 'devops',
    color: '#fc6d26',
    description: 'DevOps platform'
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: 'fab fa-docker',
    category: 'devops',
    color: '#2496ed',
    description: 'Containerization platform'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    icon: 'fas fa-dharmachakra',
    category: 'devops',
    color: '#326ce5',
    description: 'Container orchestration system'
  },
  {
    id: 'terraform',
    name: 'Terraform',
    icon: 'fas fa-mountain',
    category: 'devops',
    color: '#7b42bc',
    description: 'Infrastructure as code tool'
  },

  // Other
  {
    id: 'aftereffects',
    name: 'After Effects',
    icon: 'fab fa-adobe',
    category: 'other',
    color: '#9999ff',
    description: 'Motion graphics and visual effects'
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: 'fas fa-paint-brush',
    category: 'other',
    color: '#f24e1e',
    description: 'Collaborative interface design tool'
  },
  {
    id: 'blender',
    name: 'Blender',
    icon: 'fas fa-cube',
    category: 'other',
    color: '#f5792a',
    description: '3D creation suite'
  },
  {
    id: 'pegasus',
    name: 'Pegasus',
    icon: 'fas fa-horse',
    category: 'other',
    color: '#8b5cf6',
    description: 'Flying horse logo'
  }
];

export const getTechToolsByCategory = (category: string) => {
  return techToolsData.filter(tool => tool.category === category);
};

export const getAllTechTools = () => {
  return techToolsData;
};

export const getRandomTechTools = (count: number = 12) => {
  const shuffled = [...techToolsData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const techToolCategories = [
  { key: 'frontend', label: 'Frontend', icon: 'fas fa-desktop', color: '#61dafb' },
  { key: 'backend', label: 'Backend', icon: 'fas fa-server', color: '#339933' },
  { key: 'database', label: 'Database', icon: 'fas fa-database', color: '#336791' },
  { key: 'devops', label: 'DevOps', icon: 'fas fa-tools', color: '#2496ed' },
  { key: 'design', label: 'Design', icon: 'fas fa-paint-brush', color: '#f24e1e' },
  { key: 'mobile', label: 'Mobile', icon: 'fas fa-mobile-alt', color: '#02569b' },
  { key: 'ai-ml', label: 'AI/ML', icon: 'fas fa-brain', color: '#ff6f00' },
  { key: 'other', label: 'Other', icon: 'fas fa-cog', color: '#007acc' }
] as const;
