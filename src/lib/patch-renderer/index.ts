export { drawShapePath, getShapeLabel, getSizeScale } from "./shapes";
export type { PatchShape } from "./types";

export {
  renderFabricTexture,
  applyNoiseOverlay,
  getMaterialLabel,
  getMaterialPrice,
} from "./textures";
export type { PatchMaterial } from "./types";

export {
  drawBorder,
  drawInnerStitch,
  drawShadow,
  getBorderLabel,
  getBorderPrice,
} from "./borders";
export type { PatchBorder } from "./types";

export { extractColors, calculatePrice } from "./colors";
export type { ExtractedColor, PatchConfig, MockupAction } from "./types";

import { drawShapePath } from "./shapes";
import { renderFabricTexture } from "./textures";
import { drawBorder, drawInnerStitch, drawShadow } from "./borders";
import type { PatchShape, PatchBorder, PatchMaterial } from "./types";

/**
 * Vollständiger Patch-Render: Zeichnet einen Patch inklusive
 * Upload-Bild, Stofftextur, Rand, Ziernaht und Schlagschatten.
 */
export function renderFullPatch(
  ctx: CanvasRenderingContext2D,
  canvasW: number,
  canvasH: number,
  params: {
    image: HTMLImageElement | HTMLCanvasElement | null;
    shape: PatchShape;
    border: PatchBorder;
    material: PatchMaterial;
    sizeCm: number;
    showLabel?: boolean;
  },
): void {
  const cx = canvasW / 2;
  const cy = canvasH / 2;

  // Radius basierend auf Größe
  const sizeScale =
    params.sizeCm <= 4 ? 0.5 :
    params.sizeCm <= 6 ? 0.65 :
    params.sizeCm <= 8 ? 0.82 :
    params.sizeCm <= 10 ? 1.0 : 1.15;
  const r = Math.min(canvasW, canvasH) * 0.38 * sizeScale;

  ctx.clearRect(0, 0, canvasW, canvasH);

  // 1. Schlagschatten
  drawShadow(ctx, cx, cy, r, params.shape);

  // 2. Image + Stoff (geclipt)
  ctx.save();
  drawShapePath(ctx, cx, cy, r, params.shape);
  ctx.clip();

  if (params.image) {
    // Upload-Bild proportional einpassen
    const scale = Math.max(
      (r * 2) / params.image.width,
      (r * 1.8) / params.image.height,
    );
    ctx.drawImage(
      params.image,
      cx - (params.image.width * scale) / 2,
      cy - (params.image.height * scale) / 2,
      params.image.width * scale,
      params.image.height * scale,
    );
  } else {
    // Fallback: sanfter Farbverlauf
    const grad = ctx.createRadialGradient(
      cx - r * 0.2, cy - r * 0.2, 0, cx, cy, r,
    );
    grad.addColorStop(0, "#d97757");
    grad.addColorStop(0.3, "#8A6A3F");
    grad.addColorStop(0.6, "#4A6B4A");
    grad.addColorStop(1, "#2D2823");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvasW, canvasH);
  }

  ctx.restore();

  // 3. Stoff-Noise-Overlay (nur innerhalb der Form)
  ctx.save();
  drawShapePath(ctx, cx, cy, r, params.shape);
  ctx.clip();
  renderFabricTexture(ctx, canvasW, canvasH, params.material);
  ctx.restore();

  // 4. Äußerer Rand
  drawBorder(ctx, cx, cy, r, params.shape, params.border);

  // 5. Innere Ziernaht
  drawInnerStitch(ctx, cx, cy, r, params.shape);

  // 6. Label (optional)
  if (params.showLabel) {
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(`${params.sizeCm} cm · ${params.material}`, cx, canvasH - 8);
  }
}
