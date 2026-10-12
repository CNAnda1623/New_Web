"use client";

import React from "react";
import { homeData } from "@/data/home";
import { SmartVideo } from "../ui/SmartVideo";
import { SmartImage } from "../ui/SmartImage";
import { HeroMobileSlider } from "./HeroMobileSlider";

export function HeroSequence() {
  const { hero, statsBanner } = homeData;

  return (
    <section className="relative w-full bg-black">
      {/* Mobile-only Embla Autoplay Slider (<640px) */}
      <HeroMobileSlider />

      {/* Desktop & Tablet Sequence (>=640px) */}
      <div className="hidden sm:block relative w-full">
        {/* 1. Hero Video Section (Full Screen Video) */}
        <div className="relative w-full h-[80vh] md:h-[90vh] lg:h-[95vh] flex items-center justify-center overflow-hidden isolate z-10">
          <SmartVideo
            assetKey="home.hero.video"
            poster="home.hero.poster"
            className="absolute inset-0 w-full h-full object-cover z-0 brightness-[0.9]"
            alt="Sungrow Hero Video"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10 pointer-events-none" />

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/80 animate-bounce pointer-events-none">
            <span className="text-[11px] uppercase tracking-widest font-light mb-1.5 drop-shadow">Scroll to explore</span>
            <svg className="w-5 h-5 text-white/80 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* 2. Goodwill Image Section (Sticky so 3rd banner scrolls over it) */}
        <div className="sticky top-0 w-full h-screen overflow-hidden isolate z-10">
          <div className="relative w-full h-full flex items-center justify-center">
            <SmartImage
              assetKey="home.hero.mobileForest"
              src="/Images/Home/2nd.jpg"
              fill
              sizes="100vw"
              priority
              className="object-cover object-center absolute inset-0 z-0"
              alt="Gathering goodwill for a better world"
            />
            <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

            {/* Overlay Headings: Gathering Goodwill on the Image */}
            <div className="text-center px-6 max-w-4xl z-20 flex flex-col items-center">
              <span className="text-white/85 text-sm md:text-base font-light tracking-widest uppercase mb-4 drop-shadow">
                {hero.titleTop}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-white drop-shadow-lg uppercase leading-tight max-w-3xl">
                {hero.titleMain}
              </h1>
            </div>
          </div>
        </div>

        {/* 3. 75 GW+ Bankability Banner Section (Scrolls up on top of 2nd image) */}
        <div className="relative w-full overflow-hidden isolate z-20 shadow-2xl bg-black">
          <div className="relative w-full aspect-[16/9] max-h-[85vh]">
            <SmartImage
              assetKey={statsBanner.assetKey}
              src={statsBanner.src}
              fill
              sizes="100vw"
              className="object-cover object-center"
              alt="Sungrow 75 GW+ India shipments banner"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
