import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-body-lg tracking-wide font-regular transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline:
          "bg-transparent text-foreground border border-border hover:bg-muted/50",
        ghost:
          "bg-transparent text-foreground hover:bg-muted/50",
        green:
          "bg-success text-success-foreground hover:bg-success/90",
        link:
          "bg-transparent text-foreground underline-offset-4 hover:underline",
      },
       size: {
         default: "h-[48px] px-6",
         sm: "h-[40px] px-4 text-body",
         lg: "h-[56px] px-8 text-body-lg",
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
