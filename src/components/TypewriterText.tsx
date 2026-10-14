import { useState, useEffect } from "react";

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  cursorClassName?: string;
}

export function TypewriterText({
  phrases,
  typingSpeed = 50,
  deletingSpeed = 28,
  pauseDuration = 2400,
  prefix = "«",
  suffix = "»",
  className = "",
  cursorClassName = "text-[#d9ff57]",
}: TypewriterTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const currentFullText = phrases[phraseIndex % phrases.length];

    if (isWaiting) {
      const timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    } else {
      if (displayText.length < currentFullText.length) {
        const nextChar = currentFullText[displayText.length];
        // Slight variable delay for punctuation like commas and periods
        const isPunctuation = [",", ".", "!", "?"].includes(nextChar);
        const delay = isPunctuation ? typingSpeed * 3 : typingSpeed + Math.random() * 20;

        const timeout = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, delay);
        return () => clearTimeout(timeout);
      } else {
        setIsWaiting(true);
      }
    }
  }, [displayText, isDeleting, isWaiting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      <span className="opacity-70">{prefix}</span>
      <span>{displayText}</span>
      <span
        aria-hidden="true"
        className={`inline-block ml-1 font-bold animate-pulse ${cursorClassName}`}
      >
        |
      </span>
      <span className="opacity-70">{suffix}</span>
    </span>
  );
}
