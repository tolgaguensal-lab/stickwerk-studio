import type { PatchBorder, PatchShape } from "./types";
import { drawShapePath } from "./shapes";

// ─── Offline-Canvas für Stickerei-Merrow-Pattern ───

let _merrowPattern: CanvasPattern | null = null;

/** Erzeugt ein Kippmuster (diagonal gewickelter Faden) für den Merrow-Rand */
function getMerrowPattern(): CanvasPattern {
  if (_merrowPattern) return _merrowPattern;

  const size = 16;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;

  // Basis – warmer Goldton
  ctx.fillStyle = "#C8A060";
  ctx.fillRect(0, 0, size, size);

  // Diagonale Fadenlagen (45° – wie beim Merrow-Stich)
  for (let i = -size; i < size * 2; i += 3) {
    ctx.strokeStyle = i % 6 === 0 ? "#D4B070" : "#B89050";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i - size, size);
    ctx.stroke();
  }

  // Hellere Glanzlichter
  ctx.strokeStyle = "rgba(255, 230, 180, 0.25)";
  ctx.lineWidth = 0.8;
  for (let i = -size; i < size * 2; i += 4) {
    ctx.beginPath();
    ctx.moveTo(i + 1, 0);
    ctx.lineTo(i - size + 1, size);
    ctx.stroke();
  }

  // Subtile Unregelmäßigkeit (Punkte)
  for (let i = 0; i < 6; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.fillStyle = `rgba(160, 120, 70, ${0.1 + Math.random() * 0.15})`;
    ctx.beginPath();
    ctx.arc(x, y, 0.6 + Math.random() * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }

  _merrowPattern = ctx.createPattern(c, "repeat")!;
  return _merrowPattern;
}

let _standardPattern: CanvasPattern | null = null;

/** Geradstich-Muster für Standard-Rand */
function getStandardPattern(): CanvasPattern {
  if (_standardPattern) return _standardPattern;

  const size = 8;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#A09080";
  ctx.fillRect(0, 0, size, size);

  // Feine horizontale Fadenlinien
  ctx.strokeStyle = "rgba(180, 165, 145, 0.4)";
  ctx.lineWidth = 0.5;
  for (let y = 0; y < size; y += 2) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  _standardPattern = ctx.createPattern(c, "repeat")!;
  return _standardPattern;
}

let _zigzagPattern: CanvasPattern | null = null;

/** Zickzack-Stichmuster */
function getZigzagPattern(): CanvasPattern {
  if (_zigzagPattern) return _zigzagPattern;

  const size = 12;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#B09878";
  ctx.fillRect(0, 0, size, size);

  // Zickzack-Linie
  ctx.strokeStyle = "rgba(200, 175, 140, 0.7)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, 6);
  ctx.lineTo(4, 0);
  ctx.lineTo(6, 6);
  ctx.lineTo(10, 0);
  ctx.lineTo(12, 6);
  ctx.stroke();

  _zigzagPattern = ctx.createPattern(c, "repeat")!;
  return _zigzagPattern;
}

let _heatSealPattern: CanvasPattern | null = null;

/** Heat-Seal-Muster (dunkler, leicht geschmolzener Rand) */
function getHeatSealPattern(): CanvasPattern {
  if (_heatSealPattern) return _heatSealPattern;

  const size = 8;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#3A2A1A";
  ctx.fillRect(0, 0, size, size);

  // Leichte Glanzpunkte (geschmolzenes Material)
  for (let i = 0; i < 4; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.fillStyle = `rgba(80, 60, 40, ${0.2 + Math.random() * 0.3})`;
    ctx.beginPath();
    ctx.arc(x, y, 0.5 + Math.random() * 1, 0, Math.PI * 2);
    ctx.fill();
  }

  _heatSealPattern = ctx.createPattern(c, "repeat")!;
  return _heatSealPattern;
}

/** Gibt die Pattern-Breite für einen Rand-Typ zurück */
function getBorderWidth(border: PatchBorder): number {
  const widths: Record<PatchBorder, number> = {
    merrow: 5,
    standard: 3,
    zigzag: 4,
    heat_seal: 5.5,
    none: 0,
  };
  return widths[border];
}

/** Gibt die Anzahl der Stich-Lagen für einen Rand-Typ zurück */
function getBorderLayers(border: PatchBorder): number {
  const layers: Record<PatchBorder, number> = {
    merrow: 3,
    standard: 2,
    zigzag: 2,
    heat_seal: 1,
    none: 0,
  };
  return layers[border];
}

// ─── Öffentliche API ───

