# 🎬 Premium Animation Konzept — Stickwerk-Studio

> **Subtile Handwerks-Luxus-Ästhetik** — Animationen, die die Qualität der Arbeit widerspiegeln: präzise, ruhig, wertig.
>
> Ziel: 95+ Lighthouse, 60fps, kein Over-Engineering.

---

## 1. Animations-Philosophie

Jede Animation dient einem Zweck. Drei Prinzipien:

```
1. REDUZIERT   → Weniger ist mehr. Nur animieren, was Aufmerksamkeit lenkt oder Freude macht.
2. PRÄZISE     → Die Animationen fühlen sich natürlich an (Cubic-Bezier, kein Linear).
3. WERTIG      → Langsamer als UX-Standard. Premium fühlt sich bedacht an, nicht gehetzt.
```

### Timing-System (Motion Tokens)

| Token | Dauer | Easing | Verwendung |
|-------|-------|--------|------------|
| `instant` | 100ms | ease-out | Micro-Feedback (Hover, Focus) |
| `fast` | 200ms | ease-out | Button-Klick, Tab-Wechsel |
| `normal` | 400ms | ease-out | Card-Entrance, Page-Transition |
| `slow` | 600ms | ease-in-out | Hero-Reveal, Scroll-Storytelling |
| `lazy` | 800ms+ | ease-out | Staggered-Reveals, Lazy-Load |

---

## 2. Architektur-Übersicht

```
Animation-System
├── Hooks
│   ├── useInView              → Intersection Observer (wiederverwendbar)
│   ├── useRevealAnimation     → vordefinierte Entrance-Varianten
│   └── useStaggerAnimation    → gestaffelte Kinder-Animationen
├── Components
│   ├── Reveal                 → Einblenden bei Scroll (slide-up, fade-in, scale-in)
│   ├── StaggerContainer       → Container mit gestaffelten Kindern
│   ├── AnimatedText           → Character/Word-Animationen (Headlines)
│   ├── ParallaxImage          → Parallax bei Scroll
│   └── PageTransition        → View Transition Wrapper für Routen
├── Providers
│   └── AnimationProvider      → Globales Reduced-Motion-Handling
└── Tokens
    └── motion.ts              → Zentrale Motion-Config (Dauer, Easing, Varianten)
```

---

## 3. View Transitions — Page Transitions (Native Browser API)

Nutzt die **React View Transition API** (in Next.js 16 nativ verfügbar).

### Setup in `src/app/layout.tsx`

```tsx
// Kein Provider nötig — ViewTransition ist in React 19+/Next.js 16 built-in
```

### Directional Navigation mit Transition Types

```tsx
// src/lib/view-transition.ts
import { addTransitionType } from "react";

export function navigateWithTransition(url: string, direction: "forward" | "back") {
  startTransition(() => {
    addTransitionType(direction === "forward" ? "nav-forward" : "nav-back");
    router.push(url);
  });
}
```

### CSS: `src/app/globals.css`

```css
/* === VIEW TRANSITIONS === */
::view-transition-old(nav-forward) {
  animation: 300ms ease-out both slide-to-left;
}
::view-transition-new(nav-forward) {
  animation: 300ms ease-out both slide-from-right;
}
::view-transition-old(nav-back) {
  animation: 300ms ease-out both slide-to-right;
}
::view-transition-new(nav-back) {
  animation: 300ms ease-out both slide-from-left;
}

@keyframes slide-to-left {
  to { transform: translateX(-20%); opacity: 0; }
}
@keyframes slide-from-right {
  from { transform: translateX(20%); opacity: 0; }
}
@keyframes slide-to-right {
  to { transform: translateX(20%); opacity: 0; }
}
@keyframes slide-from-left {
  from { transform: translateX(-20%); opacity: 0; }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

### Anwendung in `src/app/page.tsx`

```tsx
import { ViewTransition, startTransition } from "react";

