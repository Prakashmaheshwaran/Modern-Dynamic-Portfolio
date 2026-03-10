export interface Skill {
  name: string;
  level: number;
  category: 'programming' | 'ai-core' | 'web' | 'infra' | 'data';
  color: string;
  icon?: string;
  description?: string;
}

export const skillsData: Skill[] = [
  // Programming Languages
  {
    name: 'Python',
    level: 95,
    category: 'programming',
    color: '#3776ab',
    icon: 'python',
    description: 'Primary language for AI systems, automation pipelines, and backend services'
  },
  {
    name: 'TypeScript',
    level: 88,
    category: 'programming',
    color: '#3178c6',
    icon: 'typescript',
    description: 'Type-safe development for full-stack and AI-integrated applications'
  },
  {
    name: 'JavaScript',
    level: 85,
    category: 'programming',
    color: '#f7df1e',
    icon: 'javascript',
    description: 'Frontend development and Node.js services'
  },
  {
    name: 'Java',
    level: 78,
    category: 'programming',
    color: '#ed8b00',
    icon: 'java',
    description: 'Enterprise-grade application development'
  },
  {
    name: 'C++',
    level: 70,
    category: 'programming',
    color: '#00599c',
    icon: 'c++',
    description: 'Systems programming and performance-critical modules'
  },

  // AI & LLM Architecture
  {
    name: 'LangChain',
    level: 92,
    category: 'ai-core',
    color: '#1c3c3c',
    icon: 'langchain',
    description: 'LLM orchestration, chains, agents, and RAG pipelines'
  },
  {
    name: 'OpenAI / GPT',
    level: 90,
    category: 'ai-core',
    color: '#412991',
    icon: 'openai',
    description: 'GPT-4, embeddings, fine-tuning, and function calling'
  },
  {
    name: 'PyTorch',
    level: 85,
    category: 'ai-core',
    color: '#ee4c2c',
    icon: 'pytorch',
    description: 'Deep learning model development and research'
  },
  {
    name: 'Hugging Face',
    level: 85,
    category: 'ai-core',
    color: '#ffbd45',
    icon: 'huggingface',
    description: 'Transformers, model hub, and fine-tuning pipelines'
  },
  {
    name: 'TensorFlow',
    level: 82,
    category: 'ai-core',
    color: '#ff6f00',
    icon: 'tensorflow',
    description: 'Production ML model development and deployment'
  },

  // Web & API Development
  {
    name: 'React',
    level: 88,
    category: 'web',
    color: '#61dafb',
    icon: 'react',
    description: 'Modern frontend with hooks, context, and SSR'
  },
  {
    name: 'Next.js',
    level: 82,
    category: 'web',
    color: '#ffffff',
    icon: 'nextjs',
    description: 'Full-stack React framework with SSR and API routes'
  },
  {
    name: 'FastAPI',
    level: 88,
    category: 'web',
    color: '#009688',
    icon: 'fastapi',
    description: 'High-performance AI-serving API development'
  },
  {
    name: 'Node.js',
    level: 82,
    category: 'web',
    color: '#339933',
    icon: 'nodejs',
    description: 'Backend services and real-time applications'
  },
  {
    name: 'GraphQL',
    level: 75,
    category: 'web',
    color: '#e10098',
    icon: 'graphql',
    description: 'Efficient API design and data fetching'
  },

  // Infrastructure & Cloud
  {
    name: 'Docker',
    level: 85,
    category: 'infra',
    color: '#2496ed',
    icon: 'docker',
    description: 'Containerized AI/ML pipelines and microservices'
  },
  {
    name: 'Kubernetes',
    level: 78,
    category: 'infra',
    color: '#326ce5',
    icon: 'kubernetes',
    description: 'Orchestrating scalable AI service deployments'
  },
  {
    name: 'AWS',
    level: 82,
    category: 'infra',
    color: '#ff9900',
    icon: 'aws',
    description: 'Cloud infrastructure, SageMaker, Lambda, and S3'
  },
  {
    name: 'Git',
    level: 92,
    category: 'infra',
    color: '#f05032',
    icon: 'git',
    description: 'Version control and CI/CD workflows'
  },
  {
    name: 'Terraform',
    level: 72,
    category: 'infra',
    color: '#7b42bc',
    icon: 'terraform',
    description: 'Infrastructure as code for cloud provisioning'
  },

  // Data & Databases
  {
    name: 'PostgreSQL',
    level: 82,
    category: 'data',
    color: '#336791',
    icon: 'postgresql',
    description: 'Relational data, pgvector for AI embeddings'
  },
  {
    name: 'Pinecone',
    level: 80,
    category: 'data',
    color: '#000000',
    icon: 'pinecone',
    description: 'Vector database for semantic search and RAG'
  },
  {
    name: 'MongoDB',
    level: 78,
    category: 'data',
    color: '#47a248',
    icon: 'mongodb',
    description: 'Document store for flexible AI data pipelines'
  },
  {
    name: 'Redis',
    level: 76,
    category: 'data',
    color: '#dc382d',
    icon: 'redis',
    description: 'Caching, session management, and real-time data'
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
  { key: 'programming', label: 'Languages', icon: 'code' },
  { key: 'ai-core', label: 'AI & LLM Architecture', icon: 'brain' },
  { key: 'web', label: 'Web & API', icon: 'globe' },
  { key: 'infra', label: 'Infrastructure & Cloud', icon: 'tools' },
  { key: 'data', label: 'Data & Databases', icon: 'database' }
] as const;
