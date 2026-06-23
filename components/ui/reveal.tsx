"use client";

import { motion } from "framer-motion";

import { fadeUp } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

import { useMounted } from "@/hooks/use-mounted";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import type { RevealProps } from "@/types";

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const mounted = useMounted();
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!mounted || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeUp}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
