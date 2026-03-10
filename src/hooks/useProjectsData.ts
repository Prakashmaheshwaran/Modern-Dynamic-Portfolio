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

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), PROJECTS_CONFIG.TIMEOUT);

      const response = await fetch(PROJECTS_CONFIG.API_URL, {
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

      // GitHub API returns a direct JSON array
      if (!Array.isArray(rawData)) {
        console.error('Unexpected data format from GitHub API:', typeof rawData);
        throw new Error('Invalid data format: expected an array from GitHub API');
      }

      // Validate that we have GitHub project structure
      const validProjects = rawData.filter((project: any) => {
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

      const filteredAndSorted = sortAndFilterProjects(validProjects);
      const processedProjects = filteredAndSorted.map(processGitHubProject);

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
