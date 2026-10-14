import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { TypewriterText } from "./TypewriterText";

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);

  const heroPhrases = [
    `${PORTFOLIO_DATA.shortBio} ${PORTFOLIO_DATA.subBio}`,
    "Still learning. Already building.",
    "I turn ideas into things you can actually use.",
    "Exploring code, aesthetics, and curiosity.",
  ];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    mass: 0.5,
  });

  // Coordinated parallax motion transforms
  const yTitleFirst = useTransform(smoothProgress, [0, 1], [0, -75]);
  const xTitleFirst = useTransform(smoothProgress, [0, 1], [0, -20]);
  const opacityTitleFirst = useTransform(smoothProgress, [0, 0.75, 1], [1, 0.65, 0.15]);

  const yTitleLast = useTransform(smoothProgress, [0, 1], [0, -115]);
  const xTitleLast = useTransform(smoothProgress, [0, 1], [0, 35]);
  const opacityTitleLast = useTransform(smoothProgress, [0, 0.75, 1], [1, 0.7, 0.2]);

  const dotScale = useTransform(smoothProgress, [0, 0.6, 1], [1, 1.35, 1.6]);
  
  const yQuote = useTransform(smoothProgress, [0, 1], [0, -55]);
  const opacityQuote = useTransform(smoothProgress, [0, 0.7, 1], [1, 0.75, 0.15]);

  const yGlow = useTransform(smoothProgress, [0, 1], [0, -140]);
  const scaleGlow = useTransform(smoothProgress, [0, 1], [1, 1.25]);
  const opacityGlow = useTransform(smoothProgress, [0, 0.8], [0.1, 0.02]);

  const ringParallaxY = useTransform(smoothProgress, [0, 1], [0, -120]);
  const ringScale = useTransform(smoothProgress, [0, 1], [1, 1.18]);
  const ringOpacity = useTransform(smoothProgress, [0, 0.8, 1], [0.65, 0.35, 0.05]);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative min-h-[92svh] md:min-h-[96svh] w-full flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 px-6 sm:px-10 md:px-12 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* Editorial Wireframe Celestial Ring with Parallax */}
      <motion.div
        aria-hidden="true"
        className="absolute top-[8%] right-[-50px] sm:right-[3%] w-[280px] sm:w-[440px] h-[280px] sm:h-[440px] rounded-full border border-white/[0.06] pointer-events-none z-0"
        style={{
          y: ringParallaxY,
          scale: ringScale,
          opacity: ringOpacity,
          boxShadow: "inset 0 0 80px rgba(217, 255, 87, 0.035)",
        }}
      >
        <div className="absolute inset-4 rounded-full border border-dashed border-white/[0.04] animate-[spin_140s_linear_infinite]" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d9ff57]/20 to-transparent -rotate-12" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent rotate-45" />
      </motion.div>

      {/* Editorial Ambient Radial Blur Light with Parallax */}
      <motion.div
        aria-hidden="true"
        className="absolute top-[15%] left-[5%] w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full blur-[120px] bg-[#d9ff57] pointer-events-none animate-ambient-glow z-0"
        style={{
          y: yGlow,
          scale: scaleGlow,
          opacity: opacityGlow,
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 py-6 sm:py-10">
        {/* Big Editorial Italic Headline with Layered Parallax Motion */}
        <h1
          id="hero-title"
          className="leading-[0.85] font-black italic text-[#f5f5f0]"
        >
          <motion.div
            className="text-[clamp(3.6rem,13.5vw,140px)] tracking-tighter will-change-transform"
            style={{
              y: yTitleFirst,
              x: xTitleFirst,
              opacity: opacityTitleFirst,
            }}
          >
            {PORTFOLIO_DATA.name.first}
          </motion.div>
          <motion.div
            className="text-[clamp(3.6rem,13.5vw,140px)] tracking-tighter ml-8 sm:ml-16 md:ml-20 will-change-transform"
            style={{
              y: yTitleLast,
              x: xTitleLast,
              opacity: opacityTitleLast,
            }}
          >
            {PORTFOLIO_DATA.name.last}
            <motion.span
              id="hero-title-dot"
              className="text-[#d9ff57] inline-block"
              style={{ scale: dotScale }}
            >
              .
            </motion.span>
          </motion.div>
        </h1>
      </div>

      {/* Editorial Quote Callout & Scroll Indicator with Parallax */}
      <motion.div
        className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-8 pt-6 sm:pt-10"
        style={{
          y: yQuote,
          opacity: opacityQuote,
        }}
      >
        <div className="max-w-xl min-h-[64px] sm:min-h-[56px] flex items-center">
          <p
            id="hero-description"
            className="text-lg sm:text-xl text-gray-300 leading-relaxed font-light italic border-l-2 border-[#d9ff57] pl-6"
          >
            <TypewriterText
              phrases={heroPhrases}
              typingSpeed={40}
              deletingSpeed={22}
              pauseDuration={3000}
              prefix="«"
              suffix="»"
              cursorClassName="text-[#d9ff57]"
            />
          </p>
        </div>

        <div>
          <a
            href="#work"
            id="hero-scroll-btn"
            className="group flex items-center space-x-4 text-[10px] font-mono tracking-widest text-gray-500 hover:text-[#d9ff57] transition-colors"
          >
            <div className="w-12 h-[1px] bg-gray-800 group-hover:bg-[#d9ff57] transition-colors" />
            <span>SCROLL TO EXPLORE ↓</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

