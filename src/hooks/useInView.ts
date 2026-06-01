"use client";

import { useRef, useState, useEffect } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Intersection Observer Hook — detectable, wenn ein Element sichtbar wird.
 *
 * @example
 * ```tsx
 * const { ref, isInView } = useInView({ threshold: 0.2 });
 * return <div ref={ref}>{isInView ? "sichtbar" : "versteckt"}</div>;
 * ```
 */
export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.2, rootMargin = "0px", once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
