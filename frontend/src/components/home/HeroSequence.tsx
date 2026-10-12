"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { HeroMobileSlider } from "./HeroMobileSlider";

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Desktop detection: ensures large video is never downloaded or initialized on mobile/tablet
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Coordinated scroll progress across desktop hero track (360vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ================= 1. CARD CONTAINER PROGRESSIVE SCALING =================
  // Phase 1 (0.00 -> 0.28): Full-screen video (100% width, 0px radius)
  // progressively scales to an inset rounded card (~88% width, 32px radius)
  const cardWidth = useTransform(scrollYProgress, (p) => {
    if (shouldReduceMotion) return "88vw";
    if (p <= 0.05) return "100vw";
    if (p >= 0.28) return "88vw";
    const t = (p - 0.05) / (0.28 - 0.05);
    return `${100 - t * 12}vw`;
  });

  const cardHeight = useTransform(scrollYProgress, (p) => {
    if (shouldReduceMotion) return "calc(100vh - 120px)";
    if (p <= 0.05) return "calc(100vh - 85px)";
    if (p >= 0.28) return "calc(100vh - 120px)";
    const t = (p - 0.05) / (0.28 - 0.05);
    return `calc(100vh - ${85 + t * 35}px)`;
  });

  const cardBorderRadius = useTransform(scrollYProgress, (p) => {
    if (shouldReduceMotion) return "32px";
    if (p <= 0.05) return "0px";
    if (p >= 0.28) return "32px";
    const t = (p - 0.05) / (0.28 - 0.05);
    return `${t * 32}px`;
  });

  // ================= 2. LAYER VISIBILITY & TRANSITION TIMELINES =================
  // Video Opacity: Visible from 0.00, then smoothly fades out as Layer 2 enters
  const videoOpacity = useTransform(scrollYProgress, (p) => {
    if (shouldReduceMotion) return 1;
    if (p <= 0.28) return 1;
    if (p >= 0.44) return 0;
    return 1 - (p - 0.28) / (0.44 - 0.28);
  });

  // Layer 2: Forest image (2nd.jpg) with "Gathering goodwill for a better world"
  // Enters during 0.26 -> 0.44, holds through 0.54
  const layer2Opacity = useTransform(scrollYProgress, (p) => {
    if (shouldReduceMotion) return 1;
    if (p < 0.26) return 0;
    if (p <= 0.42) return (p - 0.26) / (0.42 - 0.26);
    return 1;
  });

  const forestParallaxY = useTransform(scrollYProgress, (p) => {
    if (shouldReduceMotion) return "0%";
    if (p <= 0.3) return "0%";
    if (p >= 0.6) return "-10%";
    return `${((p - 0.3) / 0.3) * -10}%`;
  });

  // Layer 3: 75 GW milestone banner (3.jpeg)
  // Rises up smoothly like a curtain from y = 100% to 0% between 0.52 and 0.74, then holds
  const layer3Y = useTransform(scrollYProgress, (p) => {
    if (shouldReduceMotion) return "0%";
    if (p <= 0.52) return "100%";
    if (p >= 0.74) return "0%";
    const t = (p - 0.52) / (0.74 - 0.52);
    return `${(1 - t) * 100}%`;
  });

  return (
    <section className="relative w-full bg-white">
      {/* 1. Mobile & Tablet Homepage: Horizontal Image Sequence (<1024px) */}
      <HeroMobileSlider />

      {/* 2. Desktop Homepage: Scroll-Driven Video-to-Image Sequence (>=1024px) */}
      <div
        ref={containerRef}
        className="hidden lg:block relative w-full h-[360vh] bg-white"
      >
        {/* Sticky Viewport pinned under navigation header (top 85px) */}
        <div className="sticky top-[85px] w-full h-[calc(100vh-85px)] overflow-hidden flex items-center justify-center bg-white">
          {/* Dynamically scaling and rounding media container */}
          <motion.div
            style={{
              width: cardWidth,
              height: cardHeight,
              borderRadius: cardBorderRadius,
            }}
            className="relative max-w-[1680px] overflow-hidden bg-black shadow-none will-change-[width,height,border-radius]"
          >
            {/* ================= LAYER 1: DESKTOP HERO VIDEO ================= */}
            {isDesktop && (
              <motion.div
                style={{ opacity: videoOpacity }}
                className="absolute inset-0 w-full h-full overflow-hidden z-10 will-change-opacity bg-black"
              >
                <video
                  src="/Images/Home/first.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />

                {/* Subtle Scroll Hint */}
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
              </motion.div>
            )}

            {/* ================= LAYER 2: 2ND.JPG (GATHERING GOODWILL) ================= */}
            <motion.div
              style={{
                opacity: layer2Opacity,
                y: forestParallaxY,
              }}
              className="absolute inset-0 w-full h-full overflow-hidden z-20 will-change-[opacity,transform] isolate"
            >
              <img
                src="/Images/Home/2nd.jpg"
                alt="Gathering goodwill for a better world"
                className="w-full h-full object-cover object-center brightness-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />

              {/* Centered Typography overlay */}
              <div className="absolute inset-0 flex justify-center pt-[16vh] lg:pt-[20vh] px-4 pointer-events-none">
                <h1 className="text-white text-2xl sm:text-3xl md:text-[36px] font-medium tracking-wide uppercase text-center whitespace-nowrap drop-shadow-md">
                  GATHERING GOODWILL FOR A BETTER WORLD
                </h1>
              </div>
            </motion.div>

            {/* ================= LAYER 3: 3.JPEG (75 GW+ MILESTONE BANNER) ================= */}
            <motion.div
              style={{ y: layer3Y }}
              className="absolute inset-0 w-full h-full bg-[#7ba9d4] overflow-hidden z-30 will-change-transform"
            >
              <img
                src="/Images/Home/3.jpeg"
                alt="Sungrow 75 GW+ Bankability Banner"
                className="w-full h-full object-cover object-top pointer-events-none select-none"
                loading="eager"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
