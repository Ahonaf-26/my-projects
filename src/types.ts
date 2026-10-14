export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  fullDescription: string;
  category: "WEB" | "SOFTWARE" | "DESIGN" | "MOBILE";
  year: string;
  role: string;
  highlights: string[];
  techStack: string[];
  links?: {
    live?: string;
    github?: string;
    demo?: string;
  };
  accentTheme: "yellow" | "monochrome" | "indigo" | "lime";
  stats?: { label: string; value: string }[];
}

export interface PortfolioData {
  name: {
    first: string;
    last: string;
  };
  contactEmail: string;
  whatsappNumber?: string;
  whatsappDisplay?: string;
  facebookUrl?: string;
  shortBio: string;
  subBio: string;
  aboutIntro: string;
  aboutStory1: string;
  aboutStory2: string;
  stats: {
    symbol: string;
    label: string;
    detail: string;
  }[];
  toolbox: string[];
  projects: Project[];
  socialLinks: {
    platform: string;
    url: string;
    label: string;
  }[];
}
