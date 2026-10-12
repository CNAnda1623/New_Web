"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export function BackToTop() {
  const isVisible = useAppSelector((state) => state.ui.backToTopVisible);

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
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-full bg-white transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900]
        /* Desktop: smaller outlined circle */
        border border-[#fe7900] w-10 h-10 shadow-sm
        /* Mobile: ~56px with soft shadow */
        sm:w-11 sm:h-11 max-sm:w-14 max-sm:h-14 max-sm:shadow-lg max-sm:border-neutral-200"
    >
      <ArrowUp className="w-5 h-5 text-[#fe7900] stroke-[2.2]" />
    </button>
  );
}
