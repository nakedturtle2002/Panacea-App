"use client";

import { useState, useMemo } from "react";
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

  // Group entries by date
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

  const categoryColors: Record<string, string> = {
    medication: "bg-primary-500",
    symptoms: "bg-amber-500",
    lifestyle: "bg-blue-500",
  };

  return (
    <div className="page-container">
      <h1 className="text-heading-1 text-navy-700 mb-4">History</h1>

      {/* Summary row */}
      <div className="flex gap-4 mb-4 text-center">
        <div className="flex-1">
          <p className="text-2xl font-bold text-primary-600">
            {mockHealthEntries.filter((e) => e.category === "medication").length}
          </p>
          <p className="text-xs text-gray-400">Meds</p>
        </div>
        <div className="flex-1">
          <p className="text-2xl font-bold text-amber-500">
            {mockHealthEntries.filter((e) => e.category === "symptoms").length}
          </p>
          <p className="text-xs text-gray-400">Symptoms</p>
        </div>
        <div className="flex-1">
          <p className="text-2xl font-bold text-blue-500">
            {mockHealthEntries.filter((e) => e.category === "lifestyle").length}
          </p>
          <p className="text-xs text-gray-400">Lifestyle</p>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {filterChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => setActiveFilter(chip.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all min-h-[40px]",
              activeFilter === chip.id
                ? "bg-navy-700 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Gallery view */}
      {groupedEntries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-body">No entries found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedEntries.map(([dateStr, entries]) => (
            <div key={dateStr}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                {formatDate(dateStr)}
              </h3>

              {/* Image grid for entries with photos */}
              {entries.some((e) => e.imageUrl) && (
                <div className="grid grid-cols-3 gap-1.5 mb-2">
                  {entries
                    .filter((e) => e.imageUrl)
                    .map((entry) => (
                      <div
                        key={entry.id}
                        className="aspect-square rounded-xl bg-gray-100 relative overflow-hidden group cursor-pointer"
                      >
                        {/* Photo placeholder */}
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                          </svg>
                        </div>

                        {/* Category indicator */}
                        <div className={cn(
                          "absolute top-1.5 left-1.5 w-2.5 h-2.5 rounded-full",
                          categoryColors[entry.category]
                        )} />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end p-1.5 opacity-0 group-hover:opacity-100">
                          <span className="text-[10px] text-white font-medium bg-black/50 px-1.5 py-0.5 rounded">
                            {formatTime(entry.date)}
                          </span>
                        </div>

                        {/* Health data badge */}
                        {entry.healthData?.glucoseLevel && (
                          <div className="absolute bottom-1.5 right-1.5 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-medium text-navy-700">
                            {entry.healthData.glucoseLevel} mg/dL
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}

              {/* Compact cards for non-photo entries */}
              {entries
                .filter((e) => !e.imageUrl)
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border mb-1.5"
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                      entry.category === "symptoms" ? "bg-amber-100" : "bg-primary-100"
                    )}>
                      {entry.category === "symptoms" ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600">
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          <line x1="12" y1="9" x2="12" y2="13" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-600">
                          <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                          <path d="m8.5 8.5 7 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge variant={entry.category as "medication" | "symptoms" | "lifestyle"} className="text-[10px]">
                          {CATEGORY_LABELS[entry.category]}
                        </Badge>
                        <span className="text-[10px] text-gray-400">{formatTime(entry.date)}</span>
                      </div>
                      {entry.symptoms && entry.symptoms.length > 0 && (
                        <p className="text-xs text-amber-600 mt-0.5 truncate">
                          {entry.symptoms.join(", ")}
                        </p>
                      )}
                      {entry.notes && !entry.symptoms?.length && (
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{entry.notes}</p>
                      )}
                      {entry.healthData?.glucoseLevel && (
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          Glucose: {entry.healthData.glucoseLevel} {entry.healthData.glucoseUnit}
                          {entry.healthData.bloodPressureSystolic &&
                            ` | BP: ${entry.healthData.bloodPressureSystolic}/${entry.healthData.bloodPressureDiastolic}`}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
