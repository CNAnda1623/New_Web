"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, User, Menu } from "lucide-react";
import { navigationItems } from "@/data/navigation";
import { internalLinks } from "@/lib/links";
import { useScrollDirection } from "@/lib/useScrollDirection";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMobileNavOpen, setActiveMegaMenu } from "@/store/slices/uiSlice";
import { SmartImage } from "../ui/SmartImage";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";

export function SiteHeader() {
  const dispatch = useAppDispatch();
  const headerNavHidden = useAppSelector((state) => state.ui.headerNavHidden);
  const activeMegaMenuId = useAppSelector((state) => state.ui.activeMegaMenu);

  useScrollDirection();

  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeItem = navigationItems.find((item) => item.id === hoveredItemId);

  const handleMouseEnter = (id: string, isDirectLink?: boolean) => {
    if (isDirectLink) {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      setHoveredItemId(null);
      dispatch(setActiveMegaMenu(null));
      return;
    }
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setHoveredItemId(id);
    dispatch(setActiveMegaMenu(id));
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setHoveredItemId(null);
      dispatch(setActiveMegaMenu(null));
    }, 180);
  };

  // Close mega menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHoveredItemId(null);
        dispatch(setActiveMegaMenu(null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-xs transition-transform duration-300">
        {/* ROW 1: Logo & Utility Bar */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          {/* Left: Region Flag + Country name */}
          <div className="flex items-center gap-2">
            <SmartImage
              assetKey="brand.flag"
              width={22}
              height={15}
              className="w-5 h-auto object-contain"
              alt="India"
            />
            <span className="hidden sm:inline text-xs font-medium text-neutral-700">
              India
            </span>
          </div>

          {/* Center: Sungrow Logo */}
          <Link
            href="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] rounded"
          >
            <SmartImage
              assetKey="brand.logo"
              width={140}
              height={32}
              className="w-32 sm:w-36 h-auto object-contain"
              alt="SUNGROW Logo"
            />
          </Link>

          {/* Right: Search, Login & Mobile Hamburger */}
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="https://www.sungrowpower.com/in/en/search-results"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Search"
              className="p-1.5 text-neutral-700 hover:text-[#fe7900] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] rounded-full"
            >
              <Search className="w-5 h-5" />
            </a>

            <Link
              href={internalLinks.login}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold tracking-wider text-neutral-800 hover:text-[#fe7900] transition-colors px-2.5 py-1.5 rounded-full hover:bg-neutral-50"
            >
              <User className="w-4 h-4 text-neutral-600" />
              <span>LOGIN</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => dispatch(setMobileNavOpen(true))}
              aria-label="Open mobile menu"
              className="xl:hidden p-1.5 text-neutral-700 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] rounded"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ROW 2: Desktop Navigation Bar (Hides on scroll down) */}
        <div
          className={`hidden xl:block border-t border-neutral-100 transition-all duration-300 overflow-hidden ${
            headerNavHidden ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-8">
            <nav
              aria-label="Main Navigation"
              className="flex items-center justify-center gap-8 h-12"
            >
              {navigationItems.map((item) => {
                if (item.isDirectLink && item.href) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="text-sm font-medium text-neutral-700 hover:text-[#fe7900] transition-colors py-3"
                    >
                      {item.label}
                    </Link>
                  );
                }

                const isActive = hoveredItemId === item.id || activeMegaMenuId === item.id;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => handleMouseEnter(item.id, item.isDirectLink)}
                    onMouseLeave={handleMouseLeave}
                    className="relative"
                  >
                    <button
                      type="button"
                      aria-expanded={isActive}
                      className={`text-sm font-medium transition-colors py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] rounded ${
                        isActive
                          ? "text-[#fe7900]"
                          : "text-neutral-700 hover:text-[#fe7900]"
                      }`}
                    >
                      {item.label}
                    </button>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Active Desktop Mega Menu */}
        {activeItem && !activeItem.isDirectLink && (
          <div
            onMouseEnter={() => handleMouseEnter(activeItem.id)}
            onMouseLeave={handleMouseLeave}
          >
            <MegaMenu
              item={activeItem}
              isOpen={Boolean(hoveredItemId)}
              onClose={() => {
                setHoveredItemId(null);
                dispatch(setActiveMegaMenu(null));
              }}
            />
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer />
    </>
  );
}
