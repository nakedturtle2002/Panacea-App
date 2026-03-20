"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { mockPatient } from "@/lib/mock-data/patients";
import { mockNotifications } from "@/lib/mock-data/notifications";
import { EntryCategory } from "@/types/patient";
import { cn } from "@/lib/utils";

const categories: { id: EntryCategory; label: string }[] = [
  { id: "medication", label: "Medication" },
  { id: "symptoms", label: "Symptoms" },
  { id: "lifestyle", label: "Lifestyle" },
];

export default function PatientHomePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const currentCat = categories[activeCategory];
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const handleCapture = () => {
    router.push(`/capture?category=${currentCat.id}&captured=true`);
  };

  // Swipe handling
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

  return (
    <div className="flex flex-col h-[100dvh] bg-navy-900">
      {/* Top bar - minimal */}
      <div className="flex items-center justify-between px-5 py-3 bg-navy-900">
        <p className="text-body font-semibold text-white">
          Hi, {mockPatient.firstName}
        </p>
        <button
          onClick={() => router.push("/notifications")}
          className="relative p-2 rounded-xl min-w-touch min-h-touch flex items-center justify-center"
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Camera viewfinder - fills most of the screen */}
      <div
        className="flex-1 relative mx-3 mb-3 rounded-3xl overflow-hidden bg-navy-800"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Simulated camera view */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Camera grid lines (subtle) */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/10" />
            <div className="absolute right-1/3 top-0 bottom-0 w-px bg-white/10" />
            <div className="absolute top-1/3 left-0 right-0 h-px bg-white/10" />
            <div className="absolute bottom-1/3 left-0 right-0 h-px bg-white/10" />
          </div>

          {/* Center camera icon */}
          <div className="flex flex-col items-center gap-3 opacity-40">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
            <p className="text-white/60 text-body">Camera preview</p>
          </div>
        </div>

        {/* Category chips at top */}
        <div className="absolute top-4 left-0 right-0 flex justify-center gap-2 px-4">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(index)}
              className={cn(
                "px-4 py-2 rounded-full text-body-sm font-semibold transition-all min-h-[40px]",
                activeCategory === index
                  ? "bg-primary-500 text-white shadow-lg"
                  : "bg-black/30 text-white/70 backdrop-blur-sm hover:bg-black/40"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active category indicator */}
        <div className="absolute bottom-24 left-0 right-0 text-center">
          <p className="text-white/50 text-body-sm font-medium">
            {currentCat.label}
          </p>
        </div>

        {/* Shutter button */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <button
            onClick={handleCapture}
            className="w-[72px] h-[72px] rounded-full bg-white border-4 border-primary-400 shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400"
            aria-label={`Take photo for ${currentCat.label}`}
          >
            <div className="w-[58px] h-[58px] rounded-full bg-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
