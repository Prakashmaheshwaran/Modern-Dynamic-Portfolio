import { PersonaConfig } from '../types/persona';

export const personas: PersonaConfig[] = [
  {
    id: 'techie',
    title: 'GHOST',
    subtitle: 'Code Specialist',
    description: 'AI Architect @ Autodesk. Full Stack Developer. Automation Engineer. Operates in the shadows of silicon.',
    accentColor: '#4ade80',
    secondaryColor: '#064e3b',
    tagline: 'SILENT BUT DEADLY IN CODE',
    stats: [
      { label: 'AI/ML', value: 95 },
      { label: 'Full Stack', value: 90 },
      { label: 'Automation', value: 92 },
      { label: 'Research', value: 88 },
    ],
    isAvailable: true,
  },
  {
    id: 'influencer',
    title: 'PHOENIX',
    subtitle: 'Social Ops',
    description: 'Content Creator. Social Media Strategist. Community Builder. Rising from the digital ashes.',
    accentColor: '#f472b6',
    secondaryColor: '#831843',
    tagline: 'REBIRTH THROUGH CONTENT',
    stats: [
      { label: 'Content', value: 90 },
      { label: 'Engagement', value: 85 },
      { label: 'Creativity', value: 92 },
      { label: 'Reach', value: 80 },
    ],
    isAvailable: false,
  },
  {
    id: 'fitness',
    title: 'WARZONE',
    subtitle: 'Athletics Division',
    description: 'Gym Enthusiast. Fitness Coach. Discipline Driven. Battle-hardened and mission fit.',
    accentColor: '#ef4444',
    secondaryColor: '#7f1d1d',
    tagline: 'FORGED IN THE WARZONE',
    stats: [
      { label: 'Strength', value: 90 },
      { label: 'Discipline', value: 95 },
      { label: 'Endurance', value: 88 },
      { label: 'Nutrition', value: 82 },
    ],
    isAvailable: false,
  },
];
