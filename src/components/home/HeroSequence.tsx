"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { HeroMobileSlider } from "./HeroMobileSlider";

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress across the pinned sequence (2.5 viewports)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 92px", "end end"],
  });

  // Forest subtle parallax (0 -> 0.45)
  const forestY = useTransform(scrollYProgress, (p) => {
    if (p <= 0) return "0%";
    if (p >= 0.45) return "-15%";
    return `${(p / 0.45) * -15}%`;
  });

  // Banner Y transition:
  // Phase 1 (0 -> 0.45): curtain rises 100% -> 0%
  // Phase 2 (0.45 -> 0.55): dwell at 0px (State C)
  // Phase 3 (0.55 -> 0.88): release, moves up to -300px (State D)
  const bannerY = useTransform(scrollYProgress, (p) => {
    if (p <= 0) return "100%";
    if (p < 0.45) {
      const t = p / 0.45;
      return `${(1 - t) * 100}%`;
    }
    if (p <= 0.55) return "0px";
    if (p >= 0.88) return "-300px";
    const t = (p - 0.55) / (0.88 - 0.55);
    return `${-300 * t}px`;
  });

  // Card Height transition:
  // Phase 1 & 2 (0 -> 0.55): full viewport remaining height (window.innerHeight - 108px)
  // Phase 3 (0.55 -> 0.88): shrinks to 446px
  const cardHeight = useTransform(scrollYProgress, (p) => {
    const fullH = typeof window !== "undefined" ? window.innerHeight - 108 : 810;
    if (p <= 0.55) return `${fullH}px`;
    if (p >= 0.88) return "446px";
    const t = (p - 0.55) / (0.88 - 0.55);
    const h = fullH - t * (fullH - 446);
    return `${h}px`;
  });

  return (
    <section className="relative w-full bg-white">
      {/* 1. Mobile-only Embla Autoplay Slider (<640px) */}
      <HeroMobileSlider />

      {/* 2. Desktop & Tablet Sequence (>=640px) */}
      <div className="hidden sm:block relative w-full bg-white">
        {/* SECTION 1: Full-Screen Hero Video */}
        <div className="relative w-full h-[calc(100vh-85px)] overflow-hidden bg-black flex items-center justify-center">
          <video
            src="/Images/Home/first.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/80 animate-bounce pointer-events-none">
            <span className="text-[11px] uppercase tracking-widest font-light mb-1.5 drop-shadow">
              Scroll to explore
            </span>
            <svg
              className="w-5 h-5 text-white/80 drop-shadow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* SECTION 2: The Inset Rounded Sticky Card Scroll Sequence */}
        <div
          ref={containerRef}
          className="relative w-full h-[280vh] bg-white pt-4"
        >
          {/* THE PINNED STICKY CARD:
              - Inset ~5% from each side (left ~100px, right ~1807px at 1918px wide)
              - top edge at y ≈ 92px
              - corner radius ≈ 36px
              - overflow hidden
              - no drop shadow
          */}
          <motion.div
            style={
              shouldReduceMotion
                ? { height: "calc(100vh - 108px)" }
                : { height: cardHeight }
            }
            className="sticky top-[92px] w-[90vw] max-w-[1720px] mx-auto rounded-[36px] overflow-hidden bg-white shadow-none z-20"
          >
            {/* LAYER A: BRIGHT MISTY FOREST (State A) */}
            <motion.div
              style={shouldReduceMotion ? { y: "0%" } : { y: forestY }}
              className="absolute top-0 left-0 w-full h-[calc(100vh-108px)] min-h-[810px] overflow-hidden"
            >
              <img
                src="/Images/Home/2nd.jpg"
                alt="Gathering goodwill for a better world"
                className="w-full h-full object-cover object-center brightness-105"
              />

              {/* Single line text: white, uppercase, regular/medium (weight 500), ≈ 36 px, centred, ~18% down */}
              <div className="absolute inset-0 flex justify-center pt-[14vh] lg:pt-[18vh] px-4 pointer-events-none">
                <h1 className="text-white text-2xl sm:text-3xl md:text-[36px] font-medium tracking-wide uppercase text-center whitespace-nowrap drop-shadow-sm">
                  GATHERING GOODWILL FOR A BETTER WORLD
                </h1>
              </div>
            </motion.div>

            {/* LAYER B & C & D: BLUE 75 GW+ BANKABILITY BANNER */}
            <motion.div
              style={shouldReduceMotion ? { y: "0px" } : { y: bannerY }}
              className="absolute top-0 left-0 w-full h-[calc(100vh-108px)] min-h-[810px] bg-[#7ba9d4] overflow-hidden"
            >
              <img
                src="/Images/Home/3.jpeg"
                alt="Sungrow 75 GW+ Bankability Banner"
                className="w-full h-full object-cover object-top pointer-events-none select-none"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
