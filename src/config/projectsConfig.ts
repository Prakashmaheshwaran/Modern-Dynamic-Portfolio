export interface GitHubProject {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  forks_count: number;
  open_issues_count: number;
  visibility: string;
  fork: boolean;
}

export interface ProcessedProject {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  github: string;
  demo: string;
  stars: number;
  language: string;
  lastUpdated: string;
  isForked: boolean;
}

export const PROJECTS_CONFIG = {
  WEBHOOK_URL: process.env.REACT_APP_PROJECT_WEBHOOK_URL || '',
  TIMEOUT: 15000, // 15 seconds
  MAX_PROJECTS: 9, // Top 9 projects
  FALLBACK_MESSAGE: 'Unable to load GitHub projects. Please check your configuration.',
  MIN_DESCRIPTION_LENGTH: 10, // Minimum description length to include project
  EXCLUDED_LANGUAGES: ['null'], // Languages to exclude
  PRIORITY_LANGUAGES: ['TypeScript', 'Python', 'JavaScript', 'C++'], // Languages to prioritize
};

// Function to process raw GitHub data into our format
export const processGitHubProject = (repo: GitHubProject): ProcessedProject => {
  return {
    id: repo.id,
    title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: repo.description || 'No description available',
    detailedDescription: repo.description || 'No detailed description available',
    technologies: [
      ...(repo.language ? [repo.language] : []),
      ...repo.topics.slice(0, 5) // Limit to 5 topics/technologies
    ],
    github: repo.html_url,
    demo: repo.homepage || repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language || 'Unknown',
    lastUpdated: repo.updated_at,
    isForked: repo.fork
  };
};

// Function to sort and filter projects
export const sortAndFilterProjects = (projects: GitHubProject[]): GitHubProject[] => {
  return projects
    .filter(repo => {
      // Filter out forked repos unless they have significant activity
      if (repo.fork && repo.stargazers_count === 0) return false;
      
      // Filter out repos without meaningful descriptions
      if (!repo.description || repo.description.length < PROJECTS_CONFIG.MIN_DESCRIPTION_LENGTH) return false;
      
      // Filter out archived or very old repos (more than 2 years without updates)
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
      if (new Date(repo.updated_at) < twoYearsAgo) return false;
      
      return true;
    })
    .sort((a, b) => {
      // Primary sort: starred repos first
      if (a.stargazers_count !== b.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      
      // Secondary sort: non-forked repos first
      if (a.fork !== b.fork) {
        return a.fork ? 1 : -1;
      }
      
      // Tertiary sort: priority languages first
      const aLanguagePriority = PROJECTS_CONFIG.PRIORITY_LANGUAGES.indexOf(a.language || '');
      const bLanguagePriority = PROJECTS_CONFIG.PRIORITY_LANGUAGES.indexOf(b.language || '');
      
      if (aLanguagePriority !== -1 && bLanguagePriority !== -1) {
        return aLanguagePriority - bLanguagePriority;
      }
      if (aLanguagePriority !== -1) return -1;
      if (bLanguagePriority !== -1) return 1;
      
      // Final sort: most recently updated
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    })
    .slice(0, PROJECTS_CONFIG.MAX_PROJECTS);
};
