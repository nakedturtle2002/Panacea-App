import { Notification } from "@/types/patient";

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    patientId: "p1",
    type: "medication_reminder",
    title: "Time for your morning meds!",
    message: "You have been on a 3-day streak. Take a photo of your medication to keep it going!",
    read: false,
    createdAt: "2024-03-14T07:00:00Z",
  },
  {
    id: "n2",
    patientId: "p1",
    type: "visit_reminder",
    title: "Follow-up visit coming up",
    message: "Your appointment at Bangkok General Hospital is in 4 weeks (April 15). Mark your calendar!",
    read: false,
    createdAt: "2024-03-14T09:00:00Z",
  },
  {
    id: "n3",
    patientId: "p1",
    type: "smart_caution",
    title: "Heads up about dessert",
    message: "We noticed you logged a dessert photo yesterday. Are you checking your glucose after sweet treats? Just a friendly nudge!",
    read: true,
    createdAt: "2024-03-13T20:30:00Z",
  },
  {
    id: "n4",
    patientId: "p1",
    type: "streak",
    title: "3-day medication streak!",
    message: "You have logged your medication 3 days in a row. Awesome work - keep the momentum going!",
    read: true,
    createdAt: "2024-03-13T08:30:00Z",
  },
  {
    id: "n5",
    patientId: "p1",
    type: "medication_reminder",
    title: "Evening meds reminder",
    message: "Do not forget your evening Metformin. Take it with dinner for best results.",
    read: true,
    createdAt: "2024-03-12T18:00:00Z",
  },
];
