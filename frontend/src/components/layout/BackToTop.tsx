"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isVisible) return null;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-20 sm:bottom-22 right-6 z-40 flex items-center justify-center rounded-full bg-white w-9 h-9 sm:w-10 sm:h-10 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 border border-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] cursor-pointer"
    >
      <ArrowUp className="w-4 h-4 text-[#fe7900] stroke-[2.5]" />
    </button>
  );
}
