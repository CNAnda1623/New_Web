"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { homeData } from "@/data/home";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveScenarioTab } from "@/store/slices/homeSlice";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";

export function ScenarioTabs() {
  const dispatch = useAppDispatch();
  const activeTabId = useAppSelector((state) => state.home.activeScenarioTab);
  const { scenarios } = homeData;

  const currentTab =
    scenarios.tabs.find((t) => t.id === activeTabId) || scenarios.tabs[0]!;

  return (
    <section className="relative w-full min-h-[650px] lg:min-h-[800px] flex flex-col justify-between overflow-hidden bg-neutral-900 py-16 lg:py-20 text-white">
      {/* Background Crossfade Images */}
      {scenarios.tabs.map((tab) => {
        const isActive = tab.id === currentTab.id;
        return (
          <div
            key={tab.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out isolate ${
              isActive ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <SmartImage
              assetKey={tab.bgAssetKey}
              fill
              sizes="100vw"
              className="object-cover object-center brightness-[0.65] z-0"
              alt={tab.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 z-10 pointer-events-none" />
          </div>
        );
      })}

      {/* Top Labels and Main Title */}
      <Container className="relative z-10 pt-8">
        <span className="inline-block text-xs uppercase tracking-widest text-[#fe7900] font-semibold mb-3">
          {scenarios.label}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-8">
          {currentTab.title}
        </h2>

        {/* Links with Orange Chevrons (List down format) */}
        <div className="flex flex-col gap-3.5 sm:gap-4 max-w-fit">
          {currentTab.links.map((link, idx) => {
            const content = (
              <span className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white/90 hover:text-[#fe7900] transition-colors group">
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#fe7900] group-hover:translate-x-1 transition-transform" />
              </span>
            );

            return link.isLocal ? (
              <Link key={idx} href={link.href}>
                {content}
              </Link>
            ) : (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            );
          })}
        </div>
      </Container>

      {/* Bottom Pill Tab Bar */}
      <div className="relative z-10 mt-16 px-4">
        <div className="max-w-fit mx-auto overflow-x-auto py-2 no-scrollbar">
          <div
            role="tablist"
            aria-label="Customer Scenarios and Business Areas"
            className="inline-flex items-center bg-black/60 backdrop-blur-md rounded-full p-1.5 border border-white/10 shadow-lg text-xs sm:text-sm font-medium"
          >
            {scenarios.tabs.map((tab, idx) => {
              const isActive = tab.id === currentTab.id;
              return (
                <React.Fragment key={tab.id}>
                  {idx > 0 && (
                    <span className="text-white/20 px-1 select-none hidden sm:inline">
                      |
                    </span>
                  )}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => dispatch(setActiveScenarioTab(tab.id))}
                    className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-white text-neutral-900 shadow-md font-semibold"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
