import { PORTFOLIO_DATA } from "../data/portfolioData";

export function Footer() {
  return (
    <footer
      id="main-footer"
      className="w-full relative z-10 select-none liquid-glass-footer overflow-hidden"
    >
      {/* Optical Liquid Glass Shimmer Layer across full screen width */}
      <div
        aria-hidden="true"
        className="absolute -inset-full w-[200%] h-[300%] pointer-events-none opacity-15 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-liquid-shimmer"
      />

      {/* Top Specular Liquid Light Line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
      />

      {/* Top Lime Underglow Trace */}
      <div
        aria-hidden="true"
        className="absolute top-[1px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d9ff57]/15 to-transparent pointer-events-none"
      />

      {/* Inner Footer Content Container spanning standard layout width */}
      <div className="w-full max-w-7xl mx-auto py-8 sm:py-10 px-6 sm:px-10 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-wider relative z-10">
        {/* Left: Identity */}
        <div className="flex items-center gap-2">
          <span className="text-[#f5f5f0] font-bold tracking-tight">
            {PORTFOLIO_DATA.name.first} {PORTFOLIO_DATA.name.last}
            <span className="text-[#d9ff57] drop-shadow-[0_0_6px_rgba(217,255,87,0.5)]">.</span>
          </span>
          <span className="text-gray-400">© 2026</span>
        </div>

        {/* Right: Social Links in Glass Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] text-gray-300">
          {PORTFOLIO_DATA.socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-[#d9ff57]/40 hover:text-[#d9ff57] hover:bg-white/[0.08] transition-all backdrop-blur-md"
            >
              {social.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
