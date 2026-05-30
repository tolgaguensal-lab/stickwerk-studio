import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-4 py-0 text-body-sm font-regular transition-colors focus:outline-none focus:ring-2 focus:ring-deep-charcoal/20 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-deep-charcoal text-pure-white",
        green:
          "border-transparent bg-signal-green text-midnight-ink",
        outline:
          "border border-deep-charcoal text-deep-charcoal bg-transparent",
        ghost:
          "border-transparent bg-ghost-fill text-deep-charcoal",
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
