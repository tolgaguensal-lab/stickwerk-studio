import type { PatchShape } from "./types";

/** Zeichnet den Pfad einer Patch-Form auf den Canvas-Kontext. */
export function drawShapePath(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  shape: PatchShape,
): void {
  ctx.beginPath();
  switch (shape) {
    case "circle":
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      break;
    case "shield":
      ctx.moveTo(cx, cy - r * 0.9);
      ctx.lineTo(cx + r * 0.85, cy - r * 0.3);
      ctx.lineTo(cx + r * 0.75, cy + r * 0.7);
      ctx.lineTo(cx, cy + r * 0.9);
      ctx.lineTo(cx - r * 0.75, cy + r * 0.7);
      ctx.lineTo(cx - r * 0.85, cy - r * 0.3);
      ctx.closePath();
      break;
    case "rectangle":
      ctx.rect(cx - r, cy - r * 0.7, r * 2, r * 1.4);
      break;
    case "diamond":
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx + r * 0.7, cy);
      ctx.lineTo(cx, cy + r);
      ctx.lineTo(cx - r * 0.7, cy);
      ctx.closePath();
      break;
    case "oval":
      ctx.ellipse(cx, cy, r, r * 0.6, 0, 0, Math.PI * 2);
      break;
  }
}

/** Gibt den Anzeigenamen einer Form zurück */
export function getShapeLabel(shape: PatchShape): string {
  const labels: Record<PatchShape, string> = {
    circle: "Rund",
    shield: "Schild",
    rectangle: "Rechteckig",
    diamond: "Raute",
    oval: "Oval",
  };
  return labels[shape];
}

/** Gibt Größen-Faktor für die Darstellung zurück (cm → Canvas-Skalierung) */
export function getSizeScale(sizeCm: number): number {
  if (sizeCm <= 4) return 0.5;
  if (sizeCm <= 6) return 0.65;
  if (sizeCm <= 8) return 0.82;
  if (sizeCm <= 10) return 1.0;
  return 1.15;
}
