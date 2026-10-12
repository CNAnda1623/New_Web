"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setHeaderNavHidden, setBackToTopVisible } from "@/store/slices/uiSlice";

export function useScrollDirection() {
  const dispatch = useAppDispatch();
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      // Show back to top button after scrolling down 300px
      dispatch(setBackToTopVisible(scrollY > 300));

      if (Math.abs(scrollY - lastScrollY) < 10) {
        ticking = false;
        return;
      }

      if (scrollY > lastScrollY && scrollY > 120) {
        // Scrolling down
        setScrollDir("down");
        dispatch(setHeaderNavHidden(true));
      } else {
        // Scrolling up or at top
        setScrollDir("up");
        dispatch(setHeaderNavHidden(false));
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [dispatch]);

  return scrollDir;
}
