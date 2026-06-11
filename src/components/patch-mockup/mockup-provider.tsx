"use client";

import React, { createContext, useContext, useReducer, useCallback, type ReactNode } from "react";
import type { PatchShape, PatchBorder, PatchMaterial, MockupAction } from "@/lib/patch-renderer";

// ─── State ───
export interface MockupState {
  imageFile: File | null;
  imageUrl: string | null;
  imageData: ImageData | null;
  shape: PatchShape;
  border: PatchBorder;
  sizeCm: number;
  material: PatchMaterial;
  colors: number;
  quantity: number;
  express: "none" | "express" | "super_express";
  colorsCount: number;
}

const initialState: MockupState = {
  imageFile: null,
  imageUrl: null,
  imageData: null,
  shape: "circle",
  border: "merrow",
  sizeCm: 8,
  material: "twill",
  colors: 5,
  quantity: 10,
  express: "none",
  colorsCount: 0,
};

// ─── Reducer ───
function mockupReducer(state: MockupState, action: MockupAction): MockupState {
  switch (action.type) {
    case "SET_IMAGE":
      return { ...state, imageUrl: action.imageUrl, imageData: action.imageData };
    case "SET_SHAPE":
      return { ...state, shape: action.shape };
    case "SET_BORDER":
      return { ...state, border: action.border };
    case "SET_SIZE":
      return { ...state, sizeCm: action.size };
    case "SET_MATERIAL":
      return { ...state, material: action.material };
    case "SET_COLORS":
      return { ...state, colors: action.colors };
    case "SET_QUANTITY":
      return { ...state, quantity: action.quantity };
    case "SET_EXPRESS":
      return { ...state, express: action.express };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// ─── Context ───
interface MockupContextType {
  state: MockupState;
  dispatch: React.Dispatch<MockupAction>;
  setImageFromFile: (file: File) => void;
  reset: () => void;
}

const MockupContext = createContext<MockupContextType | null>(null);

// ─── Provider ───
export function MockupProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(mockupReducer, initialState);

  const setImageFromFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        // ImageData für Farb-Extraktion
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          dispatch({ type: "SET_IMAGE", imageUrl: url, imageData });
        } else {
          dispatch({ type: "SET_IMAGE", imageUrl: url, imageData: null as unknown as ImageData });
        }
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return (
    <MockupContext.Provider value={{ state, dispatch, setImageFromFile, reset }}>
      {children}
    </MockupContext.Provider>
  );
}

// ─── Hook ───
export function useMockup(): MockupContextType {
  const ctx = useContext(MockupContext);
  if (!ctx) throw new Error("useMockup must be used within MockupProvider");
  return ctx;
}
