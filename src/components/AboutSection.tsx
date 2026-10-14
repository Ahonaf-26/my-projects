import { PORTFOLIO_DATA } from "../data/portfolioData";
import { TypewriterParagraph } from "./TypewriterParagraph";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#f0efe9] text-[#0b0b0b] py-20 sm:py-28 md:py-36 px-6 sm:px-10 md:px-12 transition-colors duration-700 select-text"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow Label */}
        <div
          id="about-eyebrow"
          className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#77746c] uppercase mb-6 sm:mb-10"
        >
          A Little About Me
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Big Editorial Heading */}
          <div className="lg:col-span-6">
            <h2
              id="about-heading"
              className="font-black italic text-[clamp(2.5rem,6.5vw,5.8rem)] leading-[0.9] tracking-tighter text-[#0b0b0b]"
            >
              Still learning.
              <br />
              <span className="text-[#68655d] font-bold">
                Already building.
              </span>
            </h2>
          </div>

          {/* Right Column: Bio Narrative + Statistics */}
          <div className="lg:col-span-6 flex flex-col justify-between max-w-xl">
            {/* Interactive Typewriter Description Container */}
            <TypewriterParagraph
              story1={PORTFOLIO_DATA.aboutStory1}
              story2={PORTFOLIO_DATA.aboutStory2}
            />

            {/* Three Statistics */}
            <div
              id="about-stats-grid"
              className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-[#d5d3ca] pt-8 mt-10 sm:mt-14"
            >
              {PORTFOLIO_DATA.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <strong className="font-sans font-black text-3xl sm:text-4xl text-[#0b0b0b] tracking-tight">
                    {stat.symbol}
                  </strong>
                  <small className="font-mono text-[10px] tracking-widest text-[#77746c] uppercase mt-2">
                    {stat.label}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

