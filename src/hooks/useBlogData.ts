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

      // Process received data

      // Handle different webhook response formats
      let dataArray: DevToBlogPost[] = [];

      if (Array.isArray(rawData)) {
        // Direct array response (expected for Dev.to API)
        dataArray = rawData;
      } else if (rawData && typeof rawData === 'object') {
        // Check for common webhook response patterns
        if (rawData.data && Array.isArray(rawData.data)) {
          // Response wrapped in { data: [...] }
          dataArray = rawData.data;
        } else if (rawData.blogs && Array.isArray(rawData.blogs)) {
          // Response wrapped in { blogs: [...] }
          dataArray = rawData.blogs;
        } else if (rawData.posts && Array.isArray(rawData.posts)) {
          // Response wrapped in { posts: [...] }
          dataArray = rawData.posts;
        } else if (rawData.articles && Array.isArray(rawData.articles)) {
          // Response wrapped in { articles: [...] }
          dataArray = rawData.articles;
        } else if (rawData.items && Array.isArray(rawData.items)) {
          // Response wrapped in { items: [...] }
          dataArray = rawData.items;
        } else {
          // Single blog object - wrap it in an array
          dataArray = [rawData];
        }
      } else {
        console.error('Unexpected data format:', rawData);
        throw new Error('Invalid data format: expected an object or array');
      }

      // Validate that we have Dev.to blog structure
      // Note: public API doesn't return `published` boolean — all returned articles are published
      const validBlogs = dataArray.filter((blog: any) => {
        return blog &&
          typeof blog.id === 'number' &&
          typeof blog.title === 'string' &&
          typeof blog.description === 'string' &&
          typeof blog.url === 'string';
      }) as DevToBlogPost[];

      // Sort and filter the blogs to get the top 9
      const filteredAndSorted = sortAndFilterBlogs(validBlogs);

      // Process the blogs into our display format
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
