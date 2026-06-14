import * as React from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { InputProps } from "@/types";

export const inputVariants = cva(
  "w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors disabled:cursor-not-allowed disabled:bg-muted/10 disabled:text-muted",
  {
    variants: {
      state: {
        default: "border-border focus:border-accent",
        error: "border-destructive focus:border-destructive",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, error, state, ...props }, ref) => {
  return (
    <input
      ref={ref}
      aria-invalid={error ? true : undefined}
      className={cn(inputVariants({ state: error ? "error" : state }), className)}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { inputVariants as inputStyles };
