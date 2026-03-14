"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { SYMPTOM_OPTIONS, CATEGORY_LABELS } from "@/lib/constants";
import { EntryCategory } from "@/types/patient";
import { cn } from "@/lib/utils";

type CaptureStep = "category" | "photo" | "details" | "confirm";

export default function CapturePage() {
  const router = useRouter();
  const [step, setStep] = useState<CaptureStep>("category");
  const [category, setCategory] = useState<EntryCategory>("medication");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [bpSystolic, setBpSystolic] = useState("");
  const [bpDiastolic, setBpDiastolic] = useState("");

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    // In a real app, save to backend
    router.push("/home");
  };

  const categories: { id: EntryCategory; label: string; icon: React.ReactNode; description: string }[] = [
    {
      id: "medication",
      label: "Medication",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
          <path d="m8.5 8.5 7 7" />
        </svg>
      ),
      description: "Photo of your medication or pill box",
    },
    {
      id: "symptoms",
      label: "Symptoms",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      description: "Log unusual symptoms or concerns",
    },
    {
      id: "lifestyle",
      label: "Lifestyle",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 11h.01" />
          <path d="M11 15h.01" />
          <path d="M16 16c.5-1.5.85-3.22 1-5 .15-1.78-.04-3.56-.56-5.22A13.3 13.3 0 0 0 12 1a13.38 13.38 0 0 0-4.44 4.78A13.2 13.2 0 0 0 7 11c.15 1.78.5 3.5 1 5" />
          <path d="M9 18c.59.63 1.26 1.16 2 1.58a12.32 12.32 0 0 0 2-1.58" />
          <path d="M3 21c0-2.5.83-4.78 2.24-6.57" />
          <path d="M21 21c0-2.5-.83-4.78-2.24-6.57" />
        </svg>
      ),
      description: "Photo of meals, activities, or habits",
    },
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            if (step === "category") router.back();
            else if (step === "photo") setStep("category");
            else if (step === "details") setStep("photo");
            else if (step === "confirm") setStep("details");
          }}
          className="p-2 rounded-xl hover:bg-gray-100 min-w-touch min-h-touch flex items-center justify-center"
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-heading-2 text-navy-700">New Entry</h1>
      </div>

      {/* Step indicator */}
      <div className="flex gap-1.5 mb-6">
        {["category", "photo", "details", "confirm"].map((s, i) => (
          <div
            key={s}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              ["category", "photo", "details", "confirm"].indexOf(step) >= i
                ? "bg-primary-500"
                : "bg-gray-200"
            )}
          />
        ))}
      </div>

      {/* Step: Category */}
      {step === "category" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-heading-3 text-navy-700 mb-1">
              What are you logging?
            </h2>
            <p className="text-body text-gray-500">
              Choose a category for your entry
            </p>
          </div>
          <div className="space-y-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategory(cat.id);
                  setStep("photo");
                }}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left min-h-touch",
                  category === cat.id
                    ? "border-primary-400 bg-primary-50"
                    : "border-border bg-white hover:border-gray-300"
                )}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
                    cat.id === "medication" && "bg-primary-100 text-primary-600",
                    cat.id === "symptoms" && "bg-amber-100 text-amber-600",
                    cat.id === "lifestyle" && "bg-blue-100 text-blue-600"
                  )}
                >
                  {cat.icon}
                </div>
                <div>
                  <p className="font-semibold text-navy-700">{cat.label}</p>
                  <p className="text-sm text-gray-500">{cat.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Photo */}
      {step === "photo" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-heading-3 text-navy-700 mb-1">
              Add a photo
              <span className="text-gray-400 font-normal text-body ml-1">
                (optional)
              </span>
            </h2>
            <p className="text-body text-gray-500">
              {category === "medication" && "Take a photo of your medication"}
              {category === "symptoms" && "Capture any visible symptoms"}
              {category === "lifestyle" && "Photo your meal or activity"}
            </p>
          </div>

          {!hasPhoto ? (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <div className="space-y-3">
                <Button onClick={() => setHasPhoto(true)} fullWidth>
                  Take Photo
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setHasPhoto(true)}
                  fullWidth
                >
                  Upload from Gallery
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-gray-400 mb-2">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <p className="text-sm text-gray-500">Photo preview</p>
                </div>
              </div>
              <button
                onClick={() => setHasPhoto(false)}
                className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"
                aria-label="Remove photo"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setStep("category")}
            >
              Back
            </Button>
            <Button fullWidth onClick={() => setStep("details")}>
              {hasPhoto ? "Next" : "Skip Photo"}
            </Button>
          </div>
        </div>
      )}

      {/* Step: Details */}
      {step === "details" && (
        <div className="space-y-5">
          <div>
            <h2 className="text-heading-3 text-navy-700 mb-1">Add details</h2>
            <p className="text-body text-gray-500">
              Log your health data and notes
            </p>
          </div>

          {/* Symptom picker for symptoms category */}
          {category === "symptoms" && (
            <div>
              <p className="text-body font-medium text-navy-700 mb-3">
                Select your symptoms
              </p>
              <div className="flex flex-wrap gap-2">
                {SYMPTOM_OPTIONS.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={cn(
                      "px-4 py-2.5 rounded-full text-sm font-medium transition-all min-h-[44px]",
                      selectedSymptoms.includes(symptom)
                        ? "bg-amber-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    aria-pressed={selectedSymptoms.includes(symptom)}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Health data inputs */}
          <div className="space-y-4">
            <p className="text-body font-medium text-navy-700">
              Health measurements
              <span className="text-gray-400 font-normal text-sm ml-1">
                (optional)
              </span>
            </p>
            <Input
              label="Blood Glucose (mg/dL)"
              type="number"
              placeholder="e.g. 120"
              value={glucoseLevel}
              onChange={(e) => setGlucoseLevel(e.target.value)}
              helperText="Fasting: 70-100 | After meals: below 180"
            />
            <div className="flex gap-3">
              <Input
                label="BP Systolic"
                type="number"
                placeholder="e.g. 120"
                value={bpSystolic}
                onChange={(e) => setBpSystolic(e.target.value)}
              />
              <Input
                label="BP Diastolic"
                type="number"
                placeholder="e.g. 80"
                value={bpDiastolic}
                onChange={(e) => setBpDiastolic(e.target.value)}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="notes"
              className="text-body font-medium text-navy-700"
            >
              Notes
            </label>
            <textarea
              id="notes"
              rows={3}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-body text-navy-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
              placeholder="Any additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setStep("photo")}
            >
              Back
            </Button>
            <Button fullWidth onClick={() => setStep("confirm")}>
              Review
            </Button>
          </div>
        </div>
      )}

      {/* Step: Confirm */}
      {step === "confirm" && (
        <div className="space-y-5">
          <div>
            <h2 className="text-heading-3 text-navy-700 mb-1">
              Review your entry
            </h2>
            <p className="text-body text-gray-500">
              Make sure everything looks good
            </p>
          </div>

          <Card>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Category</span>
                <Badge variant={category}>{CATEGORY_LABELS[category]}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Photo</span>
                <span className="font-medium text-navy-700">
                  {hasPhoto ? "Attached" : "None"}
                </span>
              </div>
              {selectedSymptoms.length > 0 && (
                <div>
                  <span className="text-gray-500 block mb-1">Symptoms</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedSymptoms.map((s) => (
                      <Badge key={s} variant="symptoms">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {glucoseLevel && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Glucose</span>
                  <span className="font-medium text-navy-700">
                    {glucoseLevel} mg/dL
                  </span>
                </div>
              )}
              {bpSystolic && bpDiastolic && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Blood Pressure</span>
                  <span className="font-medium text-navy-700">
                    {bpSystolic}/{bpDiastolic} mmHg
                  </span>
                </div>
              )}
              {notes && (
                <div>
                  <span className="text-gray-500 block mb-1">Notes</span>
                  <p className="text-sm text-navy-700">{notes}</p>
                </div>
              )}
            </div>
          </Card>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setStep("details")}
            >
              Edit
            </Button>
            <Button fullWidth size="lg" onClick={handleSave}>
              Save Entry
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
