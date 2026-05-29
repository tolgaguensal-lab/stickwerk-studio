import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-craft-gold/20 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-industry-gray text-soft-white hover:bg-industry-gray/80",
        secondary:
          "border-transparent bg-machinery-silver text-industry-gray hover:bg-machinery-silver/80",
        destructive:
          "border-transparent bg-signal-red text-soft-white hover:bg-signal-red/80",
        outline: "text-industry-gray border border-industry-gray/20 hover:bg-industry-gray/5",
        gold: "border-transparent bg-craft-gold text-industry-gray hover:bg-craft-gold/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
