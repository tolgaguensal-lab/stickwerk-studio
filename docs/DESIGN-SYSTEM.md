# 🧵 Stickwerk-Studio Design System

This document defines the strict visual standards for Stickwerk-Studio. All UI elements must adhere to these tokens. No "feeling-based" design is permitted.

## 1. Color Palette

| Role | Hex | Usage |
|---|---|---|
| **Background** | `#F7F1E6` | Main page background |
| **Surface** | `#FFF8EC` | Cards, Popovers, Inputs |
| **Surface Muted** | `#EFE3D0` | Alternative sections, muted surfaces |
| **Text** | `#111111` | Primary headings and body text |
| **Muted Text** | `#3A332C` | Secondary text, captions |
| **Border** | `#D8C7AE` | All borders, dividers |
| **Primary** | `#111111` | Primary buttons, highlights |
| **Primary FG** | `#FFF8EC` | Text on primary buttons |
| **Accent** | `#8A6A3F` | Brand accents, active states |
| **Accent FG** | `#FFF8EC` | Text on accent buttons |
| **Success** | `#1F6B3A` | Success messages, validation |
| **Danger** | `#8B1E1E` | Error messages, destructive actions |

## 2. Typography

**Font Pair:**
- **Headings/Logo:** `Playfair Display` (Serif)
- **Body/UI:** `Inter` (Sans-Serif)

### Size Scale
| Element | Desktop | Mobile | Line Height |
|---|---|---|---|
| **H1** | 64px | 40px | 72px / 46px |
| **H2** | 44px | 32px | 52px / 40px |
| **H3** | 28px | 24px | 36px / 32px |
| **Body** | 16px | 16px | 24px |
| **Small** | 14px | 14px | 20px |
| **Meta** | 12px | 12px | 16px |
| **Card Title**| 18px | 18px | 26px |
| **Card Body** | 15px | 15px | 24px |
| **Button** | 16px | 16px | 24px |

## 3. Layout & Spacing

### Spacing Scale (4px Base)
`4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128`

### Containers
- **Max Width:** 1280px
- **Content Max Width:** 720px
- **Padding (Desktop):** 32px
- **Padding (Mobile):** 20px

### Section Padding
- **Desktop:** `py-20` to `py-28`
- **Mobile:** `py-12` to `py-16`
- **Hero:** `py-24` (Desktop) / `py-16` (Mobile)

## 4. Components

### Buttons
- **Primary Height:** 48px
- **Large Height:** 56px
- **Small Height:** 40px
- **Border Radius:** 999px (Pill) or 12px
- **Font Weight:** 600

### Inputs
- **Height:** 48px
- **Border Radius:** 12px
- **Background:** `#FFF8EC`
- **Border:** `#D8C7AE`
- **Font Size:** 16px

### Cards
- **Padding:** 24px
- **Border Radius:** 20px
- **Background:** `#FFF8EC`
- **Border:** 1px solid `#D8C7AE`

## 5. Header & Footer
- **Header Height:** 72px (Desktop) / 64px (Mobile)
- **Logo (Header):** Icon 32px, Text 18-22px
- **Logo (Footer):** Icon 28px, Text 18px
- **Footer Padding:** pt-64 pb-32

## 6. Forbidden Combinations
- ❌ Text `< 14px` for main content.
- ❌ `bg-transparent` on Cards or Inputs.
- ❌ White text on light backgrounds.
- ❌ Black text on black backgrounds.
- ❌ Arbitrary spacing like `py-40` or `mt-48`.
- ❌ `min-h-screen` on standard content sections.

## 7. Visual QA Process
Automated tests are available in `tests/e2e/visual-design.spec.ts`.
Run via: `npm run test:visual`
