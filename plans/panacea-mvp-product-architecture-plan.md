
# Panacea MVP - Product Architecture Plan

## A. Product Architecture Overview

Panacea is a Next.js monolithic web app with two distinct user experiences:

1. **Patient Portal** - Mobile-first responsive web app for daily health tracking
2. **Doctor Dashboard** - Desktop-first web dashboard for reviewing patient data between visits

Both share the same codebase, authentication layer, and data models. Routing separates them via `/patient/*` and `/doctor/*` prefixes.

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **State**: React Context + local state (no Redux needed for MVP)
- **Data**: Mock data via TypeScript fixtures (no backend for MVP)
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts via next/font)

### Architecture Principles
- App Router with route groups: `(patient)` and `(doctor)`
- Shared component library under `/components`
- Mock data layer under `/lib/mock-data`
- Type definitions under `/types`
- Utility functions under `/lib`

---

## B. Recommended App Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (font, theme)
│   ├── page.tsx                      # Landing / role selector
│   ├── (patient)/
│   │   ├── layout.tsx                # Patient shell (bottom nav)
│   │   ├── onboarding/
│   │   │   └── page.tsx              # Personal info + medical profile setup
│   │   ├── home/
│   │   │   └── page.tsx              # Main tabbed screen (Medication/Symptoms/Lifestyle)
│   │   ├── capture/
│   │   │   └── page.tsx              # Photo upload + categorize + log symptoms
│   │   ├── history/
│   │   │   └── page.tsx              # Timeline of past entries
│   │   ├── chat/
│   │   │   └── page.tsx              # AI chatbot with quick questions
│   │   ├── profile/
│   │   │   └── page.tsx              # Patient profile + medical record
│   │   └── notifications/
│   │       └── page.tsx              # Reminders and nudges
│   └── (doctor)/
│       ├── layout.tsx                # Doctor shell (sidebar nav)
│       ├── dashboard/
│       │   └── page.tsx              # Overview dashboard
│       ├── patients/
│       │   ├── page.tsx              # Patient list
│       │   └── [id]/
│       │       └── page.tsx          # Patient detail + AI summary cards
│       └── profile/
│           └── page.tsx              # Doctor profile
├── components/
│   ├── ui/                           # Base UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── Tabs.tsx
│   │   ├── Modal.tsx
│   │   └── Select.tsx
│   ├── patient/                      # Patient-specific components
│   │   ├── BottomNav.tsx
│   │   ├── PhotoCapture.tsx
│   │   ├── CategorySelector.tsx
│   │   ├── SymptomPicker.tsx
│   │   ├── HealthDataInput.tsx
│   │   ├── HistoryEntry.tsx
│   │   ├── ChatBubble.tsx
│   │   ├── QuickQuestions.tsx
│   │   ├── ReminderCard.tsx
│   │   ├── StreakIndicator.tsx
│   │   └── MedicalRecordCard.tsx
│   ├── doctor/                       # Doctor-specific components
│   │   ├── Sidebar.tsx
│   │   ├── PatientCard.tsx
│   │   ├── InsightSummaryCard.tsx
│   │   ├── AdherenceChart.tsx
│   │   ├── RiskBadge.tsx
│   │   └── PatientTimeline.tsx
│   └── shared/                       # Shared across both
│       ├── Logo.tsx
│       ├── RoleSelector.tsx
│       └── EmptyState.tsx
├── lib/
│   ├── mock-data/
│   │   ├── patients.ts
│   │   ├── doctors.ts
│   │   ├── medical-records.ts
│   │   ├── health-entries.ts
│   │   ├── chat-responses.ts
│   │   └── notifications.ts
│   ├── constants.ts
│   └── utils.ts
├── types/
│   ├── patient.ts
│   ├── doctor.ts
│   ├── medical-record.ts
│   ├── health-entry.ts
│   └── notification.ts
└── styles/
    └── globals.css                   # Tailwind base + custom tokens
```

---

## C. Detailed Page List

### Patient Pages (8 pages)

| Page | Route | Description |
|------|-------|-------------|
| Role Selector | `/` | Choose Patient or Doctor role |
| Onboarding | `/onboarding` | Enter personal info, patient ID, hospital name; simulate EMR sync |
| Home | `/home` | Multi-tab view (Medication / Symptoms / Lifestyle) with recent entries |
| Capture | `/capture` | Upload/capture photo, categorize, log symptoms, input health data (BP, glucose) |
| History | `/history` | Browse past entries by date, category, data type |
| Chat | `/chat` | AI chatbot with quick question suggestions + free text input |
| Profile | `/profile` | Personal info, linked medical record, diagnosis, prescriptions, next visit, health summary |
| Notifications | `/notifications` | Medication streak reminders, visit reminders, smart caution prompts |

### Doctor Pages (4 pages)

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/dashboard` | Overview: patient counts, alerts, recent activity |
| Patients List | `/patients` | Searchable/filterable list of registered patients |
| Patient Detail | `/patients/[id]` | Full patient profile + AI summary cards (adherence, symptoms, lifestyle, risk) |
| Doctor Profile | `/profile` | Doctor info and settings |

---

## D. Core Components List

### Base UI Components (8)
- `Button` - Primary, secondary, ghost variants; min 48px touch target
- `Card` - Elevated container with consistent padding
- `Input` - Text/number input with label, error state, large size
- `Badge` - Status indicators (category, risk level)
- `Avatar` - Patient/doctor photo placeholder
- `Tabs` - Horizontal tab switcher for home screen categories
- `Modal` - Confirmation dialogs and detail views
- `Select` - Dropdown/multi-select for symptom picker

