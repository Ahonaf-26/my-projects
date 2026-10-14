import { useEffect, useRef } from "react";
import { useScroll, useSpring } from "motion/react";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleVal: number;
  color: string;
}

interface ParticleNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export function GlobalCosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
    px: 0,
    py: 0,
    active: false,
  });

  const scrollOffsetRef = useRef(0);
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 85,
    damping: 24,
    mass: 0.4,
  });

  useEffect(() => {
    const unsubscribe = smoothScrollY.on("change", (latest) => {
      scrollOffsetRef.current = latest;
    });
    return () => unsubscribe();
  }, [smoothScrollY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = Math.max(1, window.innerWidth || 300));
    let height = (canvas.height = Math.max(1, window.innerHeight || 300));

    // Dynamic density based on screen size
    const isMobile = width < 768;
    const starCount = isMobile ? 80 : 180;
    const stars: Star[] = [];
    const starColors = ["#ffffff", "#f5f5f0", "#d9ff57", "#c2d9ff", "#e0e7ff"];

    for (let i = 0; i < starCount; i++) {
      const isAccent = Math.random() < 0.16;
      const baseAlpha = Math.random() * 0.65 + 0.15;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.7 + 0.4,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: Math.random() * 0.025 + 0.01,
        twinkleVal: Math.random() * Math.PI * 2,
        color: isAccent ? "#d9ff57" : starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Interactive Constellation mesh nodes across full page
    const nodeCount = isMobile ? 32 : 65;
    const nodes: ParticleNode[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.4 + 0.15,
        color: Math.random() < 0.35 ? "#d9ff57" : "#ffffff",
      });
    }

    // Shooting stars system
    const shootingStars: ShootingStar[] = [];
    let nextShootingStar = 120;

    const handleMouseMove = (e: MouseEvent) => {
      const w = Math.max(1, width);
      const h = Math.max(1, height);
      mouseRef.current.px = e.clientX;
      mouseRef.current.py = e.clientY;
      mouseRef.current.targetX = Math.min(1, Math.max(0, e.clientX / w));
      mouseRef.current.targetY = Math.min(1, Math.max(0, e.clientY / h));
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = Math.max(1, window.innerWidth || 300);
      height = canvas.height = Math.max(1, window.innerHeight || 300);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const render = () => {
      if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      const targetX = Number.isFinite(mouseRef.current.targetX) ? mouseRef.current.targetX : 0.5;
      const targetY = Number.isFinite(mouseRef.current.targetY) ? mouseRef.current.targetY : 0.5;
      const currentX = Number.isFinite(mouseRef.current.x) ? mouseRef.current.x : 0.5;
      const currentY = Number.isFinite(mouseRef.current.y) ? mouseRef.current.y : 0.5;

      mouseRef.current.x = currentX + (targetX - currentX) * 0.05;
      mouseRef.current.y = currentY + (targetY - currentY) * 0.05;

      const rawScroll = scrollOffsetRef.current;
      const currentScroll = Number.isFinite(rawScroll) ? rawScroll : 0;
      const safeHeight = Math.max(10, height);
      const safeWidth = Math.max(10, width);

      // 1. Soft Dynamic Nebula Glow across viewport
      const nebCenterY = ((safeHeight * 0.35 - (currentScroll * 0.08) % safeHeight) + safeHeight) % safeHeight;
      const safeNebCenterY = Number.isFinite(nebCenterY) ? nebCenterY : safeHeight * 0.35;
      const nebRadius1 = Math.max(1, safeWidth * 0.6);

      if (Number.isFinite(safeNebCenterY) && Number.isFinite(nebRadius1)) {
        try {
          const neb = ctx.createRadialGradient(
            safeWidth * 0.8,
            safeNebCenterY,
            0,
            safeWidth * 0.8,
            safeNebCenterY,
            nebRadius1
          );
          neb.addColorStop(0, "rgba(217, 255, 87, 0.025)");
          neb.addColorStop(0.5, "rgba(70, 110, 255, 0.015)");
          neb.addColorStop(1, "transparent");
          ctx.fillStyle = neb;
          ctx.fillRect(0, 0, width, height);
        } catch (e) {
          // Graceful fallback
        }
      }

      // Secondary ambient glow bottom-left
      const neb2Y = ((safeHeight * 0.75 - (currentScroll * 0.05) % safeHeight) + safeHeight) % safeHeight;
      const safeNeb2Y = Number.isFinite(neb2Y) ? neb2Y : safeHeight * 0.75;
      const nebRadius2 = Math.max(1, safeWidth * 0.5);

      if (Number.isFinite(safeNeb2Y) && Number.isFinite(nebRadius2)) {
        try {
          const neb2 = ctx.createRadialGradient(
            safeWidth * 0.2,
            safeNeb2Y,
            0,
            safeWidth * 0.2,
            safeNeb2Y,
            nebRadius2
          );
          neb2.addColorStop(0, "rgba(217, 255, 87, 0.018)");
          neb2.addColorStop(1, "transparent");
          ctx.fillStyle = neb2;
          ctx.fillRect(0, 0, width, height);
        } catch (e) {
          // Graceful fallback
        }
      }

      // 2. Stars with scroll parallax and subtle mouse reaction
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.twinkleVal += s.twinkleSpeed;
        const currentAlpha = Math.max(0.08, s.baseAlpha + Math.sin(s.twinkleVal) * 0.3);

        const mouseParallaxX = (mouseRef.current.x - 0.5) * s.size * 25;
        const scrollParallaxY = (currentScroll * (s.size * 0.25)) % height;
        let yPos = s.y - scrollParallaxY;
        if (yPos < 0) yPos += height;

        const xPos = (s.x - mouseParallaxX + width) % width;

        ctx.beginPath();
        ctx.arc(xPos, yPos, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // Cross flare for larger radiant stars
        if (s.size > 1.6 && currentAlpha > 0.5) {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(xPos - s.size * 2.2, yPos);
          ctx.lineTo(xPos + s.size * 2.2, yPos);
          ctx.moveTo(xPos, yPos - s.size * 2.2);
          ctx.lineTo(xPos, yPos + s.size * 2.2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // 3. Interactive Constellation Mesh across page
      const maxConnectDist = isMobile ? 95 : 140;
      const mouseRange = isMobile ? 120 : 180;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Drift
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        // Mouse interaction (repel / attract smoothly)
        if (mouseRef.current.active) {
          const dx = mouseRef.current.px - node.x;
          const dy = mouseRef.current.py - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRange) {
            const force = (1 - dist / mouseRange) * 0.85;
            node.x -= (dx / (dist || 1)) * force * 2.5;
            node.y -= (dy / (dist || 1)) * force * 2.5;
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.alpha;
        ctx.fill();

        // Draw connection lines to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = node.x - n2.x;
          const dy = node.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.16;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle =
              node.color === "#d9ff57" || n2.color === "#d9ff57"
                ? "rgba(217, 255, 87, 0.28)"
                : "rgba(255, 255, 255, 0.12)";
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // 4. Shooting Stars
      nextShootingStar--;
      if (nextShootingStar <= 0 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * width * 0.8 + width * 0.15,
          y: Math.random() * height * 0.5,
          length: Math.random() * 100 + 80,
          speed: Math.random() * 9 + 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          alpha: 1,
          life: 0,
          maxLife: 48,
        });
        nextShootingStar = Math.floor(Math.random() * 180) + 100;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life++;
        ss.x -= Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha = Math.max(0, 1 - ss.life / ss.maxLife);

        const tailX = ss.x + Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        if (
          Number.isFinite(ss.x) &&
          Number.isFinite(ss.y) &&
          Number.isFinite(tailX) &&
          Number.isFinite(tailY)
        ) {
          try {
            const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
            grad.addColorStop(0, `rgba(217, 255, 87, ${Math.max(0, Math.min(1, ss.alpha * 0.95))})`);
            grad.addColorStop(0.35, `rgba(255, 255, 255, ${Math.max(0, Math.min(1, ss.alpha * 0.6))})`);
            grad.addColorStop(1, "rgba(255, 255, 255, 0)");

            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();
          } catch (e) {
            // Guard against any canvas gradient exception
          }
        }

        if (ss.life >= ss.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      id="global-cosmic-background"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 select-none overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
