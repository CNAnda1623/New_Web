"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleShowPassword,
  setRememberMe,
} from "@/store/slices/loginSlice";
import { SmartImage } from "@/components/ui/SmartImage";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const showPassword = useAppSelector((state) => state.login.showPassword);
  const rememberMe = useAppSelector((state) => state.login.rememberMe);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submittedNotice, setSubmittedNotice] = useState(false);

  // Email format check & non-empty password check
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isEmailValid && password.trim().length > 0;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmittedNotice(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#d9d9d9] flex flex-col justify-between items-center py-4 sm:py-6 px-4 font-sans select-none">
      {/* 1. Header: Centered SUNGROW Logo */}
      <header className="w-full flex justify-center pt-1 pb-2 sm:pb-3">
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] rounded transition-transform hover:scale-105 duration-200"
        >
          <SmartImage
            assetKey="brand.logo"
            width={160}
            height={36}
            className="w-36 sm:w-42 h-auto object-contain"
            alt="SUNGROW Logo"
            priority
          />
        </Link>
      </header>

      {/* 2. Compact Centered White Login Card */}
      <div className="w-full max-w-[480px] sm:max-w-[500px] bg-white rounded-3xl sm:rounded-[32px] shadow-xl border border-neutral-100/80 px-6 sm:px-10 py-6 sm:py-7 my-auto">
        <h1 className="text-2xl sm:text-[28px] font-medium text-[#09090b] text-left mb-5 lowercase tracking-tight">
          login
        </h1>

        {submittedNotice && (
          <div
            role="alert"
            className="mb-4 p-3 rounded-xl bg-orange-50 border border-[#fe7900]/40 text-neutral-800 text-xs sm:text-sm animate-in fade-in duration-200"
          >
            <p className="font-semibold text-[#fe7900]">Demo Notice</p>
            <p className="text-neutral-600 mt-0.5">
              Sign-in is not available in this demo.
            </p>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
          {/* Email Field with Underline Style */}
          <div className="relative">
            <label
              htmlFor="login-email"
              className="block text-xs font-normal text-neutral-700 mb-1"
            >
              Your Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSubmittedNotice(false);
              }}
              placeholder="sungrow@email.com"
              className="w-full pb-1.5 pt-0.5 bg-transparent border-0 border-b border-[#b2b2b2] text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#fe7900] transition-colors rounded-none"
            />
          </div>

          {/* Password Field with Underline Style & Eye Toggle */}
          <div className="relative">
            <label
              htmlFor="login-password"
              className="block text-xs font-normal text-neutral-700 mb-1"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setSubmittedNotice(false);
                }}
                placeholder="Enter your Password"
                className="w-full pb-1.5 pt-0.5 pr-10 bg-transparent border-0 border-b border-[#b2b2b2] text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#fe7900] transition-colors rounded-none"
              />
              <button
                type="button"
                onClick={() => dispatch(toggleShowPassword())}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute right-0 bottom-1.5 text-neutral-500 hover:text-neutral-800 p-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#fe7900] rounded cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me & Forget Password row */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => dispatch(setRememberMe(e.target.checked))}
                className="w-3.5 h-3.5 rounded text-[#fe7900] focus:ring-[#fe7900] border-[#b2b2b2] cursor-pointer"
              />
              <span className="text-neutral-800 text-xs">
                Remember me
              </span>
            </label>

            <a
              href="https://www.sungrowpower.com/in/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#fe7900] hover:underline text-xs font-medium"
            >
              Forget Password?
            </a>
          </div>

          {/* Login Primary Button */}
          <div className="pt-1.5">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full h-11 sm:h-12 rounded-xl text-white text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
                isFormValid
                  ? "bg-[#555555] hover:bg-[#3f3f3f]"
                  : "bg-[#555555]/60 cursor-not-allowed"
              }`}
            >
              Login
            </button>
          </div>

          {/* Divider "or" */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-[1px] bg-neutral-200" />
            <span className="text-[11px] text-neutral-400 font-light lowercase">
              or
            </span>
            <div className="flex-1 h-[1px] bg-neutral-200" />
          </div>

          {/* Secondary Button: Sign in Via email Verification */}
          <button
            type="button"
            onClick={() => setSubmittedNotice(true)}
            className="w-full h-11 sm:h-12 rounded-xl bg-[#fe7900] hover:bg-[#e56d00] text-white text-sm sm:text-base font-semibold transition-colors cursor-pointer shadow-xs"
          >
            Sign in Via email Verification
          </button>

          {/* Footer links: Sign Up & Return to Home */}
          <div className="pt-2 text-center space-y-1.5 text-xs text-neutral-700">
            <p>
              Do not have an account?{" "}
              <a
                href="https://www.sungrowpower.com/in/en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fe7900] font-semibold hover:underline"
              >
                Sign Up
              </a>
            </p>
            <p>
              <Link href="/" className="hover:text-[#fe7900] transition-colors">
                Return to <span className="font-semibold">Home</span>
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* 3. Page Footer: 2025 SUNGROW, Privacy, Contact US */}
      <footer className="w-full text-center py-2 sm:py-3 text-[11px] sm:text-xs text-neutral-600 font-normal">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <span>2025 SUNGROW. All Rights Reserved</span>
          <span>·</span>
          <a
            href="https://www.sungrowpower.com/in/en/privacy-policy-terms"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            Privacy
          </a>
          <span>·</span>
          <a
            href="https://www.sungrowpower.com/in/en/about-us/contact-us"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            Contact US
          </a>
        </div>
      </footer>
    </div>
  );
}