### Patient Components (11)
- `BottomNav` - Mobile bottom navigation (Home, Capture, History, Chat, Profile)
- `PhotoCapture` - Camera/upload interface with preview
- `CategorySelector` - Medication / Symptoms / Lifestyle toggle
- `SymptomPicker` - Multi-select symptom checklist
- `HealthDataInput` - Glucose/BP numeric entry with units
- `HistoryEntry` - Single history row with thumbnail, category badge, date
- `ChatBubble` - Message bubble (user + AI)
- `QuickQuestions` - Horizontal scrollable quick question chips
- `ReminderCard` - Duolingo-style nudge card
- `StreakIndicator` - Medication photo streak tracker
- `MedicalRecordCard` - Synced EMR info display

### Doctor Components (6)
- `Sidebar` - Desktop sidebar navigation
- `PatientCard` - Patient summary card for list view
- `InsightSummaryCard` - AI-generated insight card (adherence, symptoms, lifestyle, risk)
- `AdherenceChart` - Simple visual adherence indicator
- `RiskBadge` - Attention/risk level indicator
- `PatientTimeline` - Chronological patient data entries

---

## E. Suggested Database / Data Models

### Patient
```typescript
interface Patient {
  id: string;
  patientId: string;           // Hospital-issued ID
  hospitalName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
  avatar?: string;
  createdAt: string;
}
```

### MedicalRecord
```typescript
interface MedicalRecord {
  id: string;
  patientId: string;
  diagnosis: string;           // e.g. "Type 2 Diabetes Mellitus"
  diseaseType: 'diabetes' | 'dermatology' | 'hypertension';
  prescriptions: Prescription[];
  nextFollowUp: string;        // ISO date
  syncedAt: string;
}

interface Prescription {
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
}
```

### HealthEntry
```typescript
interface HealthEntry {
  id: string;
  patientId: string;
  date: string;
  category: 'medication' | 'symptoms' | 'lifestyle';
  imageUrl?: string;
  symptoms?: string[];
  healthData?: {
    bloodPressureSystolic?: number;
    bloodPressureDiastolic?: number;
    glucoseLevel?: number;
    glucoseUnit?: 'mg/dL' | 'mmol/L';
  };
  notes?: string;
  createdAt: string;
}
```

### Doctor
```typescript
interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  hospitalName: string;
  avatar?: string;
}
```

### ChatMessage
```typescript
interface ChatMessage {
  id: string;
  patientId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
```

### Notification
```typescript
interface Notification {
  id: string;
  patientId: string;
  type: 'medication_reminder' | 'visit_reminder' | 'smart_caution' | 'streak';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
```

### PatientInsight (Doctor-side)
```typescript
interface PatientInsight {
  patientId: string;
  medicationAdherence: number;   // 0-100 percentage
  adherenceTrend: 'improving' | 'stable' | 'declining';
  unusualSymptoms: string[];
  lifestyleNotes: string;
  riskLevel: 'low' | 'moderate' | 'high';
  aiSummary: string;
  lastUpdated: string;
}
```

---

## F. MVP Build Phases

### Phase 1: Foundation (Build first)
- Project setup (Next.js, Tailwind, fonts, design tokens)
- Base UI component library (Button, Card, Input, Badge, Tabs, etc.)
- Type definitions and mock data
- Root layout and role selector landing page
- Shared components (Logo, EmptyState)

### Phase 2: Patient Core
- Patient layout with bottom navigation
- Onboarding flow (personal info + medical profile + simulated EMR sync)
- Home screen with 3-category tabs
- Capture page (photo upload, category selection, symptom picker, health data input)
- Profile page with medical record display

### Phase 3: Patient Data & History
- History page with date/category filtering
- Streak indicator
- Health data summary on profile

### Phase 4: Patient Engagement
- AI chatbot page with quick questions and mock responses
- Notifications page with Duolingo-style reminders
- Smart caution prompts

### Phase 5: Doctor Dashboard
- Doctor layout with sidebar navigation
- Dashboard overview page
- Patients list with search
- Patient detail page with AI insight summary cards
- Doctor profile

---

## G. Development Order (What to Build First)

**Start with Phase 1 (Foundation)** because every subsequent page depends on:
1. Design tokens and Tailwind config (colors, spacing, font sizes)
2. Base UI components that enforce accessibility standards (48px targets, readable text)
3. Type definitions that shape all mock data and component props
4. The role selector as the app entry point

Then proceed through Phases 2-5 sequentially. Within each phase, build from layout -> pages -> interactions.

**Estimated scope:** ~25 files for Phase 1, ~15 files per subsequent phase. Total MVP: roughly 80-90 files.

---

## Design Token Summary

```
Colors:
  --primary:        #2DD4BF (turquoise)
  --primary-dark:   #0F766E (dark teal)
  --text-primary:   #1E3A5F (navy)
  --text-secondary: #64748B (slate)
  --background:     #FAFAF8 (soft off-white)
  --surface:        #FFFFFF
  --border:         #E2E8F0
  --success:        #22C55E
  --warning:        #F59E0B
  --error:          #EF4444 (softened)
  --info:           #3B82F6

Typography:
  Font: Inter
  Body: 16-18px
  H1: 28px, semibold
  H2: 22px, semibold
  H3: 18px, medium
  Small: 14px

Spacing:
  Touch target minimum: 48px (12 in Tailwind = 3rem)
  Card padding: 16-24px
  Section gaps: 24-32px
```
