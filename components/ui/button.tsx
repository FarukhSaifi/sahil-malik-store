import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap uppercase tracking-[0.2em] text-xs font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 min-h-11 min-w-11",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-accent",
        outline: "border border-foreground bg-transparent text-foreground hover:border-accent hover:text-accent",
        ghost: "text-foreground hover:text-accent",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-10 px-4",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
