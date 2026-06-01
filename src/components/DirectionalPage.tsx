"use client";

import { ViewTransition } from "react";

/**
 * Wraps page content mit View Transition API für directionale Navigation.
 *
 * - `nav-forward`: Slide von rechts (neue Seite schiebt rein)
 * - `nav-back`:   Slide von links (zurück-Seite schiebt rein)
 * - default:      Keine Animation (initial load, undefined types)
 *
 * CSS-Pseudoelemente in globals.css definiert.
 */
export function DirectionalPage({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