/** Zeichnet einen realistischen Maschinenstickerei-Rand um eine Patch-Form */
export function drawBorder(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  shape: PatchShape,
  border: PatchBorder,
): void {
  if (border === "none") return;

  const w = getBorderWidth(border);
  const layers = getBorderLayers(border);

  for (let l = 0; l < layers; l++) {
    ctx.save();
    drawShapePath(ctx, cx, cy, r + l * 1.2, shape);

    const layerWidth = w - l * 0.8;

    switch (border) {
      case "merrow": {
        // Lage 1: Basis-Füllung mit Merrow-Textur
        if (l === 0) {
          ctx.strokeStyle = getMerrowPattern();
          ctx.lineWidth = layerWidth;
          ctx.stroke();
        }
        // Lage 2: Leicht versetzte Fadenwicklung
        if (l === 1) {
          ctx.strokeStyle = "rgba(200, 160, 100, 0.5)";
          ctx.lineWidth = layerWidth * 0.6;
          ctx.setLineDash([3, 4]);
          ctx.lineDashOffset = 2;
          ctx.stroke();
        }
        // Lage 3: Glanzlicht
        if (l === 2) {
          ctx.strokeStyle = "rgba(255, 230, 180, 0.2)";
          ctx.lineWidth = 1.5;
          ctx.setLineDash([2, 6]);
          ctx.lineDashOffset = 3;
          ctx.stroke();
        }
        break;
      }
      case "standard": {
        if (l === 0) {
          ctx.strokeStyle = getStandardPattern();
          ctx.lineWidth = layerWidth;
          ctx.stroke();
        }
        if (l === 1) {
          // Feine Nahtlinie als Akzent
          ctx.strokeStyle = "rgba(150, 135, 115, 0.4)";
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 3]);
          ctx.stroke();
        }
        break;
      }
      case "zigzag": {
        if (l === 0) {
          ctx.strokeStyle = getZigzagPattern();
          ctx.lineWidth = layerWidth;
          ctx.stroke();
        }
        if (l === 1) {
          // Äußere Kontur
          ctx.strokeStyle = "rgba(180, 155, 125, 0.4)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        break;
      }
      case "heat_seal": {
        ctx.strokeStyle = getHeatSealPattern();
        ctx.lineWidth = layerWidth;
        ctx.stroke();

        // Leichter Glow (geschmolzener Rand)
        ctx.shadowColor = "rgba(80, 40, 20, 0.2)";
        ctx.shadowBlur = 4;
        ctx.strokeStyle = "rgba(60, 40, 25, 0.3)";
        ctx.lineWidth = layerWidth * 0.5;
        ctx.stroke();
        break;
      }
    }

    ctx.restore();
  }
}

/** Zeichnet die innere Ziernaht (feiner Geradstich) */
export function drawInnerStitch(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  shape: PatchShape,
): void {
  ctx.save();
  drawShapePath(ctx, cx, cy, r * 0.92, shape);
  ctx.strokeStyle = "rgba(180, 160, 130, 0.5)";
  ctx.lineWidth = 1.2;
  ctx.setLineDash([3, 4]);
  ctx.stroke();

  // Zweite, leicht versetzte Naht für Tiefe
  drawShapePath(ctx, cx, cy, r * 0.9, shape);
  ctx.strokeStyle = "rgba(160, 140, 110, 0.25)";
  ctx.lineWidth = 0.8;
  ctx.setLineDash([2, 5]);
  ctx.lineDashOffset = 1.5;
  ctx.stroke();
  ctx.restore();
}

/** Zeichnet Schlagschatten (weicher, realistischer) */
export function drawShadow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  shape: PatchShape,
): void {
  // Hauptschatten – weich und tief
  ctx.save();
  drawShapePath(ctx, cx, cy + 5, r, shape);
  ctx.fillStyle = "rgba(20, 15, 10, 0.3)";
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 4;
  ctx.fill();
  ctx.restore();

  // Zweiter, kleinerer Schatten für Tiefe
  ctx.save();
  drawShapePath(ctx, cx, cy + 3, r, shape);
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 2;
  ctx.fill();
  ctx.restore();
}

/** Gibt den Anzeigenamen eines Rand-Typs zurück */
export function getBorderLabel(border: PatchBorder): string {
  const labels: Record<PatchBorder, string> = {
    merrow: "Merrow",
    standard: "Standard",
    zigzag: "Zickzack",
    heat_seal: "Heat-Seal",
    none: "Kein Rand",
  };
  return labels[border];
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

/** Gibt eine kurze Beschreibung für das Border-Pattern zurück */
export function getBorderDescription(border: PatchBorder): string {
  const desc: Record<PatchBorder, string> = {
    merrow: "Gewickelter Merrow-Stich – der klassische Patch-Rand",
    standard: "Geradstich – sauber und dezent",
    zigzag: "Zickzack-Stich – auffällige Kante",
    heat_seal: "Heat-Seal – lasergebraunter Rand",
    none: "Ohne Rand – Rohkante",
  };
  return desc[border];
}
