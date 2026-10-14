import { useState } from "react";

interface ToolItem {
  name: string;
  color: string;
  glow: string;
}

const TOOLBOX_ITEMS: ToolItem[] = [
  { name: "HTML5", color: "#FF5722", glow: "rgba(255, 87, 34, 0.4)" },
  { name: "CSS3", color: "#2965F1", glow: "rgba(41, 101, 241, 0.4)" },
  { name: "JAVASCRIPT", color: "#F7DF1E", glow: "rgba(247, 223, 30, 0.4)" },
  { name: "REACT", color: "#00D8FF", glow: "rgba(0, 216, 255, 0.4)" },
  { name: "TYPESCRIPT", color: "#3178C6", glow: "rgba(49, 120, 198, 0.4)" },
  { name: "TAILWIND", color: "#38BDF8", glow: "rgba(56, 189, 248, 0.4)" },
  { name: "FIREBASE", color: "#FFCA28", glow: "rgba(255, 202, 40, 0.4)" },
  { name: "DESIGN", color: "#C084FC", glow: "rgba(192, 132, 252, 0.4)" },
  { name: "REST APIS", color: "#D9FF57", glow: "rgba(217, 255, 87, 0.4)" },
  { name: "NODE.JS", color: "#68A063", glow: "rgba(104, 160, 99, 0.4)" },
  { name: "GIT", color: "#F05032", glow: "rgba(240, 80, 50, 0.4)" },
  { name: "NEXT.JS", color: "#F5F5F7", glow: "rgba(245, 245, 247, 0.4)" },
];

export function ToolboxSection() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const renderToolList = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center shrink-0">
      {TOOLBOX_ITEMS.map((item, idx) => {
        const isHovered = hoveredTool === `${keyPrefix}-${item.name}-${idx}`;
        return (
          <span key={`${keyPrefix}-${idx}`} className="inline-flex items-center">
            <span
              onMouseEnter={() => setHoveredTool(`${keyPrefix}-${item.name}-${idx}`)}
              onMouseLeave={() => setHoveredTool(null)}
              style={{
                color: item.color,
                textShadow: isHovered
                  ? `0 0 24px ${item.glow}, 0 0 8px ${item.color}`
                  : `0 0 16px ${item.glow}`,
              }}
              className={`transition-all duration-200 cursor-pointer ${
                isHovered ? "scale-105 brightness-125" : "brightness-100 hover:brightness-110"
              }`}
            >
              {item.name}
            </span>
            <span
              className="text-white/20 mx-4 sm:mx-6 md:mx-8 text-[0.4em] align-middle select-none"
              aria-hidden="true"
            >
              •
            </span>
          </span>
        );
      })}
    </div>
  );

  return (
    <section
      id="toolbox"
      className="relative w-full py-16 sm:py-24 bg-[#080808] border-t border-white/5 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-6">
        {/* Eyebrow Label */}
        <div
          id="toolbox-eyebrow"
          className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-gray-500 uppercase"
        >
          Current Toolbox
        </div>
      </div>

      {/* Editorial Giant Marquee Stream with Branded Colorful Typography */}
      <div className="relative w-full overflow-hidden py-4 sm:py-6 border-y border-white/5 bg-white/[0.01]">
        {/* Left and Right Edge Vignette Fades */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none"
        />

        <div className="animate-marquee whitespace-nowrap text-[40px] sm:text-[62px] md:text-[76px] font-black uppercase tracking-tighter">
          {renderToolList("set1")}
          {renderToolList("set2")}
        </div>
      </div>

      {/* Supporting detail labels underneath */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-6 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d9ff57] animate-pulse" />
          CONTINUOUSLY EXPANDING STACK
        </span>
        <span>HOVER TO PAUSE & INSPECT</span>
      </div>
    </section>
  );
}
