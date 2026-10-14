import { useState, useEffect } from "react";
import { MagneticButton } from "./MagneticButton";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 liquid-glass-nav overflow-hidden ${
        scrolled ? "py-3 sm:py-3.5 bg-[#0a0c10]/85 shadow-2xl" : "py-4 sm:py-5 bg-[#0a0c10]/60"
      }`}
    >
      {/* Optical Liquid Glass Shimmer Layer across full screen width */}
      <div
        aria-hidden="true"
        className="absolute -inset-full w-[200%] h-[300%] pointer-events-none opacity-15 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-liquid-shimmer"
      />

      {/* Top Specular Reflection Highlight Line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
      />

      {/* Bottom Subtle Lime Tint Line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d9ff57]/15 to-transparent pointer-events-none"
      />

      {/* Inner Navigation Content Container */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12 flex items-center justify-between relative z-10">
        {/* Left: Brand Logo with Liquid Gloss */}
        <a
          href="#top"
          id="nav-logo"
          className="text-lg sm:text-xl md:text-2xl font-bold tracking-tighter text-[#f5f5f0] hover:opacity-90 transition-opacity font-sans flex items-center gap-1"
          aria-label="Ahonaf Abid Portfolio Home"
        >
          <span>AH</span>
          <span className="text-[#d9ff57] drop-shadow-[0_0_8px_rgba(217,255,87,0.6)]">.</span>
        </a>

        {/* Center & Right Navigation Group */}
        <div className="flex items-center space-x-4 sm:space-x-8 md:space-x-10">
          {/* Desktop Nav Links */}
          <nav
            id="nav-menu"
            className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs lg:text-sm font-medium text-gray-300 bg-white/[0.03] p-1 rounded-full border border-white/[0.08] backdrop-blur-md"
          >
            <a
              href="#work"
              id="nav-link-work"
              className="px-3.5 py-1.5 rounded-full hover:text-[#d9ff57] hover:bg-white/[0.06] transition-all"
            >
              Work
            </a>
            <a
              href="#about"
              id="nav-link-about"
              className="px-3.5 py-1.5 rounded-full hover:text-[#d9ff57] hover:bg-white/[0.06] transition-all"
            >
              About
            </a>
            <a
              href="#toolbox"
              id="nav-link-toolbox"
              className="px-3.5 py-1.5 rounded-full hover:text-[#d9ff57] hover:bg-white/[0.06] transition-all"
            >
              Toolbox
            </a>
            <a
              href="#contact"
              id="nav-link-contact"
              className="px-3.5 py-1.5 rounded-full hover:text-[#d9ff57] hover:bg-white/[0.06] transition-all"
            >
              Contact
            </a>
          </nav>

          {/* Magnetic Animated Let's talk ↗ Button in Liquid Glass */}
          <MagneticButton
            href="#contact"
            id="nav-talk-btn"
            magneticStrength={0.45}
            magneticRadius={120}
            className="cursor-pointer"
          >
            <div className="px-4 sm:px-5 py-2 border border-white/20 rounded-full text-xs sm:text-sm font-medium bg-white/[0.06] hover:bg-[#d9ff57] hover:text-black hover:border-[#d9ff57] transition-all duration-200 flex items-center group text-[#f5f5f0] shadow-md backdrop-blur-lg">
              <span>Let's talk</span>
              <span className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#d9ff57] group-hover:text-black font-bold">
                ↗
              </span>
            </div>
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
