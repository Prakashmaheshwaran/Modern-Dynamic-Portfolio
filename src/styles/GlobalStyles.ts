import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* CSS Custom Properties (Variables) */
  :root {
    /* Color Palette - Sleek Black & White Theme */
    --primary-bg: #000000;
    --secondary-bg: #111111;
    --accent-green: #FFFFFF;
    --accent-pink: #CCCCCC;
    --text-primary: #FFFFFF;
    --text-secondary: #CCCCCC;
    --text-muted: #999999;
    --border-color: #333333;
    --card-bg: #1a1a1a;
    --overlay-bg: rgba(0, 0, 0, 0.95);
    
    /* Typography */
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-secondary: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
    
    /* Spacing */
    --section-padding: 100px 0;
    --container-padding: 0 20px;
    --border-radius: 12px;
    --border-radius-lg: 20px;
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
    --transition-slow: 0.5s ease;
    --transition-bounce: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    
    /* Shadows */
    --shadow-sm: 0 2px 10px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.5);
    --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.7);
    --shadow-glow: 0 0 30px rgba(255, 255, 255, 0.1);
    --shadow-glow-pink: 0 0 30px rgba(204, 204, 204, 0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: var(--font-primary);
    background-color: var(--primary-bg);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    /* Mobile optimizations */
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  ::selection {
    background-color: var(--accent-green);
    color: var(--primary-bg);
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--primary-bg);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--accent-green);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent-pink);
  }

  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  .focus-visible:focus {
    outline: 2px solid var(--accent-green);
    outline-offset: 2px;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    :root {
      --text-primary: #FFFFFF;
      --text-secondary: #CCCCCC;
      --accent-green: #00FF00;
      --accent-pink: #FF00FF;
      --border-color: #666666;
    }
  }

  /* Print styles */
  @media print {
    * {
      background: white !important;
      color: black !important;
      box-shadow: none !important;
    }
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    max-width: 70%;
    margin: 0 auto;
    padding: var(--container-padding);
    
    /* Mobile responsive container */
    @media (max-width: 1024px) {
      max-width: 85%;
    }
    
    @media (max-width: 768px) {
      max-width: 95%;
      padding: 0 1rem;
    }
    
    @media (max-width: 480px) {
      max-width: 100%;
      padding: 0 10% 0 0;
    }
  }

  .text-gradient {
    background: linear-gradient(135deg, var(--accent-green), var(--accent-pink));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glow {
    box-shadow: var(--shadow-glow);
  }

  .hidden {
    display: none !important;
  }

  /* Mobile-specific improvements */
  @media (max-width: 768px) {
    /* Improve touch targets */
    button, a, input, select, textarea {
      min-height: 44px;
      min-width: 44px;
    }
    
    /* Better spacing for mobile */
    h1, h2, h3, h4, h5, h6 {
      margin-bottom: 0.75rem;
    }
    
    p {
      margin-bottom: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    /* Even better touch targets for small screens */
    button, a, input, select, textarea {
      min-height: 48px;
      min-width: 48px;
    }
    
    /* Tighter spacing for small screens */
    h1, h2, h3, h4, h5, h6 {
      margin-bottom: 0.5rem;
    }
    
    p {
      margin-bottom: 0.75rem;
    }
    
    /* Add right padding to all sections for navigation clearance */
    section {
      padding-right: 10% !important;
    }
    
    /* Ensure all content containers have right padding */
    .container, [class*="Container"], [class*="Section"] {
      padding-right: 10% !important;
    }
  }
`;

export default GlobalStyles;
