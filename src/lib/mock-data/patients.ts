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
  diagnosis: "Type 2 Diabetes Mellitus",
  diseaseType: "diabetes",
  prescriptions: [
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      instructions: "Take with meals, morning and evening",
    },
    {
      name: "Glipizide",
      dosage: "5mg",
      frequency: "Once daily",
      instructions: "Take 30 minutes before breakfast",
    },
    {
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      instructions: "Take at bedtime",
    },
  ],
  nextFollowUp: "2024-04-15T10:00:00Z",
  syncedAt: "2024-03-01T09:30:00Z",
};
