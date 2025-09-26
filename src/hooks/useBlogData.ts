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
      
      console.log('Extracted data array:', dataArray);

      // Validate that we have Dev.to blog structure
      const validBlogs = dataArray.filter((blog: any) => {
        const isValid = blog && 
          typeof blog.id === 'number' && 
          typeof blog.title === 'string' && 
          typeof blog.description === 'string' && 
          typeof blog.url === 'string' &&
          typeof blog.published === 'boolean' &&
          typeof blog.type_of === 'string';
        
        if (!isValid) {
          console.warn('Invalid Dev.to blog post structure:', blog);
        }
        
        return isValid;
      }) as DevToBlogPost[];

      console.log('Valid Dev.to blogs found:', validBlogs.length);

      // Sort and filter the blogs to get the top 9
      const filteredAndSorted = sortAndFilterBlogs(validBlogs);
      console.log('Filtered and sorted blogs:', filteredAndSorted.length);

      // Process the blogs into our display format
      const processedBlogs = filteredAndSorted.map(processDevToBlogPost);
      console.log('Processed blogs:', processedBlogs);

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
