import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* === CALL OF DUTY INSPIRED DESIGN SYSTEM === */

  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&family=Teko:wght@300;400;500;600;700&display=swap');

  :root {
    /* CoD Color Palette - Military Dark Theme */
    --primary-bg: #0a0b0d;
    --secondary-bg: #0f1114;
    --tertiary-bg: #141619;
    --card-bg: rgba(16, 18, 22, 0.95);

    /* Accent Colors - Tactical */
    --cod-orange: #ff8c00;
    --cod-orange-dim: rgba(255, 140, 0, 0.15);
    --cod-green: #4ade80;
    --cod-green-dim: rgba(74, 222, 128, 0.12);
    --cod-red: #ef4444;
    --cod-red-dim: rgba(239, 68, 68, 0.12);
    --cod-blue: #38bdf8;
    --cod-blue-dim: rgba(56, 189, 248, 0.12);
    --cod-gold: #fbbf24;
    --cod-gold-dim: rgba(251, 191, 36, 0.12);

    /* Legacy vars (mapped for compat) */
    --accent-green: var(--cod-orange);
    --accent-pink: var(--cod-gold);

    /* Text */
    --text-primary: #e8e8e8;
    --text-secondary: #9ca3af;
    --text-muted: #6b7280;
    --text-bright: #ffffff;

    /* Borders */
    --border-color: rgba(255, 140, 0, 0.12);
    --border-bright: rgba(255, 140, 0, 0.35);

    /* Overlay */
    --overlay-bg: rgba(10, 11, 13, 0.97);

    /* Typography - Military Stack */
    --font-primary: 'Rajdhani', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-secondary: 'Teko', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'Share Tech Mono', 'Courier New', monospace;

    /* Spacing */
    --section-padding: 80px 0;
    --container-padding: 0 20px;
    --border-radius: 2px;
    --border-radius-lg: 4px;

    /* Transitions */
    --transition-fast: 0.15s ease;
    --transition-medium: 0.3s ease;
    --transition-slow: 0.5s ease;
    --transition-bounce: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    /* Shadows - Tactical Glow */
    --shadow-sm: 0 2px 10px rgba(0, 0, 0, 0.5);
    --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.6);
    --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.8);
    --shadow-glow: 0 0 20px rgba(255, 140, 0, 0.15);
    --shadow-glow-orange: 0 0 30px rgba(255, 140, 0, 0.2);
    --shadow-glow-green: 0 0 20px rgba(74, 222, 128, 0.15);

    /* Character Select Accent Colors */
    --cs-techie: #4ade80;
    --cs-influencer: #f472b6;
    --cs-branding: #fbbf24;
    --cs-fitness: #ef4444;
    --cs-bg: #0a0a0a;
    --cs-card-bg: rgba(15, 15, 15, 0.9);
    --cs-border: rgba(255, 140, 0, 0.08);
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  ::selection {
    background-color: var(--cod-orange);
    color: var(--primary-bg);
  }

  /* Scrollbar - Military Style */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: var(--primary-bg);
    border-left: 1px solid rgba(255, 140, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 140, 0, 0.4);
    border-radius: 0;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 140, 0, 0.6);
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
    outline: 2px solid var(--cod-orange);
    outline-offset: 2px;
  }

  @media (prefers-contrast: high) {
    :root {
      --text-primary: #FFFFFF;
      --text-secondary: #CCCCCC;
      --cod-orange: #FF9500;
      --border-color: #666666;
    }
  }

  @media print {
    * {
      background: white !important;
      color: black !important;
      box-shadow: none !important;
    }
  }

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
    background: linear-gradient(135deg, var(--cod-orange), var(--cod-gold));
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

  /* Military corner clip for cards */
  .clip-corners {
    clip-path: polygon(
      0 8px, 8px 0,
      calc(100% - 8px) 0, 100% 8px,
      100% calc(100% - 8px), calc(100% - 8px) 100%,
      8px 100%, 0 calc(100% - 8px)
    );
  }

  /* Mobile improvements */
  @media (max-width: 768px) {
    button, a, input, select, textarea {
      min-height: 44px;
      min-width: 44px;
    }

    h1, h2, h3, h4, h5, h6 {
      margin-bottom: 0.75rem;
    }

    p {
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 480px) {
    button, a, input, select, textarea {
      min-height: 48px;
      min-width: 48px;
    }

    h1, h2, h3, h4, h5, h6 {
      margin-bottom: 0.5rem;
    }

    p {
      margin-bottom: 0.75rem;
    }

    section {
      padding-right: 10% !important;
    }

    .container, [class*="Container"], [class*="Section"] {
      padding-right: 10% !important;
    }
  }
`;

export default GlobalStyles;
