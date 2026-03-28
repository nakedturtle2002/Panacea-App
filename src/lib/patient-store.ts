"use client";

export interface PatientProfile {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  countryCode: string;
  phone: string;
  patientId: string;
  hospitalName: string;
}

const STORAGE_KEY = "panacea_patient_profile";

const defaultProfile: PatientProfile = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "male",
  countryCode: "+84",
  phone: "",
  patientId: "",
  hospitalName: "",
};

export function getPatientProfile(): PatientProfile {
  if (typeof window === "undefined") return defaultProfile;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultProfile, ...JSON.parse(stored) };
    }
  } catch {
    // ignore parse errors
  }
  return defaultProfile;
}

export function savePatientProfile(profile: Partial<PatientProfile>): PatientProfile {
  const current = getPatientProfile();
  const updated = { ...current, ...profile };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function hasPatientProfile(): boolean {
  const profile = getPatientProfile();
  return !!(profile.firstName && profile.lastName);
}
