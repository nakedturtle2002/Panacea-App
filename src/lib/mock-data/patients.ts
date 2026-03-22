import { Patient, MedicalRecord } from "@/types/patient";

export const mockPatient: Patient = {
  id: "p1",
  patientId: "HN-2024-08817",
  hospitalName: "Bangkok General Hospital",
  firstName: "Somchai",
  lastName: "Prasert",
  dateOfBirth: "1978-03-15",
  gender: "male",
  phone: "+66-81-234-5678",
  email: "somchai.p@email.com",
  createdAt: "2024-01-10T08:00:00Z",
};

export const mockMedicalRecord: MedicalRecord = {
  id: "mr1",
  patientId: "p1",
  diagnosis: "Hypertension",
  diseaseType: "hypertension",
  prescriptions: [
    {
      name: "Exforge",
      dosage: "5mg/80mg",
      frequency: "Once daily",
      instructions: "Take in the morning, before meals",
    },
  ],
  nextFollowUp: "2026-04-22T10:00:00Z",
  syncedAt: "2024-03-01T09:30:00Z",
};
