"use client";

import React from "react";
import { homeData } from "@/data/home";
import { SectionHeading } from "../ui/SectionHeading";
import { ScrollRevealText } from "../ui/ScrollRevealText";
import { Button } from "../ui/Button";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";

export function CommitmentCarousel() {
  const { whySungrow, commitment } = homeData;

  return (
    <section className="py-20 lg:py-28 bg-[#f5f5f5] overflow-hidden">
      <Container>
        {/* Why Sungrow section */}
        <SectionHeading
          tag={whySungrow.heading}
          title=""
          showDivider={true}
          align="center"
          className="mb-6"
        />
        <ScrollRevealText text={whySungrow.description} className="mb-20" />

        {/* Commitment to Innovation Heading */}
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-900 tracking-tight">
            {commitment.heading}
          </h2>
        </div>
      </Container>

      {/* Horizontal Cards Scroller */}
      <div className="w-full pl-4 sm:pl-6 lg:pl-8 overflow-x-auto pb-6 no-scrollbar">
        <div className="flex gap-6 min-w-max pr-8">
          {commitment.cards.map((card) => (
            <div
              key={card.id}
              className="relative w-[280px] sm:w-[340px] md:w-[380px] h-[440px] sm:h-[500px] rounded-3xl overflow-hidden shadow-lg group flex flex-col justify-between p-8 text-white transition-transform duration-300 hover:-translate-y-1 isolate"
            >
              <SmartImage
                assetKey={card.assetKey}
                fill
                sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 380px"
                className="object-cover object-center absolute inset-0 z-0 brightness-[0.7] group-hover:scale-105 transition-transform duration-500"
                alt={card.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-10 pointer-events-none" />

              <h3 className="text-xl sm:text-2xl font-normal leading-snug max-w-[220px] drop-shadow relative z-20">
                {card.title}
              </h3>

              <div className="relative z-20">
                <Button
                  href={card.href}
                  isExternal={true}
                  variant="solid-orange"
                  size="sm"
                  className="font-medium px-5 py-2"
                >
                  Explore More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
