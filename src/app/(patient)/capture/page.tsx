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
    <Suspense fallback={<div className="page-container"><p className="text-deep-300 text-center py-12">Loading...</p></div>}>
      <CapturePageContent />
    </Suspense>
  );
}

function CapturePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramCategory = searchParams.get("category") as EntryCategory | null;
  const isCaptured = searchParams.get("captured") === "true";
  const quickAction = searchParams.get("action");

  const [category, setCategory] = useState<EntryCategory>(paramCategory || "medication");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [bpSystolic, setBpSystolic] = useState("");
  const [bpDiastolic, setBpDiastolic] = useState("");
  const [imageNote, setImageNote] = useState("");
  const [showImageNoteInput, setShowImageNoteInput] = useState(false);
  const [imageNoteSaved, setImageNoteSaved] = useState(false);

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

  const handleSaveImageNote = () => {
    setImageNoteSaved(true);
    setShowImageNoteInput(false);
  };

  const isQuickAction = !!quickAction && !isCaptured;

  return (
    <div className="min-h-screen bg-gradient-main">
      <div className="page-container">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl hover:bg-white/60 min-w-touch min-h-touch flex items-center justify-center transition-colors"
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-deep-700">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-heading-2 text-deep-800">
            {isQuickAction
              ? quickAction === "bp" ? "Blood Pressure"
              : quickAction === "glucose" ? "Glucose"
              : quickAction === "symptoms" ? "Symptoms"
              : "Notes"
              : isCaptured ? "Add Details" : "New Entry"
            }
          </h1>
        </div>

        {/* Photo preview with note overlay */}
        {isCaptured && (
          <div className="mb-6 relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-deep-700 to-deep-800 flex items-center justify-center overflow-hidden relative shadow-soft">
              <div className="text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-white/30 mb-2">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <p className="text-white/30 text-body-sm">Photo captured</p>
              </div>

              {imageNoteSaved && imageNote && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
                  <p className="text-white text-body font-medium text-center">{imageNote}</p>
                </div>
              )}

              {!showImageNoteInput && !imageNoteSaved && (
                <button
                  onClick={() => setShowImageNoteInput(true)}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/15 backdrop-blur-md text-white/80 px-4 py-2 rounded-full text-body-sm font-medium hover:bg-white/25 transition-colors"
                >
                  + Add a note on photo
                </button>
              )}
            </div>

            {showImageNoteInput && (
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={imageNote}
                  onChange={(e) => setImageNote(e.target.value)}
                  placeholder="Write a short note..."
                  maxLength={80}
                  autoFocus
                  className="flex-1 rounded-full border border-white/40 bg-white/80 backdrop-blur-sm px-4 py-3 text-body text-deep-800 placeholder:text-deep-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={handleSaveImageNote}
                  disabled={!imageNote.trim()}
                  className="px-5 py-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 text-white font-semibold text-body-sm hover:from-primary-600 hover:to-primary-500 transition-all disabled:opacity-40 min-h-touch shadow-glow"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quick action flows */}
        {isQuickAction && quickAction === "bp" && (
          <div className="space-y-5 mb-8">
            <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-5 border border-red-100/50 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white"><path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <p className="text-body font-semibold text-deep-800">Enter your blood pressure</p>
              </div>
              <div className="flex gap-3">
                <Input label="Systolic" type="number" placeholder="120" value={bpSystolic} onChange={(e) => setBpSystolic(e.target.value)} />
                <Input label="Diastolic" type="number" placeholder="80" value={bpDiastolic} onChange={(e) => setBpDiastolic(e.target.value)} />
              </div>
              <p className="text-body-sm text-deep-300 mt-3">Normal: below 120/80 mmHg</p>
            </div>
            <textarea rows={2} className="w-full rounded-2xl border border-white/40 bg-white/80 backdrop-blur-sm px-4 py-3.5 text-body text-deep-800 placeholder:text-deep-300 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none min-h-touch" placeholder="Optional notes..." value={notes} onChange={(e) => setNotes(e.target.value)} />
            <Button fullWidth size="lg" onClick={handleSave}>Save Blood Pressure</Button>
          </div>
        )}

        {isQuickAction && quickAction === "glucose" && (
          <div className="space-y-5 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-5 border border-blue-100/50 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white"><path d="M12 2v6m0 12v2M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m12 0h2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <p className="text-body font-semibold text-deep-800">Enter your glucose level</p>
              </div>
              <Input label="Blood Glucose (mg/dL)" type="number" placeholder="e.g. 120" value={glucoseLevel} onChange={(e) => setGlucoseLevel(e.target.value)} helperText="Fasting: 70-100 | After meals: below 180" />
            </div>
            <textarea rows={2} className="w-full rounded-2xl border border-white/40 bg-white/80 backdrop-blur-sm px-4 py-3.5 text-body text-deep-800 placeholder:text-deep-300 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none min-h-touch" placeholder="Optional notes..." value={notes} onChange={(e) => setNotes(e.target.value)} />
            <Button fullWidth size="lg" onClick={handleSave}>Save Glucose</Button>
          </div>
        )}

        {isQuickAction && quickAction === "symptoms" && (
          <div className="space-y-5 mb-8">
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-5 border border-amber-100/50 shadow-soft">
              <p className="text-body font-semibold text-deep-800 mb-3">What are you feeling?</p>
              <div className="flex flex-wrap gap-2">
                {SYMPTOM_OPTIONS.map((symptom) => (
                  <button key={symptom} onClick={() => toggleSymptom(symptom)} className={cn(
                    "px-4 py-2.5 rounded-full text-body-sm font-semibold transition-all min-h-[44px]",
                    selectedSymptoms.includes(symptom)
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-sm"
                      : "bg-white/80 text-deep-700 border border-amber-200/50 hover:bg-amber-50"
                  )} aria-pressed={selectedSymptoms.includes(symptom)}>{symptom}</button>
                ))}
              </div>
            </div>
            <textarea rows={2} className="w-full rounded-2xl border border-white/40 bg-white/80 backdrop-blur-sm px-4 py-3.5 text-body text-deep-800 placeholder:text-deep-300 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none min-h-touch" placeholder="Optional notes..." value={notes} onChange={(e) => setNotes(e.target.value)} />
            <Button fullWidth size="lg" onClick={handleSave}>Save Symptoms</Button>
          </div>
        )}

        {isQuickAction && quickAction === "notes" && (
          <div className="space-y-5 mb-8">
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-5 border border-primary-100/50 shadow-soft">
              <p className="text-body font-semibold text-deep-800 mb-3">Quick note</p>
              <textarea rows={4} className="w-full rounded-2xl border border-primary-200/50 bg-white/80 px-4 py-3.5 text-body text-deep-800 placeholder:text-deep-300 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none min-h-touch" placeholder="How are you feeling today?" value={notes} onChange={(e) => setNotes(e.target.value)} autoFocus />
            </div>
            <Button fullWidth size="lg" onClick={handleSave}>Save Note</Button>
          </div>
        )}

        {/* Full capture flow */}
        {!isQuickAction && (
          <>
            {/* Category selector */}
            <div className="mb-6">
              <p className="text-body font-semibold text-deep-800 mb-3">Category</p>
              <div className="flex gap-2">
                {(["medication", "symptoms", "lifestyle"] as EntryCategory[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "flex-1 py-3 rounded-2xl text-body font-semibold transition-all min-h-touch text-center",
                      category === cat
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow"
                        : "bg-white/60 backdrop-blur-sm text-deep-700 border border-white/40 hover:bg-white/80"
                    )}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptom picker */}
            {category === "symptoms" && (
              <div className="mb-6">
                <p className="text-body font-semibold text-deep-800 mb-3">What are you feeling?</p>
                <div className="flex flex-wrap gap-2">
                  {SYMPTOM_OPTIONS.map((symptom) => (
                    <button key={symptom} onClick={() => toggleSymptom(symptom)} className={cn(
                      "px-4 py-2.5 rounded-full text-body-sm font-semibold transition-all min-h-[44px]",
                      selectedSymptoms.includes(symptom)
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm"
                        : "bg-white/60 backdrop-blur-sm text-deep-700 border border-white/30 hover:bg-white/80"
                    )} aria-pressed={selectedSymptoms.includes(symptom)}>{symptom}</button>
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
              <p className="text-body font-semibold text-deep-800 mb-3">
                Health data <span className="text-deep-300 font-normal ml-2">(optional)</span>
              </p>
              <div className="space-y-4">
                <Input label="Blood Glucose (mg/dL)" type="number" placeholder="e.g. 120" value={glucoseLevel} onChange={(e) => setGlucoseLevel(e.target.value)} helperText="Fasting: 70-100 | After meals: below 180" />
                <div className="flex gap-3">
                  <Input label="BP Systolic" type="number" placeholder="120" value={bpSystolic} onChange={(e) => setBpSystolic(e.target.value)} />
                  <Input label="BP Diastolic" type="number" placeholder="80" value={bpDiastolic} onChange={(e) => setBpDiastolic(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <label htmlFor="notes" className="text-body font-semibold text-deep-800 block mb-2">
                Notes <span className="text-deep-300 font-normal ml-2">(optional)</span>
              </label>
              <textarea id="notes" rows={3} className="w-full rounded-2xl border border-white/40 bg-white/80 backdrop-blur-sm px-4 py-3.5 text-body text-deep-800 placeholder:text-deep-300 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none min-h-touch" placeholder="Anything to note..." value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>

            {/* Save */}
            <div className="flex gap-3">
              <Button variant="secondary" fullWidth onClick={() => router.back()}>Cancel</Button>
              <Button fullWidth size="lg" onClick={handleSave}>Save Entry</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
