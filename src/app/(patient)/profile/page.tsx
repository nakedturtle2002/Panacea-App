"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { mockPatient, mockMedicalRecord } from "@/lib/mock-data/patients";
import { mockTreatingDoctor } from "@/lib/mock-data/doctors";
import { mockHealthEntries } from "@/lib/mock-data/health-entries";
import { getPatientProfile, hasPatientProfile, PatientProfile } from "@/lib/patient-store";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [profile, setProfile] = useState<PatientProfile | null>(null);

  useEffect(() => {
    if (hasPatientProfile()) {
      setProfile(getPatientProfile());
    }
  }, []);

  // Use persisted profile data if available, otherwise fall back to mock
  const firstName = profile?.firstName || mockPatient.firstName;
  const lastName = profile?.lastName || mockPatient.lastName;
  const fullName = `${firstName} ${lastName}`;
  const patientId = profile?.patientId || mockPatient.patientId;
  const dateOfBirth = profile?.dateOfBirth || mockPatient.dateOfBirth;
  const gender = profile?.gender || mockPatient.gender;
  const phone = profile
    ? `${profile.countryCode} ${profile.phone}`
    : mockPatient.phone;
  const hospitalName = profile?.hospitalName || mockPatient.hospitalName;

  const glucoseEntries = mockHealthEntries
    .filter((e) => e.healthData?.glucoseLevel)
    .map((e) => e.healthData!.glucoseLevel!);
  const avgGlucose =
    glucoseEntries.length > 0
      ? Math.round(glucoseEntries.reduce((a, b) => a + b, 0) / glucoseEntries.length)
      : null;

  const bpEntries = mockHealthEntries.filter((e) => e.healthData?.bloodPressureSystolic);
  const lastBp = bpEntries[0]?.healthData;

  // Build hospital list using patient's entered hospital
  const linkedHospitals = [
    {
      id: "mr1",
      hospitalName: hospitalName,
      diagnosis: "Type 2 Diabetes Mellitus",
      diseaseType: "diabetes",
      doctor: mockTreatingDoctor
        ? `${mockTreatingDoctor.firstName} ${mockTreatingDoctor.lastName}`
        : "Dr. Assigned",
      active: true,
    },
  ];

  return (
    <div className="page-container">
      {/* Profile header */}
      <div className="flex flex-col items-center mb-10">
        <Avatar name={fullName} size="lg" className="mb-4" />
        <h1 className="text-heading-1 text-navy-700">{fullName}</h1>
        <p className="text-body text-gray-500 mt-1">
          Patient ID: {patientId}
        </p>
      </div>

      {/* Health summary */}
      <section className="mb-8">
        <div className="grid grid-cols-2 gap-3">
          <Card className="text-center">
            <p className="text-heading-2 font-bold text-navy-700">{avgGlucose ?? "--"}</p>
            <p className="text-body-sm text-gray-500 mt-1">Avg Glucose (mg/dL)</p>
          </Card>
          <Card className="text-center">
            <p className="text-heading-2 font-bold text-navy-700">
              {lastBp ? `${lastBp.bloodPressureSystolic}/${lastBp.bloodPressureDiastolic}` : "--"}
            </p>
            <p className="text-body-sm text-gray-500 mt-1">Last BP (mmHg)</p>
          </Card>
          <Card className="text-center">
            <p className="text-heading-2 font-bold text-navy-700">{mockHealthEntries.length}</p>
            <p className="text-body-sm text-gray-500 mt-1">Total Entries</p>
          </Card>
          <Card className="text-center">
            <p className="text-heading-2 font-bold text-primary-600">3</p>
            <p className="text-body-sm text-gray-500 mt-1">Med Streak</p>
          </Card>
        </div>
      </section>

      {/* Next visit */}
      <section className="mb-8">
        <Card className="bg-primary-50 border-primary-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body-sm text-primary-700 font-semibold">Next follow-up</p>
              <p className="text-heading-3 text-navy-700">
                {formatDate(mockMedicalRecord.nextFollowUp)}
              </p>
            </div>
            <Badge variant="medication">Upcoming</Badge>
          </div>
        </Card>
      </section>

      {/* My Hospitals */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading-2 text-navy-700">My Hospitals</h2>
          <Button variant="ghost" size="sm" className="text-primary-600">
            + Add
          </Button>
        </div>
        <div className="space-y-3">
          {linkedHospitals.map((hospital) => (
            <Card
              key={hospital.id}
              className={cn(hospital.active && "border-primary-300 bg-primary-50/50")}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    hospital.active ? "bg-primary-100" : "bg-gray-100"
                  )}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={hospital.active ? "text-primary-600" : "text-gray-400"}>
                      <path d="M3 21h18" />
                      <path d="M5 21V7l8-4v18" />
                      <path d="M19 21V11l-6-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-body font-semibold text-navy-700">
                      {hospital.hospitalName}
                    </p>
                    <p className="text-body-sm text-gray-500">{hospital.diagnosis}</p>
                  </div>
                </div>
                {hospital.active && <Badge variant="success">Active</Badge>}
              </div>
              <div className="flex items-center justify-between text-body-sm text-gray-400 mt-2">
                <span>{hospital.doctor}</span>
                <span className="capitalize">{hospital.diseaseType}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Treating Doctor */}
      <section className="mb-8">
        <h2 className="text-heading-2 text-navy-700 mb-4">Treating Doctor</h2>
        <Card>
          <div className="flex items-center gap-4">
            <Avatar name={`${mockTreatingDoctor.firstName} ${mockTreatingDoctor.lastName}`} size="md" />
            <div className="flex-1">
              <p className="text-body font-semibold text-navy-700">
                {mockTreatingDoctor.firstName} {mockTreatingDoctor.lastName}
              </p>
              <p className="text-body-sm text-gray-500">{mockTreatingDoctor.specialty}</p>
              <p className="text-body-sm text-gray-400">{mockTreatingDoctor.hospitalName}</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Prescriptions */}
      <section className="mb-8">
        <h2 className="text-heading-2 text-navy-700 mb-4">Prescriptions</h2>
        <div className="space-y-3">
          {mockMedicalRecord.prescriptions.map((rx, i) => (
            <Card key={i}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-body font-semibold text-navy-700">{rx.name}</p>
                  <p className="text-body-sm text-primary-600 font-medium">{rx.dosage}</p>
                </div>
                <Badge variant="default">{rx.frequency}</Badge>
              </div>
              <p className="text-body-sm text-gray-500">{rx.instructions}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Personal info - uses persisted data */}
      <section className="mb-8">
        <h2 className="text-heading-2 text-navy-700 mb-4">Personal Information</h2>
        <Card>
          <div className="space-y-4">
            {[
              { label: "Date of Birth", value: dateOfBirth ? formatDate(dateOfBirth) : "--" },
              { label: "Gender", value: gender, capitalize: true },
              { label: "Phone", value: phone },
            ].map((item) => (
              <div key={item.label} className="flex justify-between">
                <span className="text-body text-gray-500">{item.label}</span>
                <span className={cn("text-body font-semibold text-navy-700", "capitalize" in item && item.capitalize && "capitalize")}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Settings */}
      <section className="mb-8">
        <h2 className="text-heading-2 text-navy-700 mb-4">Settings</h2>
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {[
            { label: "Change Password", icon: "M7 11V7a5 5 0 0 1 10 0v4" },
            { label: "Notifications", icon: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" },
            { label: "Privacy", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" },
            { label: "Log Out", icon: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", danger: true },
          ].map((item, i) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 text-left transition-colors min-h-touch",
                "hover:bg-gray-50",
                i < 3 && "border-b border-border",
                "danger" in item && item.danger ? "text-red-500" : "text-navy-700"
              )}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 flex-shrink-0">
                <path d={item.icon} />
              </svg>
              <span className="text-body font-medium flex-1">{item.label}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300">
                <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </section>

      <p className="text-body-sm text-gray-300 text-center pb-4">
        Panacea v0.1.0
      </p>
    </div>
  );
}
