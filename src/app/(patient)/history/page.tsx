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

  const categoryDot: Record<string, string> = {
    medication: "bg-primary-500",
    symptoms: "bg-amber-500",
    lifestyle: "bg-blue-500",
  };

  return (
    <div className="page-container">
      <h1 className="text-heading-1 text-navy-700 mb-2">History</h1>

      {/* Summary */}
      <div className="flex gap-6 mb-5">
        <div>
          <span className="text-heading-2 font-bold text-primary-600">
            {mockHealthEntries.filter((e) => e.category === "medication").length}
          </span>
          <span className="text-body-sm text-gray-500 ml-1">Meds</span>
        </div>
        <div>
          <span className="text-heading-2 font-bold text-amber-500">
            {mockHealthEntries.filter((e) => e.category === "symptoms").length}
          </span>
          <span className="text-body-sm text-gray-500 ml-1">Symptoms</span>
        </div>
        <div>
          <span className="text-heading-2 font-bold text-blue-500">
            {mockHealthEntries.filter((e) => e.category === "lifestyle").length}
          </span>
          <span className="text-body-sm text-gray-500 ml-1">Lifestyle</span>
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
                ? "bg-primary-600 text-white shadow-sm"
                : "bg-gray-100 text-navy-700 hover:bg-gray-200"
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Gallery view */}
      {groupedEntries.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-body text-gray-400">No entries found</p>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedEntries.map(([dateStr, entries]) => (
            <div key={dateStr}>
              <h3 className="text-body font-bold text-navy-700 mb-3">
                {formatDate(dateStr)}
              </h3>

              {/* Photo grid */}
              {entries.some((e) => e.imageUrl) && (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {entries
                    .filter((e) => e.imageUrl)
                    .map((entry) => (
                      <div
                        key={entry.id}
                        className="aspect-square rounded-2xl bg-gray-100 relative overflow-hidden"
                      >
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                          </svg>
                        </div>

                        {/* Category dot */}
                        <div className={cn(
                          "absolute top-2 left-2 w-3 h-3 rounded-full border-2 border-white",
                          categoryDot[entry.category]
                        )} />

                        {/* Health data overlay */}
                        {entry.healthData?.glucoseLevel && (
                          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                            <span className="text-body-sm font-semibold text-navy-700">
                              {entry.healthData.glucoseLevel}
                            </span>
                            <span className="text-[11px] text-gray-500 ml-0.5">mg/dL</span>
                          </div>
                        )}

                        {/* Time */}
                        <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                          <span className="text-[11px] text-white font-medium">
                            {formatTime(entry.date)}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* Non-photo entries */}
              {entries
                .filter((e) => !e.imageUrl)
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border mb-2"
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
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
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={entry.category as "medication" | "symptoms" | "lifestyle"}>
                          {CATEGORY_LABELS[entry.category]}
                        </Badge>
                        <span className="text-body-sm text-gray-400">{formatTime(entry.date)}</span>
                      </div>
                      {entry.symptoms && entry.symptoms.length > 0 && (
                        <p className="text-body-sm text-amber-700 font-medium truncate">
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
          ))}
        </div>
      )}
    </div>
  );
}
