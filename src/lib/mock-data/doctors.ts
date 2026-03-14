export interface MockDoctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  hospitalName: string;
  phone?: string;
}

export const mockTreatingDoctor: MockDoctor = {
  id: "d1",
  firstName: "Dr. Piyawan",
  lastName: "Srisuk",
  specialty: "Endocrinology",
  hospitalName: "Bangkok General Hospital",
  phone: "+66-2-310-3000",
};

export const mockDoctors: MockDoctor[] = [
  mockTreatingDoctor,
  {
    id: "d2",
    firstName: "Dr. Nattapong",
    lastName: "Wongchai",
    specialty: "Dermatology",
    hospitalName: "Bumrungrad International Hospital",
  },
];
