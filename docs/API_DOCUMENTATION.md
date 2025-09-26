# API Documentation

This document outlines the expected data structures for the webhook integrations used in the portfolio.

## Blog Webhook API

### Endpoint Configuration
```env
REACT_APP_BLOG_WEBHOOK_URL=https://your-webhook-url.com/api/blogs
```

### Supported Response Formats

The application supports multiple response formats to ensure compatibility with various APIs:

#### Format 1: Direct Array (Dev.to API compatible)
```json
[
  {
    "type_of": "article",
    "id": 123456,
    "title": "Building Modern React Applications",
    "description": "A comprehensive guide to building modern React applications with TypeScript and best practices.",
    "published": true,
    "published_at": "2024-01-15T10:30:00Z",
    "slug": "building-modern-react-applications",
    "path": "/username/building-modern-react-applications",
    "url": "https://dev.to/username/building-modern-react-applications",
    "comments_count": 25,
    "public_reactions_count": 150,
    "page_views_count": 1200,
    "published_timestamp": "2024-01-15T10:30:00Z",
    "body_markdown": "# Building Modern React Applications...",
    "positive_reactions_count": 140,
    "cover_image": "https://example.com/cover-image.jpg",
    "tag_list": ["react", "typescript", "javascript", "webdev"],
    "canonical_url": "https://dev.to/username/building-modern-react-applications",
    "reading_time_minutes": 8,
    "user": {
      "name": "Your Name",
      "username": "yourusername",
      "twitter_username": "yourtwitter",
      "github_username": "yourgithub",
      "user_id": 12345,
      "website_url": "https://yourwebsite.com",
      "profile_image": "https://example.com/profile.jpg",
      "profile_image_90": "https://example.com/profile-90.jpg"
    }
  }
]
```

#### Format 2: Wrapped in Object
```json
{
  "data": [...], // Array of blog posts
  // OR
  "blogs": [...], // Array of blog posts
  // OR
  "posts": [...], // Array of blog posts
  // OR
  "articles": [...], // Array of blog posts
  // OR
  "items": [...] // Array of blog posts
}
```

### Required Fields

The following fields are **required** for each blog post:

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique identifier |
| `title` | string | Blog post title |
| `description` | string | Brief description (min 20 chars) |
| `url` | string | Full URL to the blog post |
| `published` | boolean | Publication status |
| `type_of` | string | Must be "article" |

### Optional but Recommended Fields

| Field | Type | Description |
|-------|------|-------------|
| `cover_image` | string\|null | Cover image URL |
| `published_at` | string | Publication date (ISO format) |
| `reading_time_minutes` | number | Estimated reading time |
| `public_reactions_count` | number | Number of reactions/likes |
| `comments_count` | number | Number of comments |
| `page_views_count` | number | Number of page views |
| `tag_list` | string[] | Array of tags |

## Projects Webhook API

### Endpoint Configuration
```env
REACT_APP_PROJECT_WEBHOOK_URL=https://api.github.com/users/yourusername/repos
```

### Supported Response Formats

#### Format 1: Direct Array (GitHub API compatible)
```json
[
  {
    "id": 123456789,
    "name": "modern-portfolio",
    "full_name": "username/modern-portfolio",
    "description": "A modern, interactive portfolio website built with React and TypeScript",
    "html_url": "https://github.com/username/modern-portfolio",
    "homepage": "https://yourportfolio.com",
    "stargazers_count": 42,
    "language": "TypeScript",
    "topics": ["react", "typescript", "portfolio", "3d", "animation"],
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-15T12:00:00Z",
    "pushed_at": "2024-01-15T11:45:00Z",
    "size": 1024,
    "forks_count": 5,
    "open_issues_count": 2,
    "visibility": "public",
    "fork": false
  }
]
```

#### Format 2: Wrapped in Object
```json
{
  "data": [...], // Array of projects
  // OR
  "projects": [...], // Array of projects
  // OR
  "repositories": [...], // Array of projects
  // OR
  "repos": [...] // Array of projects
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique identifier |
| `name` | string | Repository name |
| `description` | string\|null | Project description |
| `html_url` | string | GitHub repository URL |
| `language` | string\|null | Primary programming language |
| `updated_at` | string | Last update date (ISO format) |
| `fork` | boolean | Whether it's a forked repository |

### Optional but Recommended Fields

| Field | Type | Description |
|-------|------|-------------|
| `homepage` | string\|null | Live demo URL |
| `stargazers_count` | number | Number of stars |
| `topics` | string[] | Repository topics/tags |
| `created_at` | string | Creation date |
| `forks_count` | number | Number of forks |

## Filtering and Sorting

### Blog Posts
- Only published articles with `type_of: "article"`
- Minimum reading time: 1 minute
- Minimum description length: 20 characters
- Sorted by engagement (reactions + comments + views)
- Priority tags: javascript, typescript, python, react, node, automation, ai, ml
- Maximum displayed: 9 posts

### Projects
- Excludes forked repositories with 0 stars
- Minimum description length: 10 characters
- Excludes repositories not updated in 2+ years
- Sorted by stars, then non-forked status, then priority languages
- Priority languages: TypeScript, Python, JavaScript, C++
- Maximum displayed: 9 projects

## Error Handling

### Common Error Responses
```json
{
  "error": "Invalid API key",
  "message": "The provided API key is invalid or expired"
}
```

### Timeout Settings
- Blog API: 15 seconds
- Projects API: 15 seconds

### Fallback Behavior
If webhooks fail or return invalid data, the application will:
1. Display static data from local files
2. Show appropriate error messages
3. Log detailed error information to console
4. Provide retry functionality

## Testing Your Webhook

You can test your webhook by:

1. **Direct API Testing**: Use tools like Postman or curl
2. **Browser Console**: Check the console logs for detailed response information
3. **Network Tab**: Monitor network requests in DevTools

### Sample Test Commands

```bash
# Test Blog API
curl -H "Content-Type: application/json" "YOUR_BLOG_WEBHOOK_URL"

# Test Projects API  
curl -H "Content-Type: application/json" "YOUR_PROJECTS_WEBHOOK_URL"
```

## Integration Examples

### Dev.to Integration
```env
REACT_APP_BLOG_WEBHOOK_URL=https://dev.to/api/articles?username=yourusername&per_page=20
```

### GitHub Integration
```env
REACT_APP_PROJECT_WEBHOOK_URL=https://api.github.com/users/yourusername/repos?sort=updated&per_page=20
```

### Custom N8N Webhook
```env
REACT_APP_BLOG_WEBHOOK_URL=https://n8n.yourserver.com/webhook/blog-posts
REACT_APP_PROJECT_WEBHOOK_URL=https://n8n.yourserver.com/webhook/github-projects
```
