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
    <div className="flex flex-col h-[100dvh] bg-gradient-dark">
      {/* Top bar: Profile (left) + Chat (right) */}
      <div className="flex items-center justify-between px-5 py-3">
        <button
          onClick={() => router.push("/profile")}
          className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Profile"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 0 0-16 0" />
          </svg>
        </button>

        {/* Center logo icon */}
        <div className="opacity-60">
          <Image src="/panacea-icon.svg" alt="Panacea" width={28} height={28} className="object-contain brightness-200" />
        </div>

        <button
          onClick={() => router.push("/chat")}
          className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Chat"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
        </button>
      </div>

      {/* Category filter bar */}
      <div className="px-5 pb-3">
        <div
          className="flex items-center justify-center gap-1 bg-white/8 backdrop-blur-sm rounded-full px-1.5 py-1.5"
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
                  ? "bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-glow"
                  : "text-white/60 hover:text-white/80 hover:bg-white/5"
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
        className="flex-1 relative mx-4 rounded-3xl overflow-hidden bg-deep-800/50 backdrop-blur-sm border border-white/5"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Simulated camera view */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Subtle grid */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/10" />
            <div className="absolute right-1/3 top-0 bottom-0 w-px bg-white/10" />
            <div className="absolute top-1/3 left-0 right-0 h-px bg-white/10" />
            <div className="absolute bottom-1/3 left-0 right-0 h-px bg-white/10" />
          </div>

          {/* Center icon */}
          <div className="flex flex-col items-center gap-3 opacity-30">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
            <p className="text-white/40 text-body-sm">Camera preview</p>
          </div>
        </div>

        {/* Category indicator dots */}
        <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-1.5">
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

        {/* Shutter button - large, centered, dominant */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <button
            onClick={handleCapture}
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400"
            aria-label={`Take photo for ${currentCat.label}`}
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(224,247,245,0.95) 100%)",
              boxShadow: "0 0 24px rgba(20, 184, 166, 0.4), 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <div
              className="w-[58px] h-[58px] rounded-full"
              style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #E0F7F5 100%)",
                boxShadow: "inset 0 2px 4px rgba(20, 184, 166, 0.15)",
              }}
            />
          </button>
        </div>
      </div>

      {/* History gallery preview */}
      <div className="px-4 pt-3 pb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-body-sm font-medium text-white/50">Recent</p>
          <button
            onClick={() => router.push("/history")}
            className="text-body-sm text-primary-400 font-medium px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            View all
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {recentEntries.map((entry) => (
            <button
              key={entry.id}
              onClick={() => router.push("/history")}
              className="flex-shrink-0 w-16 h-16 rounded-xl bg-deep-700/80 border border-white/10 flex flex-col items-center justify-center gap-0.5 hover:border-primary-500/40 transition-colors"
            >
              <span className="text-lg">
                {entry.category === "medication" ? "💊" : entry.category === "symptoms" ? "🩺" : "🥗"}
              </span>
              <span className="text-[10px] text-white/40 leading-tight">
                {getRelativeDate(entry.date)}
              </span>
            </button>
          ))}
          {/* Add placeholder for "more" */}
          <button
            onClick={() => router.push("/history")}
            className="flex-shrink-0 w-16 h-16 rounded-xl bg-white/5 border border-dashed border-white/10 flex items-center justify-center hover:border-primary-500/30 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30">
              <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
