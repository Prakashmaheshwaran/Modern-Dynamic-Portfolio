import { useState, useEffect } from 'react';
import {
  BlogPost,
  DevToBlogPost,
  BLOG_CONFIG,
  processDevToBlogPost,
  sortAndFilterBlogs
} from '../config/blogConfig';

interface UseBlogDataReturn {
  blogs: BlogPost[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useBlogData = (): UseBlogDataReturn => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), BLOG_CONFIG.TIMEOUT);

      const response = await fetch(BLOG_CONFIG.API_URL, {
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

      // Dev.to API returns a direct JSON array
      if (!Array.isArray(rawData)) {
        console.error('Unexpected data format from Dev.to API:', typeof rawData);
        throw new Error('Invalid data format: expected an array from Dev.to API');
      }

      // Validate that we have Dev.to blog structure
      // Note: Dev.to public API only returns published articles, so 'published' field is absent
      const validBlogs = rawData.filter((blog: any) => {
        const isValid = blog &&
          typeof blog.id === 'number' &&
          typeof blog.title === 'string' &&
          typeof blog.description === 'string' &&
          typeof blog.url === 'string' &&
          typeof blog.type_of === 'string';

        if (!isValid) {
          console.warn('Invalid Dev.to blog post structure:', blog);
        }

        return isValid;
      }) as DevToBlogPost[];

      const filteredAndSorted = sortAndFilterBlogs(validBlogs);
      const processedBlogs = filteredAndSorted.map(processDevToBlogPost);

      setBlogs(processedBlogs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch blogs';
      setError(errorMessage);
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    loading,
    error,
    refetch: fetchBlogs,
  };
};
