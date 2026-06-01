"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface StaggerContainerProps {
  children: React.ReactNode;
  /** Verzögerung zwischen Kindern in Sekunden */
  staggerDelay?: number;
  className?: string;
}

/**
 * Container, der seine Kinder gestaffelt einblendet.
 * Kinder müssen als eigenständige DOM-Elemente vorliegen
 * (keine Fragmente, keine Text-Only-Nodes).
 *
 * @example
 * ```tsx
 * <StaggerContainer>
 *   <div>Erstes Element</div>
 *   <div>Zweites Element</div>
 * </StaggerContainer>
 * ```
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  className,
}: StaggerContainerProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Ein Kind innerhalb eines StaggerContainers.
 * Wird automatisch gestaffelt animiert.
 */
export function StaggerItem({
  children,
  className,
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
