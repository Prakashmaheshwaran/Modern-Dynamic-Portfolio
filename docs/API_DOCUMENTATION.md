# API Documentation

This document outlines the data structures for the external API integrations used in the portfolio.

## Blog Posts API (Dev.to)

### Endpoint

Hardcoded in `src/config/blogConfig.ts`:
```
https://dev.to/api/articles?username=prakash_maheshwaran&per_page=30
```

### Response Format: Direct Array

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

### Required Fields

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

## Projects API (GitHub)

### Endpoint

Hardcoded in `src/config/projectsConfig.ts`:
```
https://api.github.com/users/Prakashmaheshwaran/repos?per_page=100&sort=updated
```

### Response Format: Direct Array

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

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique identifier |
| `name` | string | Repository name |
| `full_name` | string | Full repository name (user/repo) |
| `description` | string\|null | Project description (min 10 chars) |
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

### Timeout Settings
- Blog API: 15 seconds
- Projects API: 15 seconds

### Fallback Behavior
If API calls fail or return invalid data, the application will:
1. Display static data from local files (projects only)
2. Show appropriate error messages
3. Log error information to console
4. Provide retry functionality

## Testing the APIs

```bash
# Test Blog API
curl "https://dev.to/api/articles?username=prakash_maheshwaran&per_page=30"

# Test Projects API
curl "https://api.github.com/users/Prakashmaheshwaran/repos?per_page=100&sort=updated"
```

## Customization

To use different API endpoints, edit the config files directly:
- Blog: `src/config/blogConfig.ts` — `BLOG_CONFIG.API_URL`
- Projects: `src/config/projectsConfig.ts` — `PROJECTS_CONFIG.API_URL`
