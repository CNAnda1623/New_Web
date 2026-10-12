import React from "react";
import Image from "next/image";
import { Container } from "../ui/Container";

export function ClientsWorldSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <Container>
        {/* Centered Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-light text-neutral-900 tracking-tight text-center mb-10 sm:mb-14">
          Our Clients in the World
        </h2>

        {/* Large Image Container occupying ~75% (70-80%) of available content width */}
        <div className="w-full max-w-[78%] sm:max-w-[76%] lg:max-w-[74%] mx-auto flex items-center justify-center">
          <div className="relative w-full aspect-[1600/785]">
            <Image
              src="/Images/Home/map.jpeg"
              alt="Our Clients in the World Map"
              fill
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 1200px"
              className="object-contain object-center"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
