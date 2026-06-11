export type PatchShape = "circle" | "shield" | "rectangle" | "diamond" | "oval";
export type PatchBorder = "merrow" | "standard" | "zigzag" | "heat_seal" | "none";
export type PatchMaterial = "twill" | "leather" | "denim" | "canvas" | "felt" | "reflective";

export interface PatchConfig {
  imageData: ImageData | null;
  imageUrl: string | null;
  shape: PatchShape;
  border: PatchBorder;
  size: number; // in cm
  material: PatchMaterial;
  colors: number; // 1–12
  quantity: number;
  express: "none" | "express" | "super_express";
}

export interface ExtractedColor {
  r: number;
  g: number;
  b: number;
  hex: string;
}

export type MockupAction =
  | { type: "SET_IMAGE"; imageData: ImageData | null; imageUrl: string | null }
  | { type: "SET_SHAPE"; shape: PatchShape }
  | { type: "SET_BORDER"; border: PatchBorder }
  | { type: "SET_SIZE"; size: number }
  | { type: "SET_MATERIAL"; material: PatchMaterial }
  | { type: "SET_COLORS"; colors: number }
  | { type: "SET_QUANTITY"; quantity: number }
  | { type: "SET_EXPRESS"; express: "none" | "express" | "super_express" }
  | { type: "RESET" };
