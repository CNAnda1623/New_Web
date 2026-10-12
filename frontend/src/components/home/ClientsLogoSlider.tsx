"use client";

import React from "react";
import Image from "next/image";
import { Container } from "../ui/Container";

// Verified client & partner logos present in repository assets
const clientLogos = [
  { name: "Solar Technology Partner", src: "/Images/about us/logo1.png" },
  { name: "Wind Energy Partner", src: "/Images/about us/logo2.png" },
  { name: "Energy Storage Partner", src: "/Images/about us/logo3.png" },
  { name: "Electrification Solutions", src: "/Images/about us/logo4.svg" },
  { name: "Green Hydrogen Partner", src: "/Images/about us/logo5.png" },
  { name: "MSCI ESG Rating AAA", src: "/Images/sustainability/reward1.webp" },
  { name: "EcoVadis Sustainability Gold", src: "/Images/sustainability/reward2.webp" },
  { name: "UN Global Compact Partner", src: "/Images/sustainability/reward3.webp" },
  { name: "BCG Climate Pioneer Partner", src: "/Images/sustainability/reward4.webp" },
  { name: "Solar Innovation Partner", src: "/Images/sustainability/logo1.svg" },
  { name: "Clean Energy Partner", src: "/Images/sustainability/logo2.svg" },
  { name: "Global Power Partner", src: "/Images/sustainability/logo3.svg" },
];

export function ClientsLogoSlider() {
  // Duplicated list to create a seamless infinite right-to-left marquee
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#fafafa] border-t border-neutral-100/60 overflow-hidden select-none">
      {/* Embedded CSS guarantee: single flat plane right-to-left translation with pause-on-hover */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes clientsPlaneScrollRightToLeft {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-50%, 0, 0);
              }
            }
            .clients-scroll-plane {
              display: flex !important;
              flex-direction: row !important;
              flex-wrap: nowrap !important;
              align-items: center !important;
              width: max-content !important;
              will-change: transform;
              animation: clientsPlaneScrollRightToLeft 28s linear infinite;
            }
            .clients-slider-wrapper:hover .clients-scroll-plane {
              animation-play-state: paused;
            }
          `,
        }}
      />

      <Container className="mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-900 tracking-tight text-center">
          Our Clients
        </h2>
      </Container>

      {/* Infinite Horizontal Logo Slider in a single flat plane */}
      <div className="clients-slider-wrapper relative w-full overflow-hidden">
        {/* Soft edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#fafafa] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#fafafa] to-transparent z-10" />

        <div className="clients-scroll-plane flex gap-6 sm:gap-8 items-center py-2 px-4">
          {duplicatedLogos.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="w-[180px] sm:w-[220px] h-[90px] sm:h-[105px] rounded-2xl bg-white border border-neutral-200/70 shadow-xs hover:shadow-md hover:border-[#fe7900]/30 transition-all duration-300 flex items-center justify-center p-4 sm:p-5 shrink-0 group cursor-pointer"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={client.src}
                  alt={client.name}
                  width={140}
                  height={60}
                  className="max-h-12 sm:max-h-14 w-auto max-w-[85%] object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
