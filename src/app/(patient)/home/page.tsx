"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { mockHealthEntries } from "@/lib/mock-data/health-entries";
import { EntryCategory } from "@/types/patient";
import { cn } from "@/lib/utils";
import { getRelativeDate } from "@/lib/utils";

const categories: { id: EntryCategory; label: string; emoji: string }[] = [
  { id: "medication", label: "Medication", emoji: "💊" },
  { id: "symptoms", label: "Symptoms", emoji: "🩺" },
  { id: "lifestyle", label: "Lifestyle", emoji: "🥗" },
];

const categoryPlaceholderStyle: Record<string, { bg: string; border: string; icon: string }> = {
  medication: { bg: "from-primary-100 to-primary-50", border: "border-primary-200/60", icon: "💊" },
  symptoms:   { bg: "from-amber-100 to-amber-50",   border: "border-amber-200/60",   icon: "🩺" },
  lifestyle:  { bg: "from-green-100 to-green-50",   border: "border-green-200/60",   icon: "🥗" },
};

export default function PatientHomePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const currentCat = categories[activeCategory];

  const handleCapture = () => {
    router.push(`/capture?category=${currentCat.id}&captured=true`);
  };

  // Swipe handling for categories
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeCategory < categories.length - 1) {
        setActiveCategory((prev) => prev + 1);
      } else if (diff < 0 && activeCategory > 0) {
        setActiveCategory((prev) => prev - 1);
      }
    }
  };

  // Recent entries for gallery preview
  const recentEntries = mockHealthEntries.slice(0, 4);

  return (
    <div
      className="flex flex-col h-[100dvh] bg-gradient-main"
      style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Top bar: Profile (left) + Logo (center) + Notifications + Chat (right) */}
      <div className="relative flex items-center justify-between px-5 pt-3 pb-2">
        <button
          onClick={() => router.push("/profile")}
          className="w-11 h-11 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-soft flex items-center justify-center hover:bg-white/90 transition-colors"
          aria-label="Profile"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-deep-600">
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 0 0-16 0" />
          </svg>
        </button>

        {/* Center logo icon */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ filter: "drop-shadow(0 0 8px rgba(56,192,200,0.35))" }}>
          <Image src="/panacea-icon.png" alt="Panacea" width={36} height={36} className="object-contain" />
        </div>

        {/* Right: notifications + chat */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/notifications")}
            className="w-11 h-11 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-soft flex items-center justify-center hover:bg-white/90 transition-colors relative"
            aria-label="Notifications"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-deep-600">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            {/* Unread dot */}
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary-500 rounded-full border-2 border-white" />
          </button>

          <button
            onClick={() => router.push("/chat")}
            className="w-11 h-11 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-soft flex items-center justify-center hover:bg-white/90 transition-colors"
            aria-label="Chat with Panacea Health Assistant"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-deep-600">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Category filter bar */}
      <div className="px-5 pb-3">
        <div
          className="flex items-center justify-center gap-1 bg-white/60 backdrop-blur-sm rounded-full px-1.5 py-1.5 border border-white/50 shadow-soft"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(index)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-body-sm font-semibold transition-all duration-200",
                activeCategory === index
                  ? "bg-gradient-to-r from-primary-400 to-primary-600 text-white shadow-glow"
                  : "text-deep-500 hover:text-deep-700 hover:bg-white/60"
              )}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Camera viewfinder - dominant center */}
      <div
        className="flex-1 relative mx-4 rounded-3xl overflow-hidden shadow-soft border border-white/40"
        style={{ background: "linear-gradient(180deg, #1a2a3a 0%, #0c1824 100%)" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Subtle grid */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/10" />
            <div className="absolute right-1/3 top-0 bottom-0 w-px bg-white/10" />
            <div className="absolute top-1/3 left-0 right-0 h-px bg-white/10" />
            <div className="absolute bottom-1/3 left-0 right-0 h-px bg-white/10" />
          </div>

          {/* Center icon */}
          <div className="flex flex-col items-center gap-3 opacity-25">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
            <p className="text-white/40 text-body-sm">Camera preview</p>
          </div>
        </div>

        {/* Category indicator dots */}
        <div className="absolute bottom-28 left-0 right-0 flex justify-center gap-1.5">
          {categories.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeCategory === index
                  ? "w-6 bg-gradient-to-r from-primary-400 to-primary-300"
                  : "w-1.5 bg-white/20"
              )}
            />
          ))}
        </div>

        {/* Shutter button - larger, centered */}
        <div className="absolute bottom-7 left-0 right-0 flex justify-center">
          <button
            onClick={handleCapture}
            className="rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400"
            aria-label={`Take photo for ${currentCat.label}`}
            style={{
              width: 88,
              height: 88,
              background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(90,201,243,0.25) 100%)",
              boxShadow: "0 0 32px rgba(90,201,243,0.6), 0 6px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: 72,
                height: 72,
                background: "linear-gradient(135deg, #FFFFFF 0%, rgba(90,201,243,0.3) 100%)",
                boxShadow: "inset 0 2px 6px rgba(90,201,243,0.25)",
              }}
            />
          </button>
        </div>
      </div>

      {/* History gallery preview */}
      <div className="px-4 pt-4 pb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-body-sm font-semibold text-deep-600">Recent</p>
          <button
            onClick={() => router.push("/history")}
            className="text-body-sm text-primary-600 font-semibold px-2 py-1 rounded-lg hover:bg-primary-50 transition-colors"
          >
            View all
          </button>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
          {recentEntries.map((entry) => {
            const style = categoryPlaceholderStyle[entry.category];
            return (
              <button
                key={entry.id}
                onClick={() => router.push("/history")}
                className={cn(
                  "flex-shrink-0 w-[68px] h-[68px] rounded-2xl border bg-gradient-to-br flex flex-col items-center justify-center gap-0.5 hover:scale-105 transition-transform shadow-soft",
                  style.bg,
                  style.border
                )}
              >
                <span className="text-xl">{style.icon}</span>
                <span className="text-[10px] font-medium text-deep-500 leading-tight">
                  {getRelativeDate(entry.date)}
                </span>
              </button>
            );
          })}
          {/* "More" button */}
          <button
            onClick={() => router.push("/history")}
            className="flex-shrink-0 w-[68px] h-[68px] rounded-2xl border border-dashed border-primary-200 bg-primary-50/50 flex flex-col items-center justify-center gap-1 hover:border-primary-400 hover:bg-primary-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-400">
              <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[10px] font-medium text-primary-400">All</span>
          </button>
        </div>
      </div>
    </div>
  );
}
