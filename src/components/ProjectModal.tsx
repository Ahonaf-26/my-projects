import { useState, useEffect, useRef } from "react";
import {
  X,
  ExternalLink,
  Lock,
  RefreshCw,
  Copy,
  Check,
  Smartphone,
  Tablet,
  Monitor,
  Sparkles,
} from "lucide-react";
import { Project } from "../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copied, setCopied] = useState(false);
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const liveUrl = project?.links?.live || project?.links?.demo || "https://thrivia.netlify.app/";

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Reset loading on iframe change or key reload
  useEffect(() => {
    setIsLoadingIframe(true);
  }, [iframeKey, viewportMode]);

  if (!project) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-[#000000]/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="project-modal-dialog"
        className="relative w-full max-w-5xl bg-[#0d0f12] border border-white/15 rounded-2xl text-[#f5f5f0] shadow-2xl overflow-hidden my-auto select-text flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02] gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-[#d9ff57] uppercase tracking-wider px-2.5 py-0.5 border border-[#d9ff57]/30 bg-[#d9ff57]/10 rounded-full font-semibold">
              {project.category}
            </span>
            <h2 className="font-sans font-bold text-lg sm:text-xl text-[#f5f5f0] flex items-center gap-2">
              <span>{project.name}</span>
              <span className="text-xs font-mono text-gray-400 font-normal hidden sm:inline">
                / {project.tagline}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Direct Open Link */}
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#d9ff57] text-black font-mono text-xs font-bold rounded-lg hover:bg-[#e4ff7a] transition-all"
            >
              <span>OPEN APP</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              id="close-project-modal"
              className="p-1.5 text-gray-400 hover:text-[#f5f5f0] hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Direct Full Web Container */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1 flex flex-col">
          <div className="flex-1 flex flex-col min-h-[480px] sm:min-h-[580px]">
            {/* Web Container Window Frame */}
            <div className="flex-1 flex flex-col bg-[#050608] border border-white/15 rounded-xl overflow-hidden shadow-2xl">
              {/* Browser Top Navigation Bar */}
              <div className="bg-[#12141a] px-4 py-2.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 select-none">
                {/* Traffic Light Window Controls */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]/50" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]/50" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]/90 border border-[#1aab29]/50" />
                  <button
                    onClick={handleReload}
                    title="Reload container"
                    className="ml-2 p-1 text-gray-400 hover:text-[#d9ff57] transition-colors rounded"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingIframe ? "animate-spin text-[#d9ff57]" : ""}`} />
                  </button>
                </div>

                {/* Browser Address Bar */}
                <div className="flex-1 max-w-md mx-auto flex items-center justify-between px-3 py-1 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-gray-300">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Lock className="w-3 h-3 text-[#d9ff57] shrink-0" />
                    <span className="truncate text-gray-300 font-sans text-[11px] sm:text-xs">
                      {liveUrl}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyUrl}
                    title="Copy link"
                    className="ml-2 p-1 text-gray-400 hover:text-[#d9ff57] transition-colors shrink-0"
                  >
                    {copied ? (
                      <Check className="w-3 h-3 text-[#d9ff57]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>

                {/* Viewport Sizing Controls & External Link */}
                <div className="flex items-center gap-2">
                  {/* Viewport mode switcher (hidden on small mobile screens) */}
                  <div className="hidden sm:flex items-center bg-white/5 p-0.5 rounded-lg border border-white/10 text-xs">
                    <button
                      onClick={() => setViewportMode("desktop")}
                      className={`p-1.5 rounded transition-colors ${
                        viewportMode === "desktop"
                          ? "bg-[#d9ff57] text-black"
                          : "text-gray-400 hover:text-white"
                      }`}
                      title="Desktop view (100%)"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setViewportMode("tablet")}
                      className={`p-1.5 rounded transition-colors ${
                        viewportMode === "tablet"
                          ? "bg-[#d9ff57] text-black"
                          : "text-gray-400 hover:text-white"
                      }`}
                      title="Tablet view (768px)"
                    >
                      <Tablet className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setViewportMode("mobile")}
                      className={`p-1.5 rounded transition-colors ${
                        viewportMode === "mobile"
                          ? "bg-[#d9ff57] text-black"
                          : "text-gray-400 hover:text-white"
                      }`}
                      title="Mobile view (390px)"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Open in new tab button */}
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white font-mono text-xs rounded-lg hover:bg-white/20 transition-all shrink-0"
                  >
                    <span className="hidden sm:inline">EXTERNAL</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Web Container Content Area */}
              <div className="flex-1 relative bg-[#07080b] flex items-center justify-center min-h-[420px] sm:min-h-[520px] overflow-auto p-0 sm:p-2">
                {/* Loading overlay indicator */}
                {isLoadingIframe && (
                  <div className="absolute inset-0 z-20 bg-[#07080b]/90 flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-2 border-[#d9ff57] border-t-transparent rounded-full animate-spin" />
                    <div className="text-xs font-mono text-[#d9ff57] flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>INITIALIZING WEB CONTAINER / {project.name.toUpperCase()}...</span>
                    </div>
                    <span className="text-[11px] font-mono text-gray-500">
                      Connecting to {liveUrl}
                    </span>
                  </div>
                )}

                {/* Responsive Container Box */}
                <div
                  className={`h-full transition-all duration-300 mx-auto ${
                    viewportMode === "desktop"
                      ? "w-full"
                      : viewportMode === "tablet"
                      ? "w-full max-w-[768px] border-x border-white/10 shadow-2xl rounded-lg overflow-hidden"
                      : "w-full max-w-[390px] border-x border-white/10 shadow-2xl rounded-lg overflow-hidden"
                  }`}
                >
                  <iframe
                    key={iframeKey}
                    ref={iframeRef}
                    src={liveUrl}
                    title={`${project.name} Live Web Demo`}
                    className="w-full h-[520px] sm:h-[600px] border-0 bg-[#0a0c10]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                    loading="lazy"
                    onLoad={() => setIsLoadingIframe(false)}
                  />
                </div>
              </div>

              {/* Web Container Bottom Status Footer */}
              <div className="bg-[#12141a] px-4 py-2 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-gray-400 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d9ff57] animate-pulse" />
                  <span>STATUS: CONTAINER ACTIVE & SECURE</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>HOST: NETLIFY EDGE</span>
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d9ff57] hover:underline flex items-center gap-1"
                  >
                    <span>Direct URL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
