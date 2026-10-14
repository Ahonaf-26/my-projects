import { useState, useEffect, useRef } from "react";

const PHILOSOPHY_TEXT =
  "Functional utility shouldn't come at the cost of soul. Whether it's a web application, an interactive utility, or a trivia engine, the goal is always clarity, responsiveness, and aesthetic precision.";

export function IdeaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Typewriter effect triggered when section becomes visible
  useEffect(() => {
    if (!isVisible) return;

    let timeoutId: NodeJS.Timeout;
    let isCancelled = false;
    let charIndex = 0;

    setTypedText("");
    setIsComplete(false);

    // Initial slight delay so headline animates in first
    timeoutId = setTimeout(() => {
      setIsTyping(true);

      const typeNextChar = () => {
        if (isCancelled) return;

        if (charIndex < PHILOSOPHY_TEXT.length) {
          charIndex++;
          setTypedText(PHILOSOPHY_TEXT.slice(0, charIndex));

          const char = PHILOSOPHY_TEXT[charIndex - 1];
          const isPause = [",", ".", "—", "-", ";"].includes(char);
          const delay = isPause ? 85 : 22 + Math.random() * 12;

          timeoutId = setTimeout(typeNextChar, delay);
        } else {
          setIsTyping(false);
          setIsComplete(true);
        }
      };

      typeNextChar();
    }, 450);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [isVisible]);

  return (
    <section
      id="the-idea"
      ref={sectionRef}
      className="relative min-h-[55vh] sm:min-h-[65vh] w-full flex flex-col justify-center px-6 sm:px-10 md:px-12 max-w-7xl mx-auto border-t border-white/5 py-20 sm:py-28 md:py-36"
    >
      <div className="max-w-4xl">
        {/* Eyebrow Label */}
        <div
          id="idea-eyebrow"
          className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-[#d9ff57] uppercase mb-6 sm:mb-8"
        >
          The Idea
        </div>

        {/* Large Statement with Lime Accents */}
        <h2
          id="idea-statement"
          className={`font-sans font-bold text-[clamp(2.4rem,6vw,5.5rem)] leading-[1] tracking-tight text-[#f5f5f0] transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          I like making{" "}
          <span className="text-[#d9ff57] italic">
            useful
          </span>{" "}
          things feel{" "}
          <span className="text-[#d9ff57] italic font-black">
            interesting.
          </span>
        </h2>

        {/* Supporting Philosophy Note with Typewriter Effect */}
        <p
          id="idea-philosophy-text"
          className={`mt-8 sm:mt-10 max-w-xl text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed font-light min-h-[4.5rem] transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span>{typedText}</span>
          {isTyping && (
            <span
              aria-hidden="true"
              className="inline-block ml-1.5 w-0.5 h-4 sm:h-5 bg-[#d9ff57] shadow-[0_0_8px_rgba(217,255,87,0.8)] animate-pulse align-middle"
            />
          )}
          {!isTyping && !isComplete && isVisible && (
            <span
              aria-hidden="true"
              className="inline-block ml-1.5 w-0.5 h-4 sm:h-5 bg-white/40 animate-pulse align-middle"
            />
          )}
        </p>
      </div>
    </section>
  );
}

