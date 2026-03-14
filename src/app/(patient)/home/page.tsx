"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { mockPatient, mockMedicalRecord } from "@/lib/mock-data/patients";
import { mockHealthEntries } from "@/lib/mock-data/health-entries";
import { mockNotifications } from "@/lib/mock-data/notifications";
import { EntryCategory } from "@/types/patient";
import { CATEGORY_LABELS } from "@/lib/constants";
import { getRelativeDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const categories: { id: EntryCategory; label: string; color: string; bgColor: string; icon: React.ReactNode }[] = [
  {
    id: "medication",
    label: "Medication",
    color: "text-primary-600",
    bgColor: "bg-primary-500",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
      </svg>
    ),
  },
  {
    id: "symptoms",
    label: "Symptoms",
    color: "text-amber-600",
    bgColor: "bg-amber-500",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    color: "text-blue-600",
    bgColor: "bg-blue-500",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 11h.01" />
        <path d="M11 15h.01" />
        <path d="M16 16c.5-1.5.85-3.22 1-5 .15-1.78-.04-3.56-.56-5.22A13.3 13.3 0 0 0 12 1a13.38 13.38 0 0 0-4.44 4.78A13.2 13.2 0 0 0 7 11c.15 1.78.5 3.5 1 5" />
        <path d="M9 18c.59.63 1.26 1.16 2 1.58a12.32 12.32 0 0 0 2-1.58" />
      </svg>
    ),
  },
];

const quickActions = [
  {
    id: "glucose",
    label: "Glucose",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4l0 16" />
        <path d="M10 4l0 16" />
        <path d="M6 8l0 8" />
        <path d="M18 8l0 8" />
      </svg>
    ),
  },
  {
    id: "bp",
    label: "Blood Pressure",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    id: "symptoms",
    label: "Symptoms",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    id: "notes",
    label: "Notes",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
  },
];

export default function PatientHomePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentCat = categories[activeCategory];
  const unreadNotifications = mockNotifications.filter((n) => !n.read);
  const medicationStreak = 3;

  const recentEntries = mockHealthEntries.slice(0, 3);

  const handleCapture = () => {
    router.push(`/capture?category=${currentCat.id}`);
  };

  const handleQuickAction = (actionId: string) => {
    if (actionId === "symptoms") {
      router.push("/capture?category=symptoms");
    } else {
      router.push(`/capture?category=medication&action=${actionId}`);
    }
  };

  // Handle horizontal swipe on the capture zone
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeCategory < categories.length - 1) {
        setActiveCategory(activeCategory + 1);
      } else if (diff < 0 && activeCategory > 0) {
        setActiveCategory(activeCategory - 1);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 pb-24">
      {/* Compact header */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Avatar name={`${mockPatient.firstName} ${mockPatient.lastName}`} size="sm" />
          <div>
            <p className="text-body font-medium text-navy-700">
              Hi, {mockPatient.firstName}!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Streak badge */}
          <div className="flex items-center gap-1 bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full text-sm font-medium mr-1">
            <span>🔥</span>
            <span>{medicationStreak}</span>
          </div>
          <button
            onClick={() => router.push("/notifications")}
            className="relative p-2 rounded-xl hover:bg-gray-100 min-w-touch min-h-touch flex items-center justify-center"
            aria-label={`Notifications${unreadNotifications.length > 0 ? `, ${unreadNotifications.length} unread` : ""}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy-700">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            {unreadNotifications.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {unreadNotifications.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Capture zone */}
      <div
        className="relative rounded-3xl overflow-hidden mb-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Camera preview area */}
        <div className={cn(
          "aspect-[4/5] rounded-3xl flex flex-col items-center justify-center transition-colors duration-300",
          activeCategory === 0 && "bg-gradient-to-b from-primary-100 to-primary-50",
          activeCategory === 1 && "bg-gradient-to-b from-amber-100 to-amber-50",
          activeCategory === 2 && "bg-gradient-to-b from-blue-100 to-blue-50",
        )}>
          {/* Category label at top */}
          <div className="absolute top-4 left-0 right-0 text-center">
            <span className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-white/80 backdrop-blur-sm",
              currentCat.color
            )}>
              {currentCat.icon}
              {currentCat.label}
            </span>
          </div>

          {/* Center capture button */}
          <button
            onClick={handleCapture}
            className="flex flex-col items-center gap-4"
            aria-label={`Capture ${currentCat.label}`}
          >
            <div className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95",
              currentCat.bgColor
            )}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </div>
            <p className="text-body font-medium text-navy-700">
              Tap to log {currentCat.label.toLowerCase()}
            </p>
          </button>

          {/* Swipe hint */}
          <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400">
            Swipe to change category
          </p>
        </div>
      </div>

      {/* Category selector strip (Instagram filter style) */}
      <div className="flex justify-center gap-3 mb-6" ref={scrollRef}>
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(index)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all min-h-touch",
              activeCategory === index
                ? cn("text-white shadow-md", cat.bgColor)
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            )}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Quick action bar */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3">
          Quick log
        </p>
        <div className="flex justify-between">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.id)}
              className="flex flex-col items-center gap-1.5 min-w-touch group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-primary-50 flex items-center justify-center text-gray-500 group-hover:text-primary-600 transition-colors">
                {action.icon}
              </div>
              <span className="text-xs text-gray-500 group-hover:text-navy-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent entries preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
            Recent
          </p>
          <button
            onClick={() => router.push("/history")}
            className="text-xs text-primary-600 font-medium hover:underline min-h-touch flex items-center"
          >
            View all
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {recentEntries.map((entry) => (
            <div
              key={entry.id}
              className="aspect-square rounded-xl bg-gray-100 flex flex-col items-center justify-center relative overflow-hidden"
            >
              {entry.imageUrl ? (
                <>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <div className="absolute bottom-1 left-1">
                    <Badge variant={entry.category as "medication" | "symptoms" | "lifestyle"} className="text-[10px] px-1.5 py-0.5">
                      {CATEGORY_LABELS[entry.category]}
                    </Badge>
                  </div>
                </>
              ) : (
                <>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mb-1",
                    entry.category === "symptoms" ? "bg-amber-100 text-amber-500" : "bg-primary-100 text-primary-500"
                  )}>
                    {categories.find((c) => c.id === entry.category)?.icon}
                  </div>
                  <p className="text-[10px] text-gray-500 text-center px-1 line-clamp-2">
                    {entry.symptoms?.join(", ") || entry.notes?.slice(0, 30)}
                  </p>
                </>
              )}
              <span className="absolute top-1 right-1 text-[9px] text-gray-400">
                {getRelativeDate(entry.date)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
