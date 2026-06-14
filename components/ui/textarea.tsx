import * as React from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { TextareaProps } from "@/types";

export const textareaVariants = cva(
  "w-full resize-y border bg-transparent px-4 py-3 text-sm outline-none transition-colors disabled:cursor-not-allowed disabled:bg-muted/10 disabled:text-muted",
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

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, state, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={error ? true : undefined}
        className={cn(textareaVariants({ state: error ? "error" : state }), className)}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";
