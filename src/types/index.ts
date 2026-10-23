export type MusicGenre = 'all' | 'rock-pop' | 'metal' | 'instrumental' | 'classical' | 'film-experimental';

export type Language = 'pl' | 'en';

export interface ProjectConcept {
  id: string;
  title: string;
  artist: string;
  genre: MusicGenre;
  genreLabel: { pl: string; en: string };
  year: string;
  isDemoConcept: boolean;
  thumbnail: string;
  duration: string;
  bpm: number;
  synopsis: {
    pl: string;
    en: string;
  };
  visualWorld: {
    pl: string;
    en: string;
  };
  techniques: string[];
  colorPalette: string[];
  mockVideoNote?: string;
  youtubeId?: string;
  youtubeUrl?: string;
}

export interface PipelineStage {
  id: string;
  number: string;
  title: { pl: string; en: string };
  shortDesc: { pl: string; en: string };
  details: { pl: string; en: string };
  keyDeliverables: { pl: string[]; en: string[] };
  techSpec: string;
}

export interface OfferPackage {
  id: string;
  name: string;
  badge?: { pl: string; en: string };
  tagline: { pl: string; en: string };
  description: { pl: string; en: string };
  scopeList: { pl: string[]; en: string[] };
  turnaroundTime: { pl: string; en: string };
  idealFor: { pl: string; en: string };
}

export interface AudienceGroup {
  id: string;
  title: { pl: string; en: string };
  description: { pl: string; en: string };
  keyBenefit: { pl: string; en: string };
  iconName: string;
}

export interface BriefFormData {
  fullName: string;
  email: string;
  artistName: string;
  genre: string;
  demoLink: string;
  productionPackage?: string;
  estimatedBudget?: string;
  targetDeadline?: string;
  conceptDescription: string;
  acceptedPrivacy: boolean;
}
