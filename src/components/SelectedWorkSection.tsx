import { Play, ArrowUpRight, Sparkles } from "lucide-react";
import { Project } from "../types";
import { PORTFOLIO_DATA } from "../data/portfolioData";

interface SelectedWorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export function SelectedWorkSection({ onSelectProject }: SelectedWorkSectionProps) {
  const projects = PORTFOLIO_DATA.projects;

  return (
    <section
      id="work"
      className="relative w-full px-6 sm:px-10 md:px-12 max-w-7xl mx-auto border-t border-white/5 py-20 sm:py-28 md:py-36 select-none"
    >
      {/* Section Header */}
      <div className="flex justify-between items-end mb-10 sm:mb-14 border-b border-white/5 pb-6">
        <div>
          <div
            id="work-eyebrow"
            className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-gray-500 uppercase mb-2"
          >
            Selected Work
          </div>
          <h2
            id="work-heading"
            className="text-2xl sm:text-4xl font-bold tracking-tight text-[#f5f5f0]"
          >
            Crafted with intent<span className="text-[#d9ff57]">.</span>
          </h2>
        </div>

        <div className="font-mono text-xs text-gray-400">
          <span>{projects.length} PROJECTS FEATURED</span>
        </div>
      </div>

      {/* Projects Grid / Stack */}
      <div className="space-y-8 sm:space-y-12">
        {projects.map((project, index) => {
          const isFirst = index === 0;
          return (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              onClick={() => onSelectProject(project)}
              className={`group relative bg-white/[0.03] border border-white/10 rounded-2xl p-7 sm:p-10 md:p-12 hover:border-[#d9ff57]/40 hover:bg-white/[0.05] transition-all cursor-pointer overflow-hidden ${
                isFirst ? "ring-1 ring-[#d9ff57]/20" : ""
              }`}
            >
              {/* Subtle Ambient Radial Glow */}
              <div
                className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${
                  project.accentTheme === "lime"
                    ? "from-[#d9ff57]/15"
                    : "from-[#f5f5f0]/10"
                } to-transparent blur-3xl group-hover:opacity-100 opacity-40 transition-opacity pointer-events-none`}
              />

              {/* Card Top: Badges, Year, Launch prompt */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono rounded-full tracking-wider text-[#d9ff57] flex items-center gap-1.5">
                    {project.id === "study-ai" && <Sparkles className="w-3 h-3" />}
                    <span>{project.category}</span>
                  </span>
                  <span className="font-mono text-xs text-gray-500">
                    {project.year}
                  </span>
                  {project.links?.live && (
                    <span className="hidden sm:inline-block font-mono text-[11px] text-gray-500 hover:text-gray-300 transition-colors">
                      {project.links.live.replace("https://", "").replace("/", "")}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-gray-400 group-hover:text-[#d9ff57] transition-colors">
                  <span>LAUNCH WEB CONTAINER</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Center Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-end">
                <div className="lg:col-span-8">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#f5f5f0] tracking-tight group-hover:text-[#d9ff57] transition-colors flex items-center gap-4">
                    <span>{project.name}</span>
                  </h3>
                  <p className="text-base sm:text-xl text-gray-300 font-light mt-3 leading-relaxed">
                    {project.tagline}
                  </p>
                  <p className="text-sm text-gray-400 mt-4 max-w-2xl leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-xs bg-white/5 text-gray-300 border border-white/5 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Action Sandbox Trigger Button */}
                <div className="lg:col-span-4 flex flex-col sm:items-end justify-end gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#d9ff57] text-black font-mono text-xs uppercase tracking-wider font-bold rounded-full hover:bg-[#e4ff7a] transition-all shadow-lg group-hover:scale-105"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>WEB CONTAINER DEMO</span>
                    </button>
                    {project.links?.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all group/btn"
                        title={`Open ${project.links.live} in new tab`}
                      >
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] font-mono text-gray-500 sm:text-right">
                    {project.links?.live
                      ? project.links.live.replace("https://", "").replace("/", "")
                      : "Interactive web container demo"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
