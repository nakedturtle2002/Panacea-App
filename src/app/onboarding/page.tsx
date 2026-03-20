"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/shared/Logo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import PhoneInput from "@/components/ui/PhoneInput";
import HospitalPicker from "@/components/ui/HospitalPicker";
import { savePatientProfile, getPatientProfile } from "@/lib/patient-store";

type Step = "personal" | "medical" | "syncing" | "done";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("personal");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "male",
    countryCode: "+84",
    phone: "",
    patientId: "",
    hospitalName: "",
  });

  // Hydrate from stored profile if returning
  useEffect(() => {
    const stored = getPatientProfile();
    if (stored.firstName) {
      setFormData((prev) => ({ ...prev, ...stored }));
    }
  }, []);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Persist personal info immediately
    savePatientProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      countryCode: formData.countryCode,
      phone: formData.phone,
    });
    setStep("medical");
  };

  const handleMedicalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hospitalName) return;
    // Persist medical info
    savePatientProfile({
      patientId: formData.patientId,
      hospitalName: formData.hospitalName,
    });
    setStep("syncing");
    setTimeout(() => setStep("done"), 2500);
  };

  if (step === "syncing") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center animate-pulse">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-600">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-heading-2 text-navy-700 mb-2">Syncing your records...</h2>
          <p className="text-body text-gray-500">
            Connecting to {formData.hospitalName || "your hospital"}
          </p>
        </div>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
              <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-heading-2 text-navy-700 mb-2">All set!</h2>
          <p className="text-body text-gray-500 mb-2">
            Your medical records have been synced successfully.
          </p>
          <div className="card my-6 text-left">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Hospital</span>
                <span className="font-medium text-navy-700">{formData.hospitalName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Diagnosis</span>
                <span className="font-medium text-navy-700">Type 2 Diabetes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Prescriptions</span>
                <span className="font-medium text-navy-700">3 medications</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Next visit</span>
                <span className="font-medium text-navy-700">Apr 15, 2024</span>
              </div>
            </div>
          </div>
          <Button fullWidth size="lg" onClick={() => router.push("/home")}>
            Start Logging
          </Button>
          <p className="text-xs text-gray-400 mt-3">
            You can review your full profile anytime from the Profile tab
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container max-w-md mx-auto">
        <Logo size="sm" className="mb-8" />

        {/* Progress indicator */}
        <div className="flex gap-2 mb-8">
          <div className={`h-1.5 flex-1 rounded-full ${step === "personal" || step === "medical" ? "bg-primary-500" : "bg-gray-200"}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step === "medical" ? "bg-primary-500" : "bg-gray-200"}`} />
        </div>

        {step === "personal" && (
          <form onSubmit={handlePersonalSubmit} className="space-y-5">
            <div>
              <h1 className="text-heading-1 text-navy-700 mb-1">Welcome to Panacea</h1>
              <p className="text-body text-gray-500">
                Let us start with your personal information
              </p>
            </div>

            <Input
              label="First Name"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              required
            />
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              required
            />
            <Input
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateField("dateOfBirth", e.target.value)}
              required
            />
            <Select
              label="Gender"
              value={formData.gender}
              onChange={(e) => updateField("gender", e.target.value)}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />
            <PhoneInput
              label="Phone Number"
              countryCode={formData.countryCode}
              phone={formData.phone}
              onCountryCodeChange={(code) => updateField("countryCode", code)}
              onPhoneChange={(phone) => updateField("phone", phone)}
              required
            />

            <Button type="submit" fullWidth size="lg">
              Continue
            </Button>
          </form>
        )}

        {step === "medical" && (
          <form onSubmit={handleMedicalSubmit} className="space-y-5">
            <div>
              <h1 className="text-heading-1 text-navy-700 mb-1">Medical Profile</h1>
              <p className="text-body text-gray-500">
                Enter your patient ID from your medical booklet
              </p>
            </div>

            <Input
              label="Patient ID"
              placeholder="e.g. HN-2024-08817"
              value={formData.patientId}
              onChange={(e) => updateField("patientId", e.target.value)}
              helperText="Found on your hospital medical booklet"
              required
            />

            <HospitalPicker
              label="Hospital"
              value={formData.hospitalName}
              onChange={(val) => updateField("hospitalName", val)}
              required
            />

            <div className="bg-primary-50 rounded-xl p-4 border border-primary-200">
              <p className="text-body text-primary-800">
                We will connect to your hospital records to sync your diagnosis,
                prescriptions, and follow-up schedule.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                fullWidth
                onClick={() => setStep("personal")}
              >
                Back
              </Button>
              <Button
                type="submit"
                fullWidth
                size="lg"
                disabled={!formData.hospitalName}
              >
                Sync Records
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
