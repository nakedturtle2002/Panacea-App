"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { mockHealthEntries } from "@/lib/mock-data/health-entries";
import { CATEGORY_LABELS } from "@/lib/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

const filterChips = [
  { id: "all", label: "All" },
  { id: "medication", label: "Medication" },
  { id: "symptoms", label: "Symptoms" },
  { id: "lifestyle", label: "Lifestyle" },
];

export default function HistoryPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredEntries = useMemo(() => {
    if (activeFilter === "all") return mockHealthEntries;
    return mockHealthEntries.filter((e) => e.category === activeFilter);
  }, [activeFilter]);

  const groupedEntries = useMemo(() => {
    const groups: Record<string, typeof mockHealthEntries> = {};
    filteredEntries.forEach((entry) => {
      const dateKey = new Date(entry.date).toDateString();
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(entry);
    });
    return Object.entries(groups).sort(
      ([a], [b]) => new Date(b).getTime() - new Date(a).getTime()
    );
  }, [filteredEntries]);

  return (
    <div className="min-h-screen bg-gradient-main">
      <div className="page-container">
      {/* Back button */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-xl hover:bg-white/60 min-w-[48px] min-h-[48px] flex items-center justify-center transition-colors"
          aria-label="Back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-deep-700">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-heading-1 text-deep-800">History</h1>
      </div>

      {/* Summary */}
      <div className="flex gap-6 mb-5">
        <div>
          <span className="text-heading-2 font-bold text-primary-600">
            {mockHealthEntries.filter((e) => e.category === "medication").length}
          </span>
          <span className="text-body-sm text-deep-400 ml-1">Meds</span>
        </div>
        <div>
          <span className="text-heading-2 font-bold text-amber-500">
            {mockHealthEntries.filter((e) => e.category === "symptoms").length}
          </span>
          <span className="text-body-sm text-deep-400 ml-1">Symptoms</span>
        </div>
        <div>
          <span className="text-heading-2 font-bold text-blue-500">
            {mockHealthEntries.filter((e) => e.category === "lifestyle").length}
          </span>
          <span className="text-body-sm text-deep-400 ml-1">Lifestyle</span>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {filterChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => setActiveFilter(chip.id)}
            className={cn(
              "px-5 py-2.5 rounded-full text-body-sm font-semibold whitespace-nowrap transition-all min-h-[44px]",
              activeFilter === chip.id
                ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow"
                : "bg-white/60 backdrop-blur-sm text-deep-700 border border-white/40 hover:bg-white/80"
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Entry list */}
      {groupedEntries.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-body text-gray-400">No entries found</p>
        </div>
      ) : activeFilter === "all" ? (
        /* ── Gallery view (All tab) ── */
        <div className="space-y-6">
          {groupedEntries.map(([dateStr, entries]) => (
            <div key={dateStr}>
              <h3 className="text-body-sm font-semibold text-deep-500 uppercase tracking-widest mb-3">
                {formatDate(dateStr)}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {entries.map((entry) => {
                  const pillColor =
                    entry.category === "medication"
                      ? "bg-primary-500/80"
                      : entry.category === "symptoms"
                      ? "bg-amber-400/80"
                      : "bg-blue-400/80";
                  const placeholderBg =
                    entry.category === "medication"
                      ? "bg-primary-100"
                      : entry.category === "symptoms"
                      ? "bg-amber-50"
                      : "bg-blue-50";

                  return (
                    <div
                      key={entry.id}
                      className="relative aspect-square rounded-2xl overflow-hidden shadow-soft"
                    >
                      {entry.imageUrl ? (
                        <Image
                          src={entry.imageUrl}
                          alt={entry.notes ?? entry.category}
                          fill
                          className="object-cover"
                          sizes="(max-width: 480px) 33vw, 120px"
                        />
                      ) : (
                        <div className={cn("w-full h-full flex items-center justify-center", placeholderBg)}>
                          {entry.category === "symptoms" ? (
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-amber-500">
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                              <line x1="12" y1="9" x2="12" y2="13" />
                              <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                          ) : entry.category === "lifestyle" ? (
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-blue-400">
                              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                              <line x1="6" y1="1" x2="6" y2="4" />
                              <line x1="10" y1="1" x2="10" y2="4" />
                              <line x1="14" y1="1" x2="14" y2="4" />
                            </svg>
                          ) : (
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-primary-500">
                              <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                              <path d="m8.5 8.5 7 7" />
                            </svg>
                          )}
                        </div>
                      )}

                      {/* Category pill overlay */}
                      <div className="absolute bottom-1.5 left-1.5">
                        <span className={cn(
                          "text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full backdrop-blur-sm leading-none",
                          pillColor
                        )}>
                          {CATEGORY_LABELS[entry.category]}
                        </span>
                      </div>

                      {/* Subtle bottom gradient for legibility */}
                      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ── List view (filtered tabs) ── */
        <div className="space-y-8">
          {groupedEntries.map(([dateStr, entries]) => (
            <div key={dateStr}>
              <h3 className="text-body font-bold text-deep-800 mb-3">
                {formatDate(dateStr)}
              </h3>

              <div className="space-y-2">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-soft"
                  >
                    {/* Thumbnail or icon */}
                    {entry.imageUrl ? (
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={entry.imageUrl}
                          alt={entry.notes ?? entry.category}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                    ) : (
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
                        entry.category === "symptoms" ? "bg-amber-100" : "bg-primary-100"
                      )}>
                        {entry.category === "symptoms" ? (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                          </svg>
                        ) : (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-600">
                            <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                            <path d="m8.5 8.5 7 7" />
                          </svg>
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={entry.category as "medication" | "symptoms" | "lifestyle"}>
                          {CATEGORY_LABELS[entry.category]}
                        </Badge>
                        <span className="text-body-sm text-gray-400">{formatTime(entry.date)}</span>
                      </div>
                      {entry.symptoms && entry.symptoms.length > 0 && (
                        <p className="text-body-sm text-deep-700 font-medium truncate">
                          {entry.symptoms.join(", ")}
                        </p>
                      )}
                      {entry.notes && !entry.symptoms?.length && (
                        <p className="text-body-sm text-gray-600 truncate">{entry.notes}</p>
                      )}
                      {entry.healthData?.glucoseLevel && (
                        <p className="text-body-sm text-gray-500">
                          Glucose: {entry.healthData.glucoseLevel} {entry.healthData.glucoseUnit}
                          {entry.healthData.bloodPressureSystolic &&
                            ` | BP: ${entry.healthData.bloodPressureSystolic}/${entry.healthData.bloodPressureDiastolic}`}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
