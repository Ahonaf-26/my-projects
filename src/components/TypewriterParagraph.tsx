import { useState, useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { RotateCcw } from "lucide-react";

interface TypewriterParagraphProps {
  story1: string;
  story2: string;
  typingSpeed?: number;
}

export function TypewriterParagraph({
  story1,
  story2,
  typingSpeed = 26,
}: TypewriterParagraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [isTyping1, setIsTyping1] = useState(false);
  const [isTyping2, setIsTyping2] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [key, setKey] = useState(0); // for manual replay

  useEffect(() => {
    if (!isInView) return;

    let timeoutId: NodeJS.Timeout;
    let isCancelled = false;

    setText1("");
    setText2("");
    setIsCompleted(false);
    setIsTyping1(true);
    setIsTyping2(false);

    let currentIndex1 = 0;
    let currentIndex2 = 0;

    const typeStory1 = () => {
      if (isCancelled) return;
      if (currentIndex1 < story1.length) {
        currentIndex1++;
        setText1(story1.slice(0, currentIndex1));

        const char = story1[currentIndex1 - 1];
        const isPause = [",", ".", "—", "-", ";"].includes(char);
        const delay = isPause ? typingSpeed * 3.5 : typingSpeed + Math.random() * 14;

        timeoutId = setTimeout(typeStory1, delay);
      } else {
        setIsTyping1(false);
        setIsTyping2(true);
        // Short pause between story 1 and story 2
        timeoutId = setTimeout(typeStory2, 350);
      }
    };

    const typeStory2 = () => {
      if (isCancelled) return;
      if (currentIndex2 < story2.length) {
        currentIndex2++;
        setText2(story2.slice(0, currentIndex2));

        const char = story2[currentIndex2 - 1];
        const isPause = [",", ".", "—", "-", ";", "?"].includes(char);
        const delay = isPause ? typingSpeed * 3.2 : typingSpeed + Math.random() * 12;

        timeoutId = setTimeout(typeStory2, delay);
      } else {
        setIsTyping2(false);
        setIsCompleted(true);
      }
    };

    // Initial short delay before typing begins once in view
    timeoutId = setTimeout(typeStory1, 200);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [isInView, story1, story2, typingSpeed, key]);

  const handleSkipOrReplay = () => {
    if (isCompleted) {
      // Replay
      setKey((prev) => prev + 1);
    } else {
      // Instantly finish
      setText1(story1);
      setText2(story2);
      setIsTyping1(false);
      setIsTyping2(false);
      setIsCompleted(true);
    }
  };

  return (
    <div ref={containerRef} className="space-y-6 select-text relative">
      {/* Story 1 - Italic quote style */}
      <p
        id="about-story-1"
        className="text-[#242320] text-base sm:text-lg md:text-xl font-light leading-[1.75] italic min-h-[4rem]"
      >
        <span className="opacity-70 not-italic font-serif mr-1">«</span>
        <span>{text1}</span>
        {isTyping1 && (
          <span
            aria-hidden="true"
            className="inline-block ml-1 w-0.5 h-4 sm:h-5 bg-[#0b0b0b] animate-pulse align-middle"
          />
        )}
        {(isTyping2 || isCompleted) && (
          <span className="opacity-70 not-italic font-serif ml-1">»</span>
        )}
      </p>

      {/* Story 2 - Standard editorial body style */}
      <p
        id="about-story-2"
        className="text-[#45433d] not-italic font-normal text-base sm:text-lg leading-[1.75] min-h-[4rem]"
      >
        <span>{text2}</span>
        {isTyping2 && (
          <span
            aria-hidden="true"
            className="inline-block ml-1 w-0.5 h-4 sm:h-5 bg-[#d9ff57] animate-pulse align-middle border border-[#0b0b0b]/20"
          />
        )}
      </p>

      {/* Interactive Replay / Skip Helper */}
      <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-[#77746c]">
        <button
          type="button"
          onClick={handleSkipOrReplay}
          className="inline-flex items-center gap-1.5 hover:text-[#0b0b0b] transition-colors py-1 px-2.5 rounded-md hover:bg-[#e4e2d9] cursor-pointer"
          title={isCompleted ? "Replay typing effect" : "Click to display all text"}
        >
          <RotateCcw className="w-3 h-3" />
          <span>{isCompleted ? "Replay typing" : "Skip animation"}</span>
        </button>

        {!isCompleted && (
          <span className="text-[10px] uppercase tracking-wider opacity-60">
            Typing thoughts...
          </span>
        )}
      </div>
    </div>
  );
}
