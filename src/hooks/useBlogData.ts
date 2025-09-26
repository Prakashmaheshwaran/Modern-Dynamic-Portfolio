import { useState, useEffect } from 'react';
import { BlogPost, BLOG_CONFIG } from '../config/blogConfig';

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

      // Check if webhook URL is configured
      if (!BLOG_CONFIG.WEBHOOK_URL) {
        throw new Error('Blog webhook URL is not configured. Please set REACT_APP_BLOG_WEBHOOK_URL in your environment variables.');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), BLOG_CONFIG.TIMEOUT);

      const response = await fetch(BLOG_CONFIG.WEBHOOK_URL, {
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
      console.log('Received webhook data:', rawData);
      console.log('Data type:', typeof rawData);
      console.log('Is array:', Array.isArray(rawData));
      
      // Handle different webhook response formats
      let dataArray: any[] = [];
      
      if (Array.isArray(rawData)) {
        // Direct array response
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
      
      console.log('Extracted data array:', dataArray);

      // Filter and limit blogs
      const validBlogs = dataArray
        .filter((blog: any) => {
          const isValid = blog && 
            typeof blog.title === 'string' && 
            typeof blog.description === 'string' && 
            typeof blog.url === 'string' && 
            typeof blog.cover_image === 'string';
          
          if (!isValid) {
            console.warn('Invalid blog post structure:', blog);
          }
          
          return isValid;
        })
        .slice(0, BLOG_CONFIG.MAX_BLOGS);

      console.log('Valid blogs found:', validBlogs.length);
      console.log('Processed blogs:', validBlogs);
      setBlogs(validBlogs);
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
