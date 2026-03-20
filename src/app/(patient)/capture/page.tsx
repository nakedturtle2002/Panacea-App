"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { SYMPTOM_OPTIONS, CATEGORY_LABELS } from "@/lib/constants";
import { EntryCategory } from "@/types/patient";
import { cn } from "@/lib/utils";

export default function CapturePage() {
  return (
    <Suspense fallback={<div className="page-container"><p className="text-gray-400 text-center py-12">Loading...</p></div>}>
      <CapturePageContent />
    </Suspense>
  );
}

function CapturePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramCategory = searchParams.get("category") as EntryCategory | null;
  const isCaptured = searchParams.get("captured") === "true";

  const [category, setCategory] = useState<EntryCategory>(paramCategory || "medication");
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
    router.push("/home");
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl hover:bg-gray-100 min-w-touch min-h-touch flex items-center justify-center"
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-heading-2 text-navy-700">
          {isCaptured ? "Add Details" : "New Entry"}
        </h1>
      </div>

      {/* Photo preview (if captured) */}
      {isCaptured && (
        <div className="mb-6">
          <div className="aspect-[4/3] rounded-2xl bg-navy-800 flex items-center justify-center overflow-hidden">
            <div className="text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-white/40 mb-2">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <p className="text-white/40 text-body-sm">Photo captured</p>
            </div>
          </div>
        </div>
      )}

      {/* Category selector */}
      <div className="mb-6">
        <p className="text-body font-semibold text-navy-700 mb-3">Category</p>
        <div className="flex gap-2">
          {(["medication", "symptoms", "lifestyle"] as EntryCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "flex-1 py-3 rounded-2xl text-body font-semibold transition-all min-h-touch text-center",
                category === cat
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-gray-100 text-navy-700 hover:bg-gray-200"
              )}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Symptom picker (if symptoms category) */}
      {category === "symptoms" && (
        <div className="mb-6">
          <p className="text-body font-semibold text-navy-700 mb-3">
            What are you feeling?
          </p>
          <div className="flex flex-wrap gap-2">
            {SYMPTOM_OPTIONS.map((symptom) => (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={cn(
                  "px-4 py-2.5 rounded-full text-body-sm font-semibold transition-all min-h-[44px]",
                  selectedSymptoms.includes(symptom)
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-navy-700 hover:bg-gray-200"
                )}
                aria-pressed={selectedSymptoms.includes(symptom)}
              >
                {symptom}
              </button>
            ))}
          </div>
          {selectedSymptoms.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {selectedSymptoms.map((s) => (
                <Badge key={s} variant="medication">{s}</Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Health measurements */}
      <div className="mb-6">
        <p className="text-body font-semibold text-navy-700 mb-3">
          Health data
          <span className="text-gray-400 font-normal ml-2">(optional)</span>
        </p>
        <div className="space-y-4">
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
      </div>

      {/* Notes */}
      <div className="mb-8">
        <label
          htmlFor="notes"
          className="text-body font-semibold text-navy-700 block mb-2"
        >
          Notes
          <span className="text-gray-400 font-normal ml-2">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={3}
          className="w-full rounded-2xl border border-border bg-white px-4 py-3.5 text-body text-navy-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none min-h-touch"
          placeholder="Anything to note..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Save */}
      <div className="flex gap-3">
        <Button variant="secondary" fullWidth onClick={() => router.back()}>
          Cancel
        </Button>
        <Button fullWidth size="lg" onClick={handleSave}>
          Save Entry
        </Button>
      </div>
    </div>
  );
}
