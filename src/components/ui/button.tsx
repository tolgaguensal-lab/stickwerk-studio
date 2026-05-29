import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary" | "gold";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

/* NEUES DESIGNSYSTEM - Stickwerk-Studio */
const buttonVariants = {
  /* Standard: Precision Blue */
  default: "bg-precision-blue text-soft-white hover:bg-precision-blue/90 shadow-sm",
  /* Primary: Precision Blue */
  primary: "bg-precision-blue text-soft-white hover:bg-precision-blue/90 shadow-sm",
  /* Gold: Craft Gold */
  gold: "bg-craft-gold text-industry-gray hover:bg-craft-gold/90 shadow-md",
  /* Destructive: Signal Red */
  destructive: "bg-signal-red text-soft-white hover:bg-signal-red/90",
  /* Outline with Precision Blue */
  outline: "border-2 border-precision-blue bg-transparent hover:bg-precision-blue/5 text-precision-blue",
  /* Secondary: Muted background */
  secondary: "bg-soft-white text-industry-gray hover:bg-machinery-silver border border-border-gray",
  /* Ghost: Subtle hover */
  ghost: "hover:bg-soft-white text-industry-gray",
  /* Link styling */
  link: "text-precision-blue underline-offset-4 hover:underline",
  /* Accent: Craft Gold (legacy compatibility) */
  accent: "bg-craft-gold text-industry-gray hover:bg-craft-gold/90 shadow-md",
} as const;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-precision-blue disabled:pointer-events-none disabled:opacity-50",
          buttonVariants[variant],
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-9 px-3",
          size === "lg" && "h-12 px-8 text-lg",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
