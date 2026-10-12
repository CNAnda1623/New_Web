"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { homeData } from "@/data/home";

export function HeroMobileSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress across mobile sequence (240vh distance for smooth control)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Mobile Image 1 (2nd.jpg - Gathering goodwill):
  // 0.0 -> 0.20: Held on-screen (x = 0%)
  // 0.20 -> 0.60: Smooth horizontal transition toward the right (x: 0% -> 100%)
  // 0.60+: Faded out so it does not overlap
  const img1X = useTransform(scrollYProgress, (p) => {
    if (shouldReduceMotion) return "0%";
    if (p <= 0.2) return "0%";
    if (p >= 0.6) return "100%";
    const t = (p - 0.2) / (0.6 - 0.2);
    return `${t * 100}%`;
  });

  const img1Opacity = useTransform(scrollYProgress, (p) => {
    if (shouldReduceMotion) return 1;
    if (p <= 0.55) return 1;
    if (p >= 0.65) return 0;
    return 1 - (p - 0.55) / (0.65 - 0.55);
  });

  // Mobile Image 2 (3.jpeg - 75 GW milestone banner):
  // 0.0 -> 0.20: Positioned outside to the right (x = 100%)
  // 0.20 -> 0.60: Enters from right moving left (x: 100% -> 0%)
  // 0.60 -> 0.85: Attached/pinned hold period on screen (x = 0%)
  // 0.85 -> 1.00: Releases naturally with scroll
  const img2X = useTransform(scrollYProgress, (p) => {
    if (shouldReduceMotion) return "0%";
    if (p <= 0.2) return "100%";
    if (p >= 0.6) return "0%";
    const t = (p - 0.2) / (0.6 - 0.2);
    return `${(1 - t) * 100}%`;
  });

  const { mobileSlideA } = homeData.hero;

  return (
    <div
      ref={containerRef}
      className="block lg:hidden relative w-full h-[240vh] bg-white overflow-hidden"
    >
      {/* Sticky Viewport pinned under mobile navbar (header is 72px) */}
      <div className="sticky top-[72px] w-full h-[calc(100vh-72px)] overflow-hidden bg-white select-none">
        {/* ================= IMAGE 1: GATHERING GOODWILL ================= */}
        <motion.div
          style={{ x: img1X, opacity: img1Opacity }}
          className="absolute inset-0 w-full h-full will-change-transform isolate"
        >
          <img
            src="/Images/Home/2nd.jpg"
            alt="Gathering goodwill for a better world"
            className="w-full h-full object-cover object-center brightness-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />

          {/* Centered headline */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <div className="max-w-xs flex flex-col items-center gap-2">
              {mobileSlideA.lines.map((line, idx) => (
                <span
                  key={idx}
                  className="text-white text-lg sm:text-xl font-light tracking-widest uppercase drop-shadow-md"
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ================= IMAGE 2: 75 GW+ MILESTONE BANNER ================= */}
        <motion.div
          style={{ x: img2X }}
          className="absolute inset-0 w-full h-full will-change-transform bg-[#7ba9d4] overflow-hidden"
        >
          <img
            src="/Images/Home/3.jpeg"
            alt="Sungrow 75 GW+ Bankability Banner"
            className="w-full h-full object-cover object-top pointer-events-none select-none"
            loading="eager"
          />
        </motion.div>
      </div>
    </div>
  );
}
