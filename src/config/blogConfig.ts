// Blog configuration
export const BLOG_CONFIG = {
  // Webhook URL for fetching blog data
  WEBHOOK_URL: process.env.REACT_APP_BLOG_WEBHOOK_URL,
  
  // Maximum number of blogs to display
  MAX_BLOGS: 9,
  
  // API timeout in milliseconds
  TIMEOUT: 10000,
};

// Blog data type definition
export interface BlogPost {
  title: string;
  description: string;
  url: string;
  cover_image: string;
}
