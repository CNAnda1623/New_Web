"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";

export interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

interface WordProps {
  children: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function Word({ children, range, progress }: WordProps) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  const color = useTransform(progress, range, ["#a3a3a3", "#171717"]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-1.5 transition-colors duration-75"
    >
      {children}
    </motion.span>
  );
}

export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className={cn(
        "text-lg sm:text-xl md:text-2xl lg:text-[26px] font-light leading-relaxed max-w-4xl mx-auto text-center",
        className
      )}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
