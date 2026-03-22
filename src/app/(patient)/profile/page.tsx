"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [additionalHospitals, setAdditionalHospitals] = useState<string[]>([]);
  const [showAddHospital, setShowAddHospital] = useState(false);
  const [newHospitalInput, setNewHospitalInput] = useState("");

  useEffect(() => {
    if (hasPatientProfile()) {
      setProfile(getPatientProfile());
    }
  }, []);

  const handleAddHospital = () => {
    const name = newHospitalInput.trim();
    if (!name) return;
    setAdditionalHospitals((prev) => [...prev, name]);
    setNewHospitalInput("");
    setShowAddHospital(false);
  };

  const firstName = profile?.firstName || mockPatient.firstName;
  const lastName = profile?.lastName || mockPatient.lastName;
  const fullName = `${firstName} ${lastName}`;
  const patientId = profile?.patientId || mockPatient.patientId;
  const dateOfBirth = profile?.dateOfBirth || mockPatient.dateOfBirth;
  const gender = profile?.gender || mockPatient.gender;
  const phone = profile ? `${profile.countryCode} ${profile.phone}` : mockPatient.phone;
  const hospitalName = profile?.hospitalName || mockPatient.hospitalName;

  const glucoseEntries = mockHealthEntries
    .filter((e) => e.healthData?.glucoseLevel)
    .map((e) => e.healthData!.glucoseLevel!);
  const avgGlucose = glucoseEntries.length > 0
    ? Math.round(glucoseEntries.reduce((a, b) => a + b, 0) / glucoseEntries.length)
    : null;

  const bpEntries = mockHealthEntries.filter((e) => e.healthData?.bloodPressureSystolic);
  const lastBp = bpEntries[0]?.healthData;

  return (
    <div className="min-h-screen bg-gradient-main">
      <div className="page-container">
        {/* Back button */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.push("/home")}
            className="p-2 rounded-xl hover:bg-white/60 min-w-touch min-h-touch flex items-center justify-center transition-colors"
            aria-label="Back to home"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-deep-700">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-heading-2 text-deep-800">Profile</h1>
        </div>

        {/* Profile header */}
        <div className="flex flex-col items-center mb-10">
          <div className="mb-4 glow-soft rounded-full">
            <Avatar name={fullName} size="lg" className="ring-4 ring-white/50" />
          </div>
          <h2 className="text-heading-1 text-deep-800">{fullName}</h2>
          <p className="text-body text-deep-400 mt-1">
            Patient ID: {patientId}
          </p>
        </div>

        {/* Health summary */}
        <section className="mb-8">
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <p className="text-heading-2 font-bold text-deep-800">{avgGlucose ?? "--"}</p>
              <p className="text-body-sm text-deep-400 mt-1">Avg Glucose (mg/dL)</p>
            </Card>
            <Card>
              <p className="text-heading-2 font-bold text-deep-800">
                {lastBp ? `${lastBp.bloodPressureSystolic}/${lastBp.bloodPressureDiastolic}` : "--"}
              </p>
              <p className="text-body-sm text-deep-400 mt-1">Last BP (mmHg)</p>
            </Card>
            <Card>
              <p className="text-heading-2 font-bold text-deep-800">{mockHealthEntries.length}</p>
              <p className="text-body-sm text-deep-400 mt-1">Total Entries</p>
            </Card>
            <Card>
              <p className="text-heading-2 font-bold text-primary-600">3</p>
              <p className="text-body-sm text-deep-400 mt-1">Med Streak</p>
            </Card>
          </div>
        </section>

        {/* Next visit */}
        <section className="mb-8">
          <Card className="bg-gradient-to-r from-primary-50 to-pastel-cyan border-primary-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm text-primary-700 font-semibold">Next follow-up</p>
                <p className="text-heading-3 text-deep-800">
                  {formatDate(mockMedicalRecord.nextFollowUp)}
                </p>
              </div>
              <Badge variant="medication">Upcoming</Badge>
            </div>
          </Card>
        </section>

        {/* My Hospital */}
        <section className="mb-8">
          <h3 className="text-heading-2 text-deep-800 mb-4">My Hospital</h3>
          <div className="space-y-3">
            {/* Primary hospital */}
            <Card className="border-primary-200/30 bg-gradient-card">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-600">
                    <path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-body font-semibold text-deep-800">{hospitalName}</p>
                  <p className="text-body-sm text-deep-400">{mockMedicalRecord.diagnosis}</p>
                  <Badge variant="success" className="mt-2">Active</Badge>
                </div>
              </div>
            </Card>

            {/* Additional hospitals */}
            {additionalHospitals.map((name, i) => (
              <Card key={i} className="border-deep-100/50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-deep-50 to-deep-100 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-deep-400">
                      <path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-body font-semibold text-deep-800">{name}</p>
                    <Badge variant="default" className="mt-2">Added</Badge>
                  </div>
                </div>
              </Card>
            ))}

            {/* Add hospital inline form */}
            {showAddHospital ? (
              <Card className="border-primary-200/40">
                <p className="text-body-sm font-semibold text-deep-600 mb-3">Add hospital record</p>
                <input
                  type="text"
                  placeholder="Enter hospital name"
                  value={newHospitalInput}
                  onChange={(e) => setNewHospitalInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddHospital()}
                  className="w-full px-4 py-3 rounded-xl border border-deep-100 bg-white/80 text-body text-deep-800 placeholder:text-deep-300 focus:outline-none focus:ring-2 focus:ring-primary-400/50 mb-3"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { setShowAddHospital(false); setNewHospitalInput(""); }}
                    className="flex-1 py-2.5 rounded-xl border border-deep-100 text-body-sm font-medium text-deep-500 hover:bg-deep-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddHospital}
                    disabled={!newHospitalInput.trim()}
                    className="flex-1 py-2.5 rounded-xl bg-primary-500 text-body-sm font-medium text-white hover:bg-primary-600 transition-colors disabled:opacity-40"
                  >
                    Add
                  </button>
                </div>
              </Card>
            ) : (
              <button
                onClick={() => setShowAddHospital(true)}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-dashed border-primary-300 text-primary-600 hover:bg-primary-50/50 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" />
                </svg>
                <span className="text-body-sm font-medium">Add another hospital record</span>
              </button>
            )}
          </div>
        </section>

        {/* Treating Doctor */}
        <section className="mb-8">
          <h3 className="text-heading-2 text-deep-800 mb-4">Treating Doctor</h3>
          <Card>
            <div className="flex items-center gap-4">
              <Avatar name={`${mockTreatingDoctor.firstName} ${mockTreatingDoctor.lastName}`} size="md" />
              <div className="flex-1">
                <p className="text-body font-semibold text-deep-800">
                  {mockTreatingDoctor.firstName} {mockTreatingDoctor.lastName}
                </p>
                <p className="text-body-sm text-deep-400">{mockTreatingDoctor.specialty}</p>
                <p className="text-body-sm text-deep-300">{hospitalName}</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Prescriptions */}
        <section className="mb-8">
          <h3 className="text-heading-2 text-deep-800 mb-4">Prescriptions</h3>
          <div className="space-y-3">
            {mockMedicalRecord.prescriptions.map((rx, i) => (
              <Card key={i}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-body font-semibold text-deep-800">{rx.name}</p>
                    <p className="text-body-sm text-primary-600 font-medium">{rx.dosage}</p>
                  </div>
                  <Badge variant="default">{rx.frequency}</Badge>
                </div>
                <p className="text-body-sm text-deep-400">{rx.instructions}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Personal info */}
        <section className="mb-8">
          <h3 className="text-heading-2 text-deep-800 mb-4">Personal Information</h3>
          <Card>
            <div className="space-y-4">
              {[
                { label: "Date of Birth", value: dateOfBirth ? formatDate(dateOfBirth) : "--" },
                { label: "Gender", value: gender, capitalize: true },
                { label: "Phone", value: phone },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-body text-deep-400">{item.label}</span>
                  <span className={cn("text-body font-semibold text-deep-800", "capitalize" in item && item.capitalize && "capitalize")}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Settings */}
        <section className="mb-8">
          <h3 className="text-heading-2 text-deep-800 mb-4">Settings</h3>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 overflow-hidden shadow-soft">
            {[
              { label: "Notifications", icon: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" },
              { label: "Privacy", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" },
              { label: "Log Out", icon: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", danger: true },
            ].map((item, i) => (
              <button
                key={item.label}
                className={cn(
                  "w-full flex items-center gap-4 px-5 py-4 text-left transition-colors min-h-touch",
                  "hover:bg-white/60",
                  i < 2 && "border-b border-white/40",
                  "danger" in item && item.danger ? "text-red-500" : "text-deep-800"
                )}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-deep-300 flex-shrink-0">
                  <path d={item.icon} />
                </svg>
                <span className="text-body font-medium flex-1">{item.label}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-deep-200">
                  <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </section>

        <p className="text-body-sm text-deep-200 text-center pb-4">
          Panacea v0.2.0
        </p>
      </div>
    </div>
  );
}
