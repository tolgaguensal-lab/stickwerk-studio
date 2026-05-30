import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-body-lg tracking-wide font-regular transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-charcoal/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-deep-charcoal text-pure-white hover:bg-deep-charcoal/90",
        outline:
          "bg-transparent text-deep-charcoal border border-deep-charcoal hover:bg-deep-charcoal/5",
        ghost:
          "bg-transparent text-deep-charcoal hover:bg-deep-charcoal/5",
        green:
          "bg-signal-green text-midnight-ink hover:bg-signal-green/90",
        link:
          "bg-transparent text-deep-charcoal underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6",
        sm: "h-8 px-4 text-body",
        lg: "h-12 px-8 text-body-lg",
        xl: "h-14 px-10 text-heading-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), "btn-pill", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
