"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
}

/**
 * Animiert Text Wort-für-Wort von unten (Slide-up).
 * Jedes Wort wird einzeln sichtbar — gibt Headlines eine editoriale,
 * hochwertige Dynamik.
 *
 * @example
 * ```tsx
 * <AnimatedText text="Fäden, die Marken sichtbar machen" as="h1" />
 * ```
 */
export function AnimatedText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
}: AnimatedTextProps) {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.05,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
