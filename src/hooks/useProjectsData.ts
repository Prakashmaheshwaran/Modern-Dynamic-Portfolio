import { useState, useEffect } from 'react';
import { 
  GitHubProject, 
  ProcessedProject, 
  PROJECTS_CONFIG, 
  processGitHubProject, 
  sortAndFilterProjects 
} from '../config/projectsConfig';

interface UseProjectsDataReturn {
  projects: ProcessedProject[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProjectsData = (): UseProjectsDataReturn => {
  const [projects, setProjects] = useState<ProcessedProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if webhook URL is configured
      if (!PROJECTS_CONFIG.WEBHOOK_URL) {
        throw new Error('Projects webhook URL is not configured. Please set REACT_APP_PROJECT_WEBHOOK_URL in your environment variables.');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), PROJECTS_CONFIG.TIMEOUT);

      const response = await fetch(PROJECTS_CONFIG.WEBHOOK_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawData = await response.json();
      
      // Debug: Log the received data structure
      console.log('Received GitHub projects data:', rawData);
      console.log('Data type:', typeof rawData);
      console.log('Is array:', Array.isArray(rawData));
      
      // Handle different webhook response formats
      let dataArray: GitHubProject[] = [];
      
      if (Array.isArray(rawData)) {
        // Direct array response (expected format for GitHub API)
        dataArray = rawData;
      } else if (rawData && typeof rawData === 'object') {
        // Check for common webhook response patterns
        if (rawData.data && Array.isArray(rawData.data)) {
          // Response wrapped in { data: [...] }
          dataArray = rawData.data;
        } else if (rawData.repositories && Array.isArray(rawData.repositories)) {
          // Response wrapped in { repositories: [...] }
          dataArray = rawData.repositories;
        } else if (rawData.projects && Array.isArray(rawData.projects)) {
          // Response wrapped in { projects: [...] }
          dataArray = rawData.projects;
        } else if (rawData.items && Array.isArray(rawData.items)) {
          // Response wrapped in { items: [...] }
          dataArray = rawData.items;
        } else {
          // Single project object - wrap it in an array
          dataArray = [rawData];
        }
      } else {
        console.error('Unexpected data format:', rawData);
        throw new Error('Invalid data format: expected an object or array');
      }
      
      console.log('Extracted data array:', dataArray);

      // Validate that we have GitHub project structure
      const validProjects = dataArray.filter((project: any) => {
        const isValid = project && 
          typeof project.id === 'number' && 
          typeof project.name === 'string' && 
          typeof project.html_url === 'string' &&
          typeof project.full_name === 'string';
        
        if (!isValid) {
          console.warn('Invalid GitHub project structure:', project);
        }
        
        return isValid;
      }) as GitHubProject[];

      console.log('Valid GitHub projects found:', validProjects.length);

      // Sort and filter the projects to get the top 9
      const filteredAndSorted = sortAndFilterProjects(validProjects);
      console.log('Filtered and sorted projects:', filteredAndSorted.length);

      // Process the projects into our format
      const processedProjects = filteredAndSorted.map(processGitHubProject);
      console.log('Processed projects:', processedProjects);

      setProjects(processedProjects);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : PROJECTS_CONFIG.FALLBACK_MESSAGE;
      setError(errorMessage);
      console.error('Error fetching GitHub projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  };
};
