# Prakash Maheshwaran - React Portfolio

A modern, interactive portfolio website built with React, TypeScript, and Three.js featuring stunning 3D animations, responsive design, and accessibility features.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## ✨ Features

### **🎨 Visual Design**
- **3D Hero Section** with React Three Fiber animations
- **Interactive Skills Visualization** with rotating 3D spheres
- **Dark Mode Aesthetic** with neon accent colors (#00FFAA, #FF6AFF)
- **Smooth Animations** using Framer Motion
- **Modern Typography** with Inter and Poppins fonts

### **📱 Responsive & Interactive**
- **Fully Responsive** design that works on all devices
- **Touch-Friendly** interactions for mobile users
- **Scroll-Triggered** animations with Intersection Observer
- **Smooth Navigation** with scroll spy functionality
- **Interactive Project Gallery** with filtering and hover effects

### **⚡ Performance Optimized**
- **Lazy Loading** for 3D components using React Suspense
- **Code Splitting** with dynamic imports
- **Optimized Animations** with reduced motion support
- **Efficient Re-renders** using React.memo and custom hooks
- **TypeScript** for better development experience and type safety

### **♿ Accessibility**
- **ARIA Labels** and semantic HTML
- **Keyboard Navigation** support
- **Screen Reader Friendly** content
- **Focus Management** in interactive components
- **Reduced Motion** preference support

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18** with hooks and context
- **TypeScript** for type safety
- **Styled Components** for CSS-in-JS styling
- **Framer Motion** for smooth animations

### **3D Graphics**
- **React Three Fiber** for 3D rendering
- **Three.js** as the underlying 3D engine
- **@react-three/drei** for 3D utilities and helpers

### **Development Tools**
- **Create React App** for build tooling
- **ESLint** for code linting
- **React Scripts** for development and building

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Hero/            # 3D hero section
│   ├── About/           # About section with timeline
│   ├── Projects/        # Interactive project gallery
│   ├── Skills/          # 3D skills visualization
│   ├── Experience/      # Accordion experience section
│   ├── Contact/         # Contact form and info
│   ├── Navigation/      # Responsive navigation
│   ├── LoadingScreen/   # Loading animation
│   └── Footer/          # Footer component
├── data/                # Static data files
│   ├── projectsData.ts  # Project information
│   ├── skillsData.ts    # Skills and categories
│   └── experienceData.ts # Experience details
├── hooks/               # Custom React hooks
│   ├── useScrollSpy.ts  # Section navigation
│   ├── useIntersectionObserver.ts # Scroll animations
│   └── useLocalStorage.ts # Persistent settings
├── utils/               # Utility functions
│   ├── scrollUtils.ts   # Smooth scrolling helpers
│   └── reportWebVitals.ts # Performance monitoring
├── styles/              # Global styles
│   └── GlobalStyles.ts  # Styled-components global styles
├── App.tsx              # Main application component
└── index.tsx            # Application entry point
```

## 🎯 Key Sections

### **Hero Section**
- Full-screen 3D scene with floating code blocks
- Interactive particle system
- Network node connections
- Mouse-responsive camera movement
- Prominent call-to-action buttons

### **About Section**
- Personal introduction and bio
- Animated education timeline
- Core competencies with progress bars
- Scroll-triggered animations

### **Projects Gallery**
- 6 featured projects with detailed information
- Category-based filtering (All, Automation, ML, Web, Research)
- Interactive project cards with hover effects
- Technologies, GitHub links, and live demos

### **Skills Visualization**
- 3D rotating skill spheres with orbital motion
- 20+ technical skills across 5 categories
- Interactive skill items with proficiency levels
- Real-time 3D rendering with React Three Fiber

### **Experience Timeline**
- Expandable accordion-style layout
- 4 detailed experience entries
- Achievement lists and technology tags
- Current positions highlighted

### **Contact Section**
- Interactive contact form with validation
- Contact information cards
- Social media links
- Campus location placeholder

## 🔧 Available Scripts

```bash
# Development
npm start              # Start development server
npm run build          # Build for production
npm test              # Run test suite

# Code Quality
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint issues
npm run type-check    # TypeScript type checking
```

## 🌐 Browser Requirements

- **Modern Browser** with ES6+ support
- **WebGL Support** for 3D graphics
- **JavaScript Enabled**
- Recommended: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+

## 📈 Performance Features

- **Optimized Bundle Size** with code splitting
- **Efficient 3D Rendering** with automatic performance scaling
- **Smooth 60fps Animations** with hardware acceleration
- **Progressive Loading** of heavy resources
- **Automatic Image Optimization**

## 🎨 Customization

### **Personal Information**
Edit the data files in `src/data/` to customize:
- Projects and achievements
- Skills and proficiency levels
- Experience and education
- Contact information

### **Styling**
Modify `src/styles/GlobalStyles.ts` for:
- Color scheme and branding
- Typography settings
- Animation timings
- Responsive breakpoints

### **3D Scenes**
Customize 3D elements in:
- `src/components/Hero/Hero3D.tsx` - Hero animations
- `src/components/Skills/Skills3D.tsx` - Skills visualization

## 🚀 Deployment

### **Production Build**
```bash
npm run build
```

### **Deploy Options**
- **Netlify** - Drag and drop the `build` folder
- **Vercel** - Connect GitHub repository
- **GitHub Pages** - Use `gh-pages` package
- **AWS S3** - Upload build folder to S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **React Three Fiber** for amazing 3D React integration
- **Framer Motion** for smooth animations
- **Styled Components** for powerful CSS-in-JS
- **Three.js** community for 3D graphics inspiration

---

**Built with ❤️ by Prakash Maheshwaran** | MS in CS @ SUNY Binghamton | Seeking Opportunities