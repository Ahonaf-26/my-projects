import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  id?: string;
  magneticStrength?: number; // 0 to 1, default ~0.35
  magneticRadius?: number; // radius in px where magnetism takes effect
}

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  id,
  magneticStrength = 0.4,
  magneticRadius = 100,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 14, stiffness: 180, mass: 0.15 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Secondary parallax for text/icon content
  const textX = useSpring(useMotionValue(0), { damping: 12, stiffness: 220, mass: 0.1 });
  const textY = useSpring(useMotionValue(0), { damping: 12, stiffness: 220, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < magneticRadius) {
      // Pull toward cursor
      const pullX = distanceX * magneticStrength;
      const pullY = distanceY * magneticStrength;
      x.set(pullX);
      y.set(pullY);
      textX.set(pullX * 0.4);
      textY.set(pullY * 0.4);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    textX.set(0);
    textY.set(0);
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: smoothX,
        y: smoothY,
      }}
      className="inline-block"
    >
      <motion.div
        style={{
          x: textX,
          y: textY,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        id={id}
        onClick={onClick}
        className={`inline-block ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <div id={id} onClick={onClick} className={`inline-block ${className}`}>
      {content}
    </div>
  );
}
