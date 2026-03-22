"use client";

import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import { mockNotifications } from "@/lib/mock-data/notifications";
import { getRelativeDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const typeIcons: Record<string, { bg: string; icon: React.ReactNode }> = {
  medication_reminder: {
    bg: "bg-primary-100",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-600">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m8.5 8.5 7 7" strokeLinecap="round" />
      </svg>
    ),
  },
  visit_reminder: {
    bg: "bg-blue-100",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  smart_caution: {
    bg: "bg-amber-100",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  streak: {
    bg: "bg-green-100",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

export default function NotificationsPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-main">
    <div className="page-container">
      {/* Back button */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/home")}
          className="p-2 rounded-xl hover:bg-white/60 min-w-[48px] min-h-[48px] flex items-center justify-center transition-colors"
          aria-label="Back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-deep-700">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-heading-1 text-deep-800">Notifications</h1>
      </div>

      <div className="space-y-3">
        {mockNotifications.map((notification) => {
          const typeInfo = typeIcons[notification.type] || typeIcons.medication_reminder;

          return (
            <Card
              key={notification.id}
              className={cn(!notification.read && "border-l-4 border-l-primary-400")}
            >
              <div className="flex gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    typeInfo.bg
                  )}
                >
                  {typeInfo.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-deep-800 text-body">
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {getRelativeDate(notification.createdAt)}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
    </div>
  );
}
