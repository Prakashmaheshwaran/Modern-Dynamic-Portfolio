# Logo System

This directory contains the logo system for the portfolio application.

## LogoIcon Component

The `LogoIcon` component provides a unified way to display technology logos throughout the application. It uses the `react-icons` library to provide accurate, original logos for various technologies.

### Usage

```tsx
import LogoIcon from '../UI/LogoIcon';

// Basic usage
<LogoIcon name="react" size={24} color="#61dafb" />

// With custom styling
<LogoIcon 
  name="python" 
  size={32} 
  color="#3776ab" 
  className="custom-logo" 
/>
```

### Props

- `name`: The technology name (e.g., 'react', 'python', 'docker')
- `size`: Icon size in pixels (default: 24)
- `color`: Icon color (default: 'inherit')
- `className`: Additional CSS class

### Supported Technologies

The component supports logos for:

**Frontend/Web:**
- React, Node.js, Express, Django, Flask
- JavaScript, Python, Java, C++

**AI/ML:**
- TensorFlow, PyTorch, Scikit-learn, OpenCV
- OpenAI

**Cloud/DevOps:**
- AWS, Google Cloud, Docker, Kubernetes
- Git, GitLab, Terraform

**Databases:**
- MongoDB, PostgreSQL, Redis, Elasticsearch

**Design Tools:**
- Figma, Blender, After Effects

**Automation:**
- Selenium, UiPath, Power Automate, Zapier

### Adding New Logos

To add a new technology logo:

1. Import the icon from `react-icons/si` or `react-icons/fa`
2. Add it to the `logoMap` object in `LogoIcon.tsx`
3. Use the technology name as the key

```tsx
import { SiNewTechnology } from 'react-icons/si';

const logoMap = {
  // ... existing mappings
  'newtech': SiNewTechnology,
};
```

### Fallback

If a logo is not found, the component will display a generic code icon and log a warning to the console.
