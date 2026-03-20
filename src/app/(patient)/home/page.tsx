"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { mockNotifications } from "@/lib/mock-data/notifications";
import { EntryCategory } from "@/types/patient";
import { cn } from "@/lib/utils";

const categories: { id: EntryCategory; label: string; icon: string }[] = [
  { id: "medication", label: "Medication", icon: "M9 3h6v2H9zM12 8v6M9 11h6M5 7h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" },
  { id: "symptoms", label: "Symptoms", icon: "M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "lifestyle", label: "Lifestyle", icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" },
];

const quickActions = [
  { id: "bp", label: "Blood Pressure", icon: "M22 12h-4l-3 9L9 3l-3 9H2", color: "bg-red-500" },
  { id: "glucose", label: "Glucose", icon: "M12 2v6m0 12v2M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m12 0h2M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24", color: "bg-blue-500" },
  { id: "symptoms", label: "Symptoms", icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8", color: "bg-amber-500" },
  { id: "notes", label: "Notes", icon: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z", color: "bg-primary-500" },
];

export default function PatientHomePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const currentCat = categories[activeCategory];
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const handleCapture = () => {
    router.push(`/capture?category=${currentCat.id}&captured=true`);
  };

  const handleQuickAction = (actionId: string) => {
    router.push(`/capture?action=${actionId}`);
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
      {/* Top bar - notification only */}
      <div className="flex items-center justify-end px-5 py-3 bg-navy-900">
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

      {/* Camera viewfinder */}
      <div
        className="flex-1 relative mx-3 mb-2 rounded-3xl overflow-hidden bg-navy-800"
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

        {/* Instagram-style category filter bar */}
        <div className="absolute bottom-28 left-0 right-0 flex justify-center">
          <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md rounded-full px-2 py-1.5">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(index)}
                className={cn(
                  "px-5 py-2 rounded-full text-body-sm font-semibold transition-all min-h-[40px]",
                  activeCategory === index
                    ? "bg-primary-500 text-white shadow-lg"
                    : "text-white/70 hover:text-white"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Swipe hint dots */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1.5">
          {categories.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all",
                activeCategory === index ? "bg-primary-400 w-3" : "bg-white/30"
              )}
            />
          ))}
        </div>

        {/* Shutter button */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center">
          <button
            onClick={handleCapture}
            className="w-[72px] h-[72px] rounded-full bg-white border-4 border-primary-400 shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400"
            aria-label={`Take photo for ${currentCat.label}`}
          >
            <div className="w-[58px] h-[58px] rounded-full bg-white" />
          </button>
        </div>
      </div>

      {/* Quick action bar - Instagram-style icons */}
      <div className="px-4 pb-20 pt-2 bg-navy-900">
        <div className="flex items-center justify-around">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.id)}
              className="flex flex-col items-center gap-1.5 py-2 px-3 min-w-touch min-h-touch rounded-xl transition-colors group"
              aria-label={action.label}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95",
                action.color
              )}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d={action.icon} />
                </svg>
              </div>
              <span className="text-xs font-medium text-white/60 group-hover:text-white/80">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
