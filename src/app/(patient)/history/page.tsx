"use client";

import { useState, useMemo } from "react";
import Tabs from "@/components/ui/Tabs";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { mockHealthEntries } from "@/lib/mock-data/health-entries";
import { CATEGORY_LABELS } from "@/lib/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { EntryCategory } from "@/types/patient";

const filterTabs = [
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

  return (
    <div className="page-container">
      <h1 className="text-heading-1 text-navy-700 mb-6">History</h1>

      {/* Filter tabs */}
      <Tabs
        tabs={filterTabs}
        activeTab={activeFilter}
        onTabChange={setActiveFilter}
        className="mb-6"
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="text-center p-3">
          <p className="text-2xl font-bold text-primary-600">
            {mockHealthEntries.filter((e) => e.category === "medication").length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Medication</p>
        </Card>
        <Card className="text-center p-3">
          <p className="text-2xl font-bold text-amber-500">
            {mockHealthEntries.filter((e) => e.category === "symptoms").length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Symptoms</p>
        </Card>
        <Card className="text-center p-3">
          <p className="text-2xl font-bold text-blue-500">
            {mockHealthEntries.filter((e) => e.category === "lifestyle").length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Lifestyle</p>
        </Card>
      </div>

      {/* Grouped entries */}
      {groupedEntries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-body">No entries found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedEntries.map(([dateStr, entries]) => (
            <div key={dateStr}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {formatDate(dateStr)}
              </h3>
              <div className="space-y-3">
                {entries.map((entry) => (
                  <Card key={entry.id}>
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="w-14 h-14 rounded-xl bg-gray-100 flex-shrink-0 flex items-center justify-center">
                        {entry.imageUrl ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                          </svg>
                        ) : entry.category === "symptoms" ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-500">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                          </svg>
                        ) : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary-500">
                            <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                            <path d="m8.5 8.5 7 7" />
                          </svg>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant={entry.category as "medication" | "symptoms" | "lifestyle"}>
                            {CATEGORY_LABELS[entry.category]}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            {formatTime(entry.date)}
                          </span>
                        </div>
                        {entry.notes && (
                          <p className="text-sm text-navy-700 mb-1">
                            {entry.notes}
                          </p>
                        )}
                        {entry.healthData && (
                          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                            {entry.healthData.glucoseLevel && (
                              <span>
                                Glucose: {entry.healthData.glucoseLevel}{" "}
                                {entry.healthData.glucoseUnit}
                              </span>
                            )}
                            {entry.healthData.bloodPressureSystolic && (
                              <span>
                                BP: {entry.healthData.bloodPressureSystolic}/
                                {entry.healthData.bloodPressureDiastolic} mmHg
                              </span>
                            )}
                          </div>
                        )}
                        {entry.symptoms && entry.symptoms.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {entry.symptoms.map((s) => (
                              <span
                                key={s}
                                className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
