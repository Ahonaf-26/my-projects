import { useState, useEffect } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("cursor-pointer"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  // Smooth trailing effect for cursor ring
  useEffect(() => {
    if (isTouch) return;
    let animationFrameId: number;

    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2,
      }));
      animationFrameId = requestAnimationFrame(follow);
    };

    animationFrameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pos, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Center dot */}
      <div
        className="fixed pointer-events-none z-[9998] w-2 h-2 bg-[#d9ff57] rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Outer subtle halo ring */}
      <div
        className={`fixed pointer-events-none z-[9997] rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out border border-[#d9ff57]/40 ${
          isHovered ? "w-12 h-12 bg-[#d9ff57]/10 scale-125 border-[#d9ff57]" : "w-7 h-7 bg-transparent"
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          opacity: isVisible ? 0.8 : 0,
        }}
      />
    </>
  );
}
