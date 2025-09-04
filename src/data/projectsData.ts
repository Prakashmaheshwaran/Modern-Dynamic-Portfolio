export interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  category: 'automation' | 'ml' | 'web' | 'research';
  technologies: string[];
  image: string;
  github: string;
  demo: string;
  featured: boolean;
  achievements?: string[];
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Intelligent Automation Framework",
    description: "Machine learning-powered automation system that optimizes complex workflows and reduces manual intervention by 60%.",
    detailedDescription: "A comprehensive automation framework that leverages machine learning algorithms to intelligently optimize business processes. The system uses predictive analytics to anticipate workflow bottlenecks and automatically adjusts resource allocation. Built with a microservices architecture for scalability and deployed using Docker and Kubernetes for high availability.",
    category: "automation",
    technologies: ["Python", "TensorFlow", "Docker", "MongoDB", "Kubernetes", "Redis"],
    image: "/api/placeholder/400/300",
    github: "https://github.com/prakash-maheshwaran/automation-framework",
    demo: "https://automation-demo.example.com",
    featured: true,
    achievements: [
      "Reduced manual processing time by 60%",
      "Improved accuracy by 35% through ML optimization",
      "Successfully deployed across 3 enterprise clients",
      "Winner of University Innovation Challenge 2023"
    ]
  },
  {
    id: 2,
    title: "Neural Network Visualizer",
    description: "Interactive web application for visualizing neural network architectures and training processes in real-time.",
    detailedDescription: "An educational tool that makes neural networks more accessible by providing real-time visualization of network architectures, training processes, and decision boundaries. Features interactive layer editing, real-time training visualization, and support for multiple network types including CNNs, RNNs, and Transformers.",
    category: "ml",
    technologies: ["JavaScript", "D3.js", "Python", "Flask", "WebGL", "TensorFlow.js"],
    image: "/api/placeholder/400/300",
    github: "https://github.com/prakash-maheshwaran/neural-viz",
    demo: "https://neural-viz.example.com",
    featured: true,
    achievements: [
      "Used by 500+ students and researchers",
      "Featured in ML education conference",
      "Open-source with 1.2k GitHub stars",
      "Integrated into university curriculum"
    ]
  },
  {
    id: 3,
    title: "Research Publication Portal",
    description: "Full-stack web application for managing and sharing academic research publications with advanced search capabilities.",
    detailedDescription: "A comprehensive platform for academic researchers to manage, share, and discover research publications. Features advanced search with NLP-powered semantic matching, collaboration tools, citation management, and integration with major academic databases.",
    category: "web",
    technologies: ["React", "Node.js", "PostgreSQL", "Elasticsearch", "GraphQL", "Docker"],
    image: "/api/placeholder/400/300",
    github: "https://github.com/prakash-maheshwaran/research-portal",
    demo: "https://research-portal.example.com",
    featured: false,
    achievements: [
      "Manages 10,000+ research papers",
      "Serves 200+ active researchers",
      "99.9% uptime with automated scaling",
      "Featured in academic tech showcase"
    ]
  },
  {
    id: 4,
    title: "Smart Campus IoT System",
    description: "IoT-based system for monitoring and optimizing campus resources including energy usage, occupancy, and environmental factors.",
    detailedDescription: "A comprehensive IoT solution for smart campus management that monitors environmental conditions, energy usage, and space utilization. Uses machine learning to predict occupancy patterns and optimize resource allocation, resulting in significant energy savings and improved campus efficiency.",
    category: "research",
    technologies: ["Python", "IoT", "InfluxDB", "Grafana", "MQTT", "Apache Kafka"],
    image: "/api/placeholder/400/300",
    github: "https://github.com/prakash-maheshwaran/smart-campus",
    demo: "https://smart-campus.example.com",
    featured: false,
    achievements: [
      "25% reduction in energy consumption",
      "Real-time monitoring of 50+ sensors",
      "Predictive maintenance with 90% accuracy",
      "Deployed across SUNY Binghamton campus"
    ]
  },
  {
    id: 5,
    title: "AI-Powered Task Scheduler",
    description: "Machine learning algorithm that optimizes task scheduling and resource allocation for distributed systems.",
    detailedDescription: "An intelligent task scheduling system that uses reinforcement learning to optimize resource allocation in distributed computing environments. The system adapts to changing workloads and system conditions to maximize throughput while minimizing latency and resource consumption.",
    category: "automation",
    technologies: ["Python", "Scikit-learn", "Redis", "Celery", "Apache Airflow", "Prometheus"],
    image: "/api/placeholder/400/300",
    github: "https://github.com/prakash-maheshwaran/ai-scheduler",
    demo: "https://ai-scheduler.example.com",
    featured: false,
    achievements: [
      "40% improvement in task completion time",
      "Self-adapting to system load patterns",
      "Reduced resource waste by 30%",
      "Published research paper at IEEE conference"
    ]
  },
  {
    id: 6,
    title: "Real-time Data Pipeline",
    description: "High-performance data processing pipeline for real-time analytics and machine learning model inference.",
    detailedDescription: "A scalable data processing pipeline built for high-throughput real-time analytics. Processes millions of events per second using Apache Kafka and Apache Spark, with real-time ML model inference for fraud detection and recommendation systems.",
    category: "ml",
    technologies: ["Apache Kafka", "Python", "Apache Spark", "Kubernetes", "MLflow", "Apache Flink"],
    image: "/api/placeholder/400/300",
    github: "https://github.com/prakash-maheshwaran/data-pipeline",
    demo: "https://data-pipeline.example.com",
    featured: false,
    achievements: [
      "Processes 1M+ events per second",
      "Sub-millisecond latency for ML inference",
      "99.99% data processing accuracy",
      "Horizontal scaling with zero downtime"
    ]
  }
];

export const getProjectsByCategory = (category: string) => {
  if (category === 'all') return projectsData;
  return projectsData.filter(project => project.category === category);
};

export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured);
};

export const getProjectById = (id: number) => {
  return projectsData.find(project => project.id === id);
};
