export type PersonaType = 'techie' | 'influencer' | 'fitness';

export interface PersonaStat {
  label: string;
  value: number; // 0-100 for bar display
}

export interface PersonaConfig {
  id: PersonaType;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  secondaryColor: string;
  tagline: string;
  stats: PersonaStat[];
  isAvailable: boolean;
}
