import React from "react";
import { SmartVideo } from "../ui/SmartVideo";

export interface FullBleedVideoProps {
  assetKey: string;
  caption: string;
}

export function FullBleedVideo({ assetKey, caption }: FullBleedVideoProps) {
  return (
    <section className="relative w-full h-[450px] sm:h-[550px] lg:h-[650px] overflow-hidden flex items-end justify-center pb-12 bg-black">
      <SmartVideo
        assetKey={assetKey}
        className="absolute inset-0 w-full h-full object-cover -z-10 brightness-[0.75]"
        alt={caption}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 -z-10" />

      <p className="text-white text-base sm:text-lg md:text-xl font-light tracking-wide text-center px-6 max-w-2xl drop-shadow-md">
        {caption}
      </p>
    </section>
  );
}
