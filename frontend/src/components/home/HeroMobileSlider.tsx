"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { homeData } from "@/data/home";
import { SmartImage } from "../ui/SmartImage";
import { SmartVideo } from "../ui/SmartVideo";

export function HeroMobileSlider() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      duration: 25, // snappy ~0.45s slide
    },
    [
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
      }),
    ]
  );

  const { mobileVideo, mobileSlideA, mobileSlideB } = homeData.hero;

  return (
    <div
      className="block sm:hidden w-full h-[calc(100vh-3.5rem)] overflow-hidden relative select-none"
      ref={emblaRef}
    >
      <div className="flex h-full">
        {/* Slide A: Forest with mist + 3 line goodwill text */}
        <div className="flex-[0_0_100%] min-w-0 h-full relative flex items-center justify-center isolate">
          <SmartImage
            assetKey={mobileSlideA.assetKey}
            src={mobileSlideA.src}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center absolute inset-0 z-0"
            alt="Gathering goodwill for a better world"
          />
          <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />

          <div className="text-center px-6 max-w-sm flex flex-col items-center gap-1.5 pt-12 relative z-20">
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

        {/* Slide B: 75 GW+ Inverter Bankability Banner (3.jpeg directly) */}
        <div className="flex-[0_0_100%] min-w-0 h-full relative overflow-hidden isolate">
          <SmartImage
            assetKey={mobileSlideB.assetKey}
            src={mobileSlideB.src}
            fill
            sizes="100vw"
            className="object-cover object-center absolute inset-0 z-0"
            alt="75 GW+ India shipments banner"
          />
        </div>
      </div>
    </div>
  );
}
