export interface Patient {
  id: string;
  patientId: string;
  hospitalName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  phone: string;
  email?: string;
  avatar?: string;
  createdAt: string;
}

export interface Prescription {
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  diagnosis: string;
  diseaseType: "diabetes" | "dermatology" | "hypertension";
  prescriptions: Prescription[];
  nextFollowUp: string;
  syncedAt: string;
}

export type EntryCategory = "medication" | "symptoms" | "lifestyle";

export interface HealthData {
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  glucoseLevel?: number;
  glucoseUnit?: "mg/dL" | "mmol/L";
}

export interface HealthEntry {
  id: string;
  patientId: string;
  date: string;
  category: EntryCategory;
  imageUrl?: string;
  symptoms?: string[];
  healthData?: HealthData;
  notes?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  patientId: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  patientId: string;
  type: "medication_reminder" | "visit_reminder" | "smart_caution" | "streak";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
