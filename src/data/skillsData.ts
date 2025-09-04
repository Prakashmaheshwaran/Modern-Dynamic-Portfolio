export interface Skill {
  name: string;
  level: number;
  category: 'programming' | 'ml' | 'web' | 'tools' | 'database';
  color: string;
  icon?: string;
  description?: string;
}

export const skillsData: Skill[] = [
  // Programming Languages
  {
    name: 'Python',
    level: 90,
    category: 'programming',
    color: '#3776ab',
    icon: 'python',
    description: 'Expert in Python for automation, ML, and backend development'
  },
  {
    name: 'JavaScript',
    level: 82,
    category: 'programming',
    color: '#f7df1e',
    icon: 'javascript',
    description: 'Proficient in modern JavaScript and TypeScript'
  },
  {
    name: 'Java',
    level: 78,
    category: 'programming',
    color: '#ed8b00',
    icon: 'java',
    description: 'Strong foundation in Java for enterprise applications'
  },
  {
    name: 'C++',
    level: 70,
    category: 'programming',
    color: '#00599c',
    icon: 'c++',
    description: 'Systems programming and algorithm optimization'
  },
  
  // Machine Learning & AI
  {
    name: 'TensorFlow',
    level: 85,
    category: 'ml',
    color: '#ff6f00',
    icon: 'tensorflow',
    description: 'Deep learning model development and deployment'
  },
  {
    name: 'PyTorch',
    level: 80,
    category: 'ml',
    color: '#ee4c2c',
    icon: 'pytorch',
    description: 'Research-focused deep learning framework'
  },
  {
    name: 'Scikit-learn',
    level: 88,
    category: 'ml',
    color: '#f7931e',
    icon: 'scikit-learn',
    description: 'Classical machine learning and data preprocessing'
  },
  {
    name: 'OpenCV',
    level: 75,
    category: 'ml',
    color: '#5c85d6',
    icon: 'opencv',
    description: 'Computer vision and image processing'
  },
  
  // Web Development
  {
    name: 'React',
    level: 85,
    category: 'web',
    color: '#61dafb',
    icon: 'react',
    description: 'Modern frontend development with hooks and context'
  },
  {
    name: 'Node.js',
    level: 80,
    category: 'web',
    color: '#339933',
    icon: 'nodejs',
    description: 'Backend development and API design'
  },
  {
    name: 'FastAPI',
    level: 83,
    category: 'web',
    color: '#009688',
    icon: 'fastapi',
    description: 'High-performance API development'
  },
  {
    name: 'GraphQL',
    level: 72,
    category: 'web',
    color: '#e10098',
    icon: 'graphql',
    description: 'Efficient API query language'
  },
  
  // Tools & Infrastructure
  {
    name: 'Docker',
    level: 78,
    category: 'tools',
    color: '#2496ed',
    icon: 'docker',
    description: 'Containerization and microservices'
  },
  {
    name: 'Kubernetes',
    level: 70,
    category: 'tools',
    color: '#326ce5',
    icon: 'kubernetes',
    description: 'Container orchestration and scaling'
  },
  {
    name: 'Git',
    level: 92,
    category: 'tools',
    color: '#f05032',
    icon: 'git',
    description: 'Version control and collaborative development'
  },
  {
    name: 'AWS',
    level: 75,
    category: 'tools',
    color: '#ff9900',
    icon: 'aws',
    description: 'Cloud infrastructure and services'
  },
  
  // Databases
  {
    name: 'PostgreSQL',
    level: 80,
    category: 'database',
    color: '#336791',
    icon: 'postgresql',
    description: 'Relational database design and optimization'
  },
  {
    name: 'MongoDB',
    level: 76,
    category: 'database',
    color: '#47a248',
    icon: 'mongodb',
    description: 'NoSQL database for scalable applications'
  },
  {
    name: 'Redis',
    level: 74,
    category: 'database',
    color: '#dc382d',
    icon: 'redis',
    description: 'In-memory caching and session storage'
  },
  {
    name: 'Elasticsearch',
    level: 72,
    category: 'database',
    color: '#005571',
    icon: 'elasticsearch',
    description: 'Search engine and analytics'
  }
];

export const getSkillsByCategory = (category: string) => {
  return skillsData.filter(skill => skill.category === category);
};

export const getTopSkills = (limit: number = 8) => {
  return skillsData
    .sort((a, b) => b.level - a.level)
    .slice(0, limit);
};

export const skillCategories = [
  { key: 'programming', label: 'Programming Languages', icon: 'code' },
  { key: 'ml', label: 'Machine Learning & AI', icon: 'brain' },
  { key: 'web', label: 'Web Development', icon: 'globe' },
  { key: 'tools', label: 'Tools & Infrastructure', icon: 'tools' },
  { key: 'database', label: 'Databases', icon: 'database' }
] as const;
