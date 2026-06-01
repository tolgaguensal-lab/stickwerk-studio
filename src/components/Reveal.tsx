"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

type Variant = "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right";

interface RevealProps {
  children: React.ReactNode;
  /** Animations-Variante */
  variant?: Variant;
  /** Verzögerung in Sekunden */
  delay?: number;
  /** Animationsdauer in Sekunden */
  duration?: number;
  className?: string;
  /** Schwellwert für Sichtbarkeit (0–1) */
  threshold?: number;
}

const variants: Record<Variant, { hidden: Record<string, number | string>; visible: Record<string, number | string> }> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
};

/**
 * Einblend-Animation bei Scroll-Insichtkommen.
 * Nutzt Framer Motion + Intersection Observer.
 *
 * @example
 * ```tsx
 * <Reveal variant="fade-up" delay={0.2}>
 *   <h2>Überschrift</h2>
 * </Reveal>
 * ```
 */
export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  className,
  threshold = 0.15,
}: RevealProps) {
  const { ref, isInView } = useInView({ threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: variants[variant].hidden,
        visible: {
          ...variants[variant].visible,
          transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
