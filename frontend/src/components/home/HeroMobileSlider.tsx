"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { homeData } from "@/data/home";

export function HeroMobileSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const { mobileSlideA } = homeData.hero;
  const totalSlides = 3;

  const goToSlide = useCallback((newIndex: number, newDir: number) => {
    setDirection(newDir);
    setCurrentSlide(newIndex);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % totalSlides, 1);
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides, -1);
  }, [currentSlide, totalSlides, goToSlide]);

  // Autoplay timer: transitions on its own independently every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Slide animation variants
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0.5,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0.5,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
      },
    }),
  };

  return (
    <div
      className="block lg:hidden relative w-full h-[calc(100svh-72px)] sm:h-[calc(100svh-80px)] min-h-[500px] max-h-[760px] bg-white overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {currentSlide === 0 ? (
            /* ================= SLIDE 1: GATHERING GOODWILL FOREST ================= */
            <motion.div
              key="slide-forest"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_e, info) => {
                if (info.offset.x < -40) {
                  nextSlide();
                } else if (info.offset.x > 40) {
                  prevSlide();
                }
              }}
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            >
              <img
                src="/Images/Home/2nd.jpg"
                alt="Gathering goodwill for a better world"
                className="w-full h-full object-cover object-center brightness-105 pointer-events-none select-none"
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
          ) : currentSlide === 1 ? (
            /* ================= SLIDE 2: 75 GW+ MILESTONE BANNER ================= */
            <motion.div
              key="slide-banner"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_e, info) => {
                if (info.offset.x < -40) {
                  nextSlide();
                } else if (info.offset.x > 40) {
                  prevSlide();
                }
              }}
              className="absolute inset-0 w-full h-full bg-[#7ba9d4] cursor-grab active:cursor-grabbing"
            >
              <img
                src="/Images/Home/3.jpeg"
                alt="Sungrow 75 GW+ Bankability Banner"
                className="w-full h-full object-cover object-top pointer-events-none select-none"
                loading="eager"
              />
            </motion.div>
          ) : (
            /* ================= SLIDE 3: 4.JPEG SHOWCASE ================= */
            <motion.div
              key="slide-image-4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_e, info) => {
                if (info.offset.x < -40) {
                  nextSlide();
                } else if (info.offset.x > 40) {
                  prevSlide();
                }
              }}
              className="absolute inset-0 w-full h-full bg-[#111] cursor-grab active:cursor-grabbing"
            >
              <img
                src="/Images/Home/4.jpeg"
                alt="Sungrow Clean Energy Showcase"
                className="w-full h-full object-cover object-center pointer-events-none select-none"
                loading="eager"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= PAGINATION PILLS / DOTS ================= */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-xs">
          {[0, 1, 2].map((idx) => {
            const isActive = currentSlide === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx, idx > currentSlide ? 1 : -1)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full h-2 ${
                  isActive
                    ? "w-6 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
