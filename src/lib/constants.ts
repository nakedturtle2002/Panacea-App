export const SYMPTOM_OPTIONS = [
  "Fatigue",
  "Dizziness",
  "Blurred vision",
  "Frequent urination",
  "Excessive thirst",
  "Numbness in hands/feet",
  "Slow-healing wounds",
  "Headache",
  "Nausea",
  "Chest tightness",
  "Shortness of breath",
  "Skin rash or irritation",
  "Unusual sweating",
  "Loss of appetite",
  "Weight change",
] as const;

export const QUICK_QUESTIONS = [
  "I forgot to take my medicine",
  "I feel tired today",
  "What happened this week?",
  "My blood sugar feels high",
  "Can I eat sweets today?",
  "When is my next appointment?",
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  medication: "Medication",
  symptoms: "Symptoms",
  lifestyle: "Lifestyle",
};

export const CATEGORY_COLORS: Record<string, string> = {
  medication: "bg-primary-100 text-primary-700",
  symptoms: "bg-amber-100 text-amber-700",
  lifestyle: "bg-blue-100 text-navy-700",
};
