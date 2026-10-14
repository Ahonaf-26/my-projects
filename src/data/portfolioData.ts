import { PortfolioData } from "../types";

/**
 * ============================================================================
 * PORTFOLIO DATA CONFIGURATION
 * Edit your details, projects, emails, and story in this file.
 * ============================================================================
 */
export const PORTFOLIO_DATA: PortfolioData = {
  name: {
    first: "AHONAF",
    last: "ABID",
  },
  
  // Contact and Social URLs (configurable via .env)
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || "ahonaf.work21@gmail.com",
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "+8801540167080",
  whatsappDisplay: import.meta.env.VITE_WHATSAPP_DISPLAY || "01540167080",
  facebookUrl: import.meta.env.VITE_FACEBOOK_URL || "https://www.facebook.com/ahonaf.abid.659393",

  shortBio: "Student, builder & curious human.",
  subBio: "I turn ideas into things you can actually use.",

  aboutIntro: "Still learning. Already building.",
  aboutStory1: "I'm Ahonaf — a student who enjoys technology, the web, movies, games and figuring out how things work.",
  aboutStory2: 'I focus on building clean, responsive web applications, interactive software, and tools that make me think, "wait… I actually built that?"',

  stats: [
    {
      symbol: "∞",
      label: "IDEAS",
      detail: "Constantly sketching, conceptualizing, and tinkering.",
    },
    {
      symbol: "24/7",
      label: "CURIOSITY",
      detail: "Obsessed with deep dives into code, aesthetics, and systems.",
    },
    {
      symbol: "01",
      label: "MISSION",
      detail: "To build software that is both genuinely useful and memorable.",
    },
  ],

  toolbox: [
    "HTML",
    "CSS",
    "JAVASCRIPT",
    "REACT",
    "TYPESCRIPT",
    "TAILWIND",
    "FIREBASE",
    "DESIGN",
    "REST APIS",
    "NODE.JS",
  ],

  projects: [
    {
      id: "study-ai",
      name: "StudyAI",
      tagline: "AI-powered academic & learning companion",
      description: "Intelligent study companion engineered to clarify difficult concepts, assist research, and streamline personalized learning workflows.",
      fullDescription: "StudyAI is a next-generation digital learning environment that leverages artificial intelligence to assist students and curious minds. Featuring clean conversational interactions, quick summary generation, and interactive learning tools tailored for deep focus and academic clarity.",
      category: "WEB",
      year: "2026",
      role: "Architecture, UI Design & Full Frontend",
      highlights: [
        "AI-assisted subject explanations and concept breakdowns",
        "Streamlined distraction-free study interface",
        "Adaptive prompt suggestions and real-time response streams",
        "Modern responsive web architecture with instant loading",
      ],
      techStack: ["TypeScript", "React", "AI APIs", "Tailwind CSS", "Vite"],
      accentTheme: "lime",
      links: {
        live: import.meta.env.VITE_STUDY_AI_URL || "https://studyaiabd.netlify.app/",
        demo: import.meta.env.VITE_STUDY_AI_URL || "https://studyaiabd.netlify.app/",
      },
      stats: [
        { label: "Platform", value: "Web / AI" },
        { label: "Speed", value: "Instant" },
      ],
    },
    {
      id: "thrivia",
      name: "Thrivia",
      tagline: "Interactive trivia experience",
      description: "Fast-paced, responsive knowledge game engineered with clean typography and instant state feedback.",
      fullDescription: "Thrivia is an interactive digital trivia experience designed to challenge knowledge enthusiasts with tactile animations, dynamic question handling, and instant scoring feedback. Built with pure speed, clean typography, and responsive visual punch in mind.",
      category: "WEB",
      year: "2026",
      role: "Concept, Design & Full Frontend",
      highlights: [
        "Dynamic multi-category question engine with real-time scoring",
        "Kinetic UI animations with zero layout shift",
        "Custom countdown timers with visual pulse indicators",
        "Zero-latency state transitions and interactive feedback",
      ],
      techStack: ["TypeScript", "React", "HTML5 Canvas", "Tailwind CSS", "Local State"],
      accentTheme: "yellow",
      links: {
        live: import.meta.env.VITE_THRIVIA_URL || "https://thrivia.netlify.app/",
        demo: import.meta.env.VITE_THRIVIA_URL || "https://thrivia.netlify.app/",
      },
      stats: [
        { label: "Questions", value: "500+" },
        { label: "Avg Round Time", value: "60s" },
      ],
    },
  ],

  socialLinks: [
    {
      platform: "Facebook",
      url: import.meta.env.VITE_FACEBOOK_URL || "https://www.facebook.com/ahonaf.abid.659393",
      label: "Facebook Profile",
    },
    {
      platform: "WhatsApp",
      url: `https://wa.me/${(import.meta.env.VITE_WHATSAPP_NUMBER || "+8801540167080").replace(/[^0-9]/g, "")}`,
      label: `WhatsApp: ${import.meta.env.VITE_WHATSAPP_DISPLAY || "01540167080"}`,
    },
    {
      platform: "Gmail",
      url: `mailto:${import.meta.env.VITE_CONTACT_EMAIL || "ahonaf.work21@gmail.com"}`,
      label: import.meta.env.VITE_CONTACT_EMAIL || "ahonaf.work21@gmail.com",
    },
  ],
};
