export interface TechTool {
  id: string;
  name: string;
  icon: string;
  category: 'fullstack' | 'ai-ml' | 'automation' | 'devops' | 'cloud-data' | 'creative';
  color: string;
  description?: string;
}

export const techToolsData: TechTool[] = [
  // Full Stack
  { id: 'react', name: 'React', icon: 'react', category: 'fullstack', color: '#61dafb' },
  { id: 'nextjs', name: 'Next.js', icon: 'nextjs', category: 'fullstack', color: '#ffffff' },
  { id: 'nodejs', name: 'Node.js', icon: 'nodejs', category: 'fullstack', color: '#339933' },
  { id: 'fastapi', name: 'FastAPI', icon: 'fastapi', category: 'fullstack', color: '#009688' },
  { id: 'django', name: 'Django', icon: 'django', category: 'fullstack', color: '#092e20' },
  { id: 'flask', name: 'Flask', icon: 'flask', category: 'fullstack', color: '#ffffff' },
  { id: 'express', name: 'Express', icon: 'express', category: 'fullstack', color: '#ffffff' },
  { id: 'graphql', name: 'GraphQL', icon: 'graphql', category: 'fullstack', color: '#e10098' },
  { id: 'tailwindcss', name: 'Tailwind', icon: 'tailwindcss', category: 'fullstack', color: '#06b6d4' },
  { id: 'vite', name: 'Vite', icon: 'vite', category: 'fullstack', color: '#646cff' },
  { id: 'prisma', name: 'Prisma', icon: 'prisma', category: 'fullstack', color: '#2d3748' },

  // AI / ML
  { id: 'langchain', name: 'LangChain', icon: 'langchain', category: 'ai-ml', color: '#1c3c3c' },
  { id: 'openai', name: 'OpenAI', icon: 'openai', category: 'ai-ml', color: '#412991' },
  { id: 'anthropic', name: 'Claude AI', icon: 'anthropic', category: 'ai-ml', color: '#d4a574' },
  { id: 'huggingface', name: 'Hugging Face', icon: 'huggingface', category: 'ai-ml', color: '#ffbd45' },
  { id: 'tensorflow', name: 'TensorFlow', icon: 'tensorflow', category: 'ai-ml', color: '#ff6f00' },
  { id: 'pytorch', name: 'PyTorch', icon: 'pytorch', category: 'ai-ml', color: '#ee4c2c' },
  { id: 'opencv', name: 'OpenCV', icon: 'opencv', category: 'ai-ml', color: '#5c85d6' },
  { id: 'streamlit', name: 'Streamlit', icon: 'streamlit', category: 'ai-ml', color: '#ff4b4b' },
  { id: 'pandas', name: 'Pandas', icon: 'pandas', category: 'ai-ml', color: '#150458' },
  { id: 'numpy', name: 'NumPy', icon: 'numpy', category: 'ai-ml', color: '#4dabcf' },
  { id: 'jupyter', name: 'Jupyter', icon: 'jupyter', category: 'ai-ml', color: '#f37626' },
  { id: 'scikit-learn', name: 'Scikit-learn', icon: 'scikit-learn', category: 'ai-ml', color: '#f7931e' },
  { id: 'mlflow', name: 'MLflow', icon: 'mlflow', category: 'ai-ml', color: '#0194e2' },

  // Automation
  { id: 'playwright', name: 'Playwright', icon: 'playwright', category: 'automation', color: '#2ead33' },
  { id: 'selenium', name: 'Selenium', icon: 'selenium', category: 'automation', color: '#43b02a' },
  { id: 'n8n', name: 'n8n', icon: 'n8n', category: 'automation', color: '#ea4b71' },
  { id: 'zapier', name: 'Zapier', icon: 'zapier', category: 'automation', color: '#ff4a00' },
  { id: 'powerautomate', name: 'Power Automate', icon: 'powerautomate', category: 'automation', color: '#0078d4' },

  // DevOps & Testing
  { id: 'docker', name: 'Docker', icon: 'docker', category: 'devops', color: '#2496ed' },
  { id: 'kubernetes', name: 'Kubernetes', icon: 'kubernetes', category: 'devops', color: '#326ce5' },
  { id: 'git', name: 'Git', icon: 'git', category: 'devops', color: '#f05032' },
  { id: 'gitlab', name: 'GitLab', icon: 'gitlab', category: 'devops', color: '#fc6d26' },
  { id: 'githubactions', name: 'GitHub Actions', icon: 'githubactions', category: 'devops', color: '#2088ff' },
  { id: 'terraform', name: 'Terraform', icon: 'terraform', category: 'devops', color: '#7b42bc' },
  { id: 'nginx', name: 'Nginx', icon: 'nginx', category: 'devops', color: '#009639' },
  { id: 'jest', name: 'Jest', icon: 'jest', category: 'devops', color: '#c21325' },
  { id: 'cypress', name: 'Cypress', icon: 'cypress', category: 'devops', color: '#17202c' },
  { id: 'linux', name: 'Linux', icon: 'linux', category: 'devops', color: '#fcc624' },
  { id: 'vercel', name: 'Vercel', icon: 'vercel', category: 'devops', color: '#ffffff' },
  { id: 'postman', name: 'Postman', icon: 'postman', category: 'devops', color: '#ff6c37' },

  // Cloud & Data
  { id: 'aws', name: 'AWS', icon: 'aws', category: 'cloud-data', color: '#ff9900' },
  { id: 'gcp', name: 'Google Cloud', icon: 'gcp', category: 'cloud-data', color: '#4285f4' },
  { id: 'azure', name: 'Azure', icon: 'azure', category: 'cloud-data', color: '#0089d6' },
  { id: 'supabase', name: 'Supabase', icon: 'supabase', category: 'cloud-data', color: '#3ecf8e' },
  { id: 'pinecone', name: 'Pinecone', icon: 'pinecone', category: 'cloud-data', color: '#000000' },
  { id: 'mongodb', name: 'MongoDB', icon: 'mongodb', category: 'cloud-data', color: '#47a248' },
  { id: 'postgresql', name: 'PostgreSQL', icon: 'postgresql', category: 'cloud-data', color: '#336791' },
  { id: 'redis', name: 'Redis', icon: 'redis', category: 'cloud-data', color: '#dc382d' },
  { id: 'kafka', name: 'Kafka', icon: 'kafka', category: 'cloud-data', color: '#231f20' },

  // Creative
  { id: 'figma', name: 'Figma', icon: 'figma', category: 'creative', color: '#f24e1e' },
  { id: 'aftereffects', name: 'After Effects', icon: 'aftereffects', category: 'creative', color: '#9999ff' },
  { id: 'blender', name: 'Blender', icon: 'blender', category: 'creative', color: '#f5792a' },
  { id: 'notion', name: 'Notion', icon: 'notion', category: 'creative', color: '#ffffff' }
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
  { key: 'fullstack', label: 'Full Stack', icon: 'globe', color: '#61dafb' },
  { key: 'ai-ml', label: 'AI/ML', icon: 'brain', color: '#ff6f00' },
  { key: 'automation', label: 'Automation', icon: 'cog', color: '#43b02a' },
  { key: 'devops', label: 'DevOps & Testing', icon: 'tools', color: '#2496ed' },
  { key: 'cloud-data', label: 'Cloud & Data', icon: 'server', color: '#4285f4' },
  { key: 'creative', label: 'Design & Productivity', icon: 'paint-brush', color: '#f24e1e' }
] as const;
