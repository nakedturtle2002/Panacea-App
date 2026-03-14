"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { mockPatient, mockMedicalRecord } from "@/lib/mock-data/patients";
import { mockTreatingDoctor } from "@/lib/mock-data/doctors";
import { mockHealthEntries } from "@/lib/mock-data/health-entries";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockLinkedHospitals = [
  {
    id: "mr1",
    hospitalName: "Bangkok General Hospital",
    diagnosis: "Type 2 Diabetes Mellitus",
    diseaseType: "diabetes",
    doctor: "Dr. Piyawan Srisuk",
    active: true,
  },
  {
    id: "mr2",
    hospitalName: "Bumrungrad International Hospital",
    diagnosis: "Mild Eczema",
    diseaseType: "dermatology",
    doctor: "Dr. Nattapong Wongchai",
    active: false,
  },
];

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const fullName = `${mockPatient.firstName} ${mockPatient.lastName}`;

  // Calculate health summary
  const glucoseEntries = mockHealthEntries
    .filter((e) => e.healthData?.glucoseLevel)
    .map((e) => e.healthData!.glucoseLevel!);
  const avgGlucose =
    glucoseEntries.length > 0
      ? Math.round(
          glucoseEntries.reduce((a, b) => a + b, 0) / glucoseEntries.length
        )
      : null;

  const bpEntries = mockHealthEntries.filter(
    (e) => e.healthData?.bloodPressureSystolic
  );
  const lastBp = bpEntries[0]?.healthData;

  return (
    <div className="page-container">
      {/* Profile header */}
      <div className="flex flex-col items-center mb-8">
        <Avatar name={fullName} size="lg" className="mb-3" />
        <h1 className="text-heading-2 text-navy-700">{fullName}</h1>
        <p className="text-body text-gray-500">
          Patient ID: {mockPatient.patientId}
        </p>
      </div>

      {/* Health summary cards */}
      <section className="mb-6">
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white rounded-xl border border-border p-2.5 text-center">
            <p className="text-lg font-bold text-navy-700">{avgGlucose ?? "--"}</p>
            <p className="text-[10px] text-gray-400">Avg Glucose</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-2.5 text-center">
            <p className="text-lg font-bold text-navy-700">
              {lastBp ? `${lastBp.bloodPressureSystolic}/${lastBp.bloodPressureDiastolic}` : "--"}
            </p>
            <p className="text-[10px] text-gray-400">Last BP</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-2.5 text-center">
            <p className="text-lg font-bold text-navy-700">{mockHealthEntries.length}</p>
            <p className="text-[10px] text-gray-400">Entries</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-2.5 text-center">
            <p className="text-lg font-bold text-primary-600">3</p>
            <p className="text-[10px] text-gray-400">Streak</p>
          </div>
        </div>
      </section>

      {/* My Hospitals (multi-record support) */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title mb-0">My Hospitals</h2>
          <Button variant="ghost" size="sm" className="text-primary-600 text-sm">
            + Add
          </Button>
        </div>
        <div className="space-y-3">
          {mockLinkedHospitals.map((hospital) => (
            <Card
              key={hospital.id}
              className={cn(
                hospital.active && "border-primary-300 bg-primary-50/50"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    hospital.active ? "bg-primary-100" : "bg-gray-100"
                  )}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={hospital.active ? "text-primary-600" : "text-gray-400"}>
                      <path d="M3 21h18" />
                      <path d="M5 21V7l8-4v18" />
                      <path d="M19 21V11l-6-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-navy-700 text-sm">
                      {hospital.hospitalName}
                    </p>
                    <p className="text-xs text-gray-500">{hospital.diagnosis}</p>
                  </div>
                </div>
                {hospital.active && (
                  <Badge variant="success" className="text-[10px]">Active</Badge>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{hospital.doctor}</span>
                <span className="capitalize">{hospital.diseaseType}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Treating Doctor */}
      <section className="mb-6">
        <h2 className="section-title">Treating Doctor</h2>
        <Card>
          <div className="flex items-center gap-3">
            <Avatar name={`${mockTreatingDoctor.firstName} ${mockTreatingDoctor.lastName}`} size="md" />
            <div className="flex-1">
              <p className="font-semibold text-navy-700">
                {mockTreatingDoctor.firstName} {mockTreatingDoctor.lastName}
              </p>
              <p className="text-sm text-gray-500">{mockTreatingDoctor.specialty}</p>
              <p className="text-xs text-gray-400">{mockTreatingDoctor.hospitalName}</p>
            </div>
            {mockTreatingDoctor.phone && (
              <a
                href={`tel:${mockTreatingDoctor.phone}`}
                className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 hover:bg-primary-100"
                aria-label="Call doctor"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
            )}
          </div>
        </Card>
      </section>

      {/* Prescriptions */}
      <section className="mb-6">
        <h2 className="section-title">Prescriptions</h2>
        <div className="space-y-3">
          {mockMedicalRecord.prescriptions.map((rx, i) => (
            <Card key={i}>
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="font-semibold text-navy-700">{rx.name}</p>
                  <p className="text-sm text-primary-600">{rx.dosage}</p>
                </div>
                <Badge variant="default" className="text-xs">{rx.frequency}</Badge>
              </div>
              <p className="text-xs text-gray-500">{rx.instructions}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Personal info */}
      <section className="mb-6">
        <h2 className="section-title">Personal Information</h2>
        <Card>
          <div className="space-y-2.5">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Date of Birth</span>
              <span className="font-medium text-navy-700 text-sm">
                {formatDate(mockPatient.dateOfBirth)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Gender</span>
              <span className="font-medium text-navy-700 text-sm capitalize">
                {mockPatient.gender}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Phone</span>
              <span className="font-medium text-navy-700 text-sm">
                {mockPatient.phone}
              </span>
            </div>
            {mockPatient.email && (
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Email</span>
                <span className="font-medium text-navy-700 text-sm">
                  {mockPatient.email}
                </span>
              </div>
            )}
          </div>
        </Card>
      </section>

      {/* Next visit */}
      <section className="mb-6">
        <Card className="bg-primary-50 border-primary-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-primary-600 font-medium">Next follow-up visit</p>
              <p className="font-semibold text-navy-700">
                {formatDate(mockMedicalRecord.nextFollowUp)}
              </p>
            </div>
            <Badge variant="medication">Upcoming</Badge>
          </div>
        </Card>
      </section>

      {/* Privacy & Settings */}
      <section className="mb-6">
        <h2 className="section-title">Privacy & Settings</h2>
        <div className="space-y-1">
          {[
            {
              label: "Change Password",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              ),
            },
            {
              label: "Notification Preferences",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              ),
            },
            {
              label: "Data Privacy",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              ),
            },
            {
              label: "Account Security",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              ),
            },
            {
              label: "Log Out",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              ),
              danger: true,
            },
          ].map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left hover:bg-gray-50 transition-colors min-h-touch",
                "danger" in item && item.danger ? "text-red-500" : "text-navy-700"
              )}
            >
              <span className="text-gray-400">{item.icon}</span>
              <span className="text-body font-medium">{item.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto text-gray-300">
                <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </section>

      <p className="text-xs text-gray-300 text-center pb-4">
        Panacea v0.1.0
      </p>
    </div>
  );
}
