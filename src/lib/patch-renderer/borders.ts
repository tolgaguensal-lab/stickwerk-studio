import type { PatchBorder } from "./types";
import { drawShapePath } from "./shapes";
import type { PatchShape } from "./types";

interface BorderStyle {
  stroke: string;
  width: number;
  dash: number[];
  label: string;
}

const BORDER_STYLES: Record<PatchBorder, BorderStyle> = {
  merrow: { stroke: "#C8A880", width: 3.5, dash: [4, 3], label: "Merrow-Rand" },
  standard: { stroke: "#A09080", width: 2, dash: [3, 2], label: "Standard" },
  zigzag: { stroke: "#A09080", width: 2.5, dash: [6, 3], label: "Zickzack" },
  heat_seal: { stroke: "#4A3A2A", width: 4, dash: [], label: "Heat-Seal" },
  none: { stroke: "transparent", width: 0, dash: [], label: "Kein Rand" },
};

/** Zeichnet den Rand (Edge) um eine Patch-Form */
export function drawBorder(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  shape: PatchShape,
  border: PatchBorder,
): void {
  const style = BORDER_STYLES[border];
  if (border === "none") return;

  ctx.save();
  drawShapePath(ctx, cx, cy, r, shape);
  ctx.strokeStyle = style.stroke;
  ctx.lineWidth = style.width;
  if (style.dash.length > 0) {
    ctx.setLineDash(style.dash);
    ctx.lineDashOffset = Date.now() * 0.05; // subtile Animation (wird je Frame aktualisiert)
  }
  ctx.stroke();
  ctx.restore();
}

/** Zeichnet die innere Ziernaht */
export function drawInnerStitch(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  shape: PatchShape,
): void {
  ctx.save();
  drawShapePath(ctx, cx, cy, r * 0.92, shape);
  ctx.strokeStyle = "rgba(180, 160, 130, 0.45)";
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 4]);
  ctx.stroke();
  ctx.restore();
}

/** Zeichnet Schlagschatten */
export function drawShadow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  shape: PatchShape,
): void {
  ctx.save();
  drawShapePath(ctx, cx, cy + 4, r, shape);
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.shadowColor = "rgba(30, 20, 10, 0.3)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 3;
  ctx.fill();
  ctx.restore();
}

/** Gibt den Anzeigenamen eines Rand-Typs zurück */
export function getBorderLabel(border: PatchBorder): string {
  return BORDER_STYLES[border].label;
}

/** Gibt den Preisaufschlag für einen Rand-Typ zurück */
export function getBorderPrice(border: PatchBorder): number {
  const prices: Record<PatchBorder, number> = {
    merrow: 1.5,
    standard: 0,
    zigzag: 1.0,
    heat_seal: 2.0,
    none: -0.5,
  };
  return prices[border];
}
