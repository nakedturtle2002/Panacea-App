"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Tabs from "@/components/ui/Tabs";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { mockPatient, mockMedicalRecord } from "@/lib/mock-data/patients";
import { mockHealthEntries } from "@/lib/mock-data/health-entries";
import { mockNotifications } from "@/lib/mock-data/notifications";
import { EntryCategory } from "@/types/patient";
import { CATEGORY_LABELS } from "@/lib/constants";
import { formatDate, getRelativeDate } from "@/lib/utils";

const tabs = [
  { id: "medication", label: "Medication" },
  { id: "symptoms", label: "Symptoms" },
  { id: "lifestyle", label: "Lifestyle" },
];

export default function PatientHomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("medication");

  const filteredEntries = mockHealthEntries.filter(
    (e) => e.category === activeTab
  );

  const unreadNotifications = mockNotifications.filter((n) => !n.read);
  const medicationStreak = 3; // mock streak

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Avatar name={`${mockPatient.firstName} ${mockPatient.lastName}`} />
          <div>
            <p className="text-body font-medium text-navy-700">
              Hi, {mockPatient.firstName}!
            </p>
            <p className="text-sm text-gray-500">
              {mockMedicalRecord.diagnosis}
            </p>
          </div>
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
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadNotifications.length}
            </span>
          )}
        </button>
      </div>

      {/* Streak card */}
      <Card className="mb-6 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🔥</div>
          <div>
            <p className="font-semibold text-navy-700">
              {medicationStreak}-day medication streak!
            </p>
            <p className="text-sm text-primary-700">
              Keep logging your medication photos to maintain it.
            </p>
          </div>
        </div>
      </Card>

      {/* Quick actions */}
      <div className="flex gap-3 mb-6">
        <Button
          fullWidth
          onClick={() => router.push("/capture")}
          size="lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
          Capture
        </Button>
        <Button
          fullWidth
          variant="secondary"
          onClick={() => router.push("/history")}
          size="lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          History
        </Button>
      </div>

      {/* Next visit reminder */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Next follow-up visit</p>
            <p className="font-semibold text-navy-700">
              {formatDate(mockMedicalRecord.nextFollowUp)}
            </p>
          </div>
          <Badge variant="medication">Upcoming</Badge>
        </div>
      </Card>

      {/* Category tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-4"
      />

      {/* Entries */}
      <div className="space-y-3">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-body">
              No {CATEGORY_LABELS[activeTab]?.toLowerCase()} entries yet
            </p>
            <Button
              variant="ghost"
              className="mt-2"
              onClick={() => router.push("/capture")}
            >
              Add your first entry
            </Button>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="flex gap-4">
              {entry.imageUrl ? (
                <div className="w-16 h-16 rounded-xl bg-gray-200 flex-shrink-0 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-amber-50 flex-shrink-0 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-500">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={entry.category as "medication" | "symptoms" | "lifestyle"}>
                    {CATEGORY_LABELS[entry.category]}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    {getRelativeDate(entry.date)}
                  </span>
                </div>
                {entry.notes && (
                  <p className="text-sm text-navy-700 truncate">{entry.notes}</p>
                )}
                {entry.healthData?.glucoseLevel && (
                  <p className="text-sm text-gray-500">
                    Glucose: {entry.healthData.glucoseLevel} {entry.healthData.glucoseUnit}
                  </p>
                )}
                {entry.symptoms && entry.symptoms.length > 0 && (
                  <p className="text-sm text-amber-600">
                    {entry.symptoms.join(", ")}
                  </p>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