// — Oder als Layout-Wrapper —
export function DirectionalPage({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
```

---

## 4. Scroll-Reveal System (Framer Motion)

Framer Motion ist bereits installiert (`^12.40.0`). Wir bauen ein modulares Reveal-System.

### `src/hooks/useInView.ts`

```ts
import { useRef, useState, useEffect } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

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
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
```

### `src/components/Reveal.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

type Variant = "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right";

interface RevealProps {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
}

const variants: Record<Variant, { hidden: object; visible: object }> = {
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

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  className,
}: RevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const v = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: v.hidden,
        visible: { ...v.visible, transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### `src/components/StaggerContainer.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

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

// StaggerItem — als Child von StaggerContainer
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
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
```

### `src/components/AnimatedText.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
}

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
```

---

## 5. Micro-Interactions (Framer Motion)

### Button-Erweiterung (`src/components/ui/button.tsx`)

```tsx
// Bestehende Button-Komponente erweitern:
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  {children}
</motion.button>
```

### Card-Interaktionen (`src/components/ui/card.tsx`)

```tsx
<motion.div
  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(28,24,20,0.08)" }}
  transition={{ duration: 0.2, ease: "easeOut" }}
>
  {children}
</motion.div>
```

### Navbar-Verfeinerung

Bereits vorhanden (Scroll-Transparenz/Shadow). Optional:
- **Page-Transition auf Logo-Klick** + transition type
- **Active-Link-Indikator** mit `layoutId` für smooth Moves
- **Mobile Sheet-Öffnung** mit Slide-Animation (bereits vorhanden via Sheet-Komponente)

---

## 6. Spezifische Komponenten-Upgrades

| Komponente | Heute | Neu | Priorität |
|-----------|-------|-----|-----------|
| **Hero (page.tsx)** | Kein Entrance | Staggered Text-Reveal + CTA | 🔴 Hoch |
| **Leistungen-Grid** | Direkt sichtbar | `StaggerContainer` + Cards | 🔴 Hoch |
| **Prozess-Stufen** | Statisch | Horizontal-Scroll-Reveal | 🟡 Mittel |
| **Referenzen** | Keine | Carousel mit Auto-Scroll (später) | 🟢 Niedrig |
| **CTA-Sektionen** | Statisch | Parallax-Hintergrund + Reveal | 🟡 Mittel |
| **PatchCalculator** | Kein Entrance | Step-Transition-Animationen | 🟡 Mittel |
| **Footer** | Statisch | Reveal beim Scrollen | 🟢 Niedrig |
| **Admin-Bereich** | — | Keine Animationen (Produktivität) | — |

### Hero (page.tsx) — Detailliert

```tsx
// Aktuelle Zeilen ~12-15 ersetzen durch gestaffeltes Reveal:
<div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
  <div className="text-center max-w-4xl px-4 z-10">
    <Reveal variant="fade-up" delay={0.1}>
      <span className="...">Maschinenstickerei & Custom Patches</span>
    </Reveal>
    <Reveal variant="fade-up" delay={0.2}>
      <h1 className="...">Fäden, die Marken sichtbar machen</h1>
    </Reveal>
    <Reveal variant="fade-up" delay={0.35}>
      <p className="...">Professionelle Stickerei für Unternehmen...</p>
    </Reveal>
    <Reveal variant="fade-up" delay={0.5}>
      <div className="flex gap-4 justify-center">
        <Button>Konfigurator starten</Button>
        <Button variant="outline">Mehr erfahren</Button>
      </div>
    </Reveal>
  </div>
</div>
```

---

## 7. Scene-Komponente aufwerten

Aktuelle `Scene.tsx` ist nur ein Gradient. Upgrade zu einem atmosphärischen Hintergrund:

```tsx
"use client";

import { useEffect, useRef } from "react";

export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Subtile Floating-Noise-Textur (Canvas 2D)
    // — Kein WebGL, keine große Lib, < 1KB JS —

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let opacity = 0.03;
    const particles: { x: number; y: number; vx: number; vy: number }[] = [];

    // Mini-Partikel initialisieren — extrem subtil
    for (let i = 0; i < 12; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(138, 106, 63, ${opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
      />
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-background via-background to-surface-muted/50" />
    </>
  );
}
```

---

## 8. Performance-Budget

| Asset | Budget | Strategie |
|-------|--------|-----------|
| **LCP** | < 2.5s | Framer Motion tree-shaked, CSS-VTs statt JS |
| **CLS** | < 0.1 | Kein Layout-Shift durch Animationen |
| **INP** | < 200ms | Micro-Interactions via CSS + Framer spring |
| **JS** | < 50ms blocking | Alle Animationen lazy-loaded |
| **First Load** | < 150KB JS | `next/dynamic` für Hero-Carousel |

### Lazy Loading Strategie

```tsx
// Nur laden, wenn sichtbar
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-background" />,
});

const AnimatedText = dynamic(() => import("@/components/AnimatedText"), {
  ssr: false,
});
```

### Reduced Motion

```tsx
// src/hooks/useReducedMotion.ts
import { useReducedMotion } from "framer-motion"; // built-in!

// Nutzung:
const prefersReducedMotion = useReducedMotion();
if (prefersReducedMotion) {
  // Skip alle Animationen, zeige statische Version
}
```

```css
/* globals.css — bereits automatisch via Framer Motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Umsetzungs-Plan (Phased Rollout)

### Phase 1 — Foundation (2-3h)
```
hooks/useInView.ts
components/Reveal.tsx
components/StaggerContainer.tsx
globals.css → VT + Reduced Motion CSS
```

### Phase 2 — Seite (3-4h)
```
page.tsx → Hero-Reveal + StaggerContainer überall
components/AnimatedText.tsx
components/Scene.tsx → Canvas-Upgrade
```

### Phase 3 — Micro-Interactions (1-2h)
```
ui/button.tsx → scale hover/tap
ui/card.tsx → lift hover
Navbar → layoutId Indikator
```

### Phase 4 — View Transitions (1-2h)
```
layout.tsx → DirectionalPage Wrapper
lib/view-transition.ts → Helper
globals.css → Slide-Animationen
Links → addTransitionType
```

---

## 10. User-Experience-Impact

| Bereich | Vorher | Nachher |
|---------|--------|---------|
| Hero-Eindruck | 6/10 — statisch | 9/10 — kinetisch, Premium |
| Seiten-Qualität | 7/10 — gut | 9/10 — "Wow, das fühlt sich wertig an" |
| Navigation | 7/10 — Standard | 9/10 — "Die Übergänge sind butterweich" |
| Vertrauen | 7/10 — solide | 9/10 — "Hier steckt Handwerksarbeit drin" |
| Ladegefühl | 58 Lenis | Direkt (kein Scroll-JS-Overhead) |

---

## Zusammenfassung

**Kein Overengineering.** Kein WebGL-Overkill, kein schweres Drittanbieter-JS.
Nur: **Framer Motion (schon da) + View Transition API (built-in) + ein paar durchdachte Hooks.**

Das Ergebnis: Die Seite fühlt sich an wie **ein handwerklich gefertigtes Produkt** — genau wie die Stickerei selbst.
