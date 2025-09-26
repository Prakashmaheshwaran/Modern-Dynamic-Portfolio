// Blog configuration
export const BLOG_CONFIG = {
  // Webhook URL for fetching blog data
  WEBHOOK_URL: process.env.REACT_APP_BLOG_WEBHOOK_URL,
  
  // Maximum number of blogs to display
  MAX_BLOGS: 9,
  
  // API timeout in milliseconds
  TIMEOUT: 15000, // Increased timeout for Dev.to API
  
  // Minimum metrics for blog quality filtering
  MIN_READING_TIME: 1, // Minimum reading time in minutes
  PRIORITY_TAGS: ['javascript', 'typescript', 'python', 'react', 'node', 'automation', 'ai', 'ml'], // Priority tags for sorting
};

// Dev.to API response structure
export interface DevToBlogPost {
  type_of: string;
  id: number;
  title: string;
  description: string;
  published: boolean;
  published_at: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  page_views_count: number;
  published_timestamp: string;
  body_markdown: string;
  positive_reactions_count: number;
  cover_image: string | null;
  tag_list: string[];
  canonical_url: string;
  reading_time_minutes: number;
  user: {
    name: string;
    username: string;
    twitter_username: string | null;
    github_username: string | null;
    user_id: number;
    website_url: string | null;
    profile_image: string;
    profile_image_90: string;
  };
}

// Processed blog data type definition for display
export interface BlogPost {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string;
  published_at: string;
  reading_time_minutes: number;
  public_reactions_count: number;
  comments_count: number;
  page_views_count: number;
  tag_list: string[];
  canonical_url: string;
}

// Function to process Dev.to data into our format
export const processDevToBlogPost = (post: DevToBlogPost): BlogPost => {
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    url: post.url,
    cover_image: post.cover_image || `https://via.placeholder.com/400x200/1a1a1a/4ade80?text=${encodeURIComponent(post.title.substring(0, 20))}`,
    published_at: post.published_at,
    reading_time_minutes: post.reading_time_minutes,
    public_reactions_count: post.public_reactions_count,
    comments_count: post.comments_count,
    page_views_count: post.page_views_count,
    tag_list: post.tag_list,
    canonical_url: post.canonical_url,
  };
};

// Function to sort and filter blogs to get the top 9
export const sortAndFilterBlogs = (blogs: DevToBlogPost[]): DevToBlogPost[] => {
  return blogs
    .filter(blog => {
      // Only published articles
      if (!blog.published || blog.type_of !== 'article') return false;
      
      // Filter out very short posts
      if (blog.reading_time_minutes < BLOG_CONFIG.MIN_READING_TIME) return false;
      
      // Must have meaningful title and description
      if (!blog.title || !blog.description || blog.description.length < 20) return false;
      
      return true;
    })
    .sort((a, b) => {
      // Primary sort: Posts with reactions/engagement first
      const aEngagement = a.public_reactions_count + a.comments_count + (a.page_views_count / 10);
      const bEngagement = b.public_reactions_count + b.comments_count + (b.page_views_count / 10);
      
      if (aEngagement !== bEngagement) {
        return bEngagement - aEngagement;
      }
      
      // Secondary sort: Priority tags
      const aPriorityTags = a.tag_list.filter(tag => 
        BLOG_CONFIG.PRIORITY_TAGS.includes(tag.toLowerCase())
      ).length;
      const bPriorityTags = b.tag_list.filter(tag => 
        BLOG_CONFIG.PRIORITY_TAGS.includes(tag.toLowerCase())
      ).length;
      
      if (aPriorityTags !== bPriorityTags) {
        return bPriorityTags - aPriorityTags;
      }
      
      // Tertiary sort: Reading time (longer posts preferred, but not too long)
      const aReadingScore = Math.min(a.reading_time_minutes, 10); // Cap at 10 minutes
      const bReadingScore = Math.min(b.reading_time_minutes, 10);
      
      if (aReadingScore !== bReadingScore) {
        return bReadingScore - aReadingScore;
      }
      
      // Final sort: Most recent
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    })
    .slice(0, BLOG_CONFIG.MAX_BLOGS);
};
