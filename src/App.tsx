import { useState } from "react";
import { ScrollProgress } from "./components/ScrollProgress";
import { CustomCursor } from "./components/CustomCursor";
import { GlobalCosmicBackground } from "./components/GlobalCosmicBackground";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { IdeaSection } from "./components/IdeaSection";
import { SelectedWorkSection } from "./components/SelectedWorkSection";
import { AboutSection } from "./components/AboutSection";
import { ToolboxSection } from "./components/ToolboxSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { ProjectModal } from "./components/ProjectModal";
import { Project } from "./types";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#f3f1eb] selection:bg-[#d9ff57] selection:text-[#080808]">
      {/* Global Interactive Starfield, Constellation Mesh & Cosmic Shooting Stars */}
      <GlobalCosmicBackground />

      {/* Cinematic noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Fluid Desktop Custom Cursor */}
      <CustomCursor />

      {/* Minimal Sticky Navigation */}
      <Navigation />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Full-screen Hero Section */}
        <HeroSection />

        {/* The Idea */}
        <IdeaSection />

        {/* Selected Work */}
        <SelectedWorkSection onSelectProject={(p) => setSelectedProject(p)} />

        {/* About Me (Light Editorial Transition) */}
        <AboutSection />

        {/* Current Toolbox (Infinite Marquee) */}
        <ToolboxSection />

        {/* Contact with Telegram Dispatch */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Project Detail & Sandbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
