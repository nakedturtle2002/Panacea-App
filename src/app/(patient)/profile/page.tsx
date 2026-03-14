"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { mockPatient, mockMedicalRecord } from "@/lib/mock-data/patients";
import { mockHealthEntries } from "@/lib/mock-data/health-entries";
import { formatDate } from "@/lib/utils";

export default function ProfilePage() {
  const fullName = `${mockPatient.firstName} ${mockPatient.lastName}`;

  // Calculate health summary
  const glucoseEntries = mockHealthEntries
    .filter((e) => e.healthData?.glucoseLevel)
    .map((e) => e.healthData!.glucoseLevel!);
  const avgGlucose =
    glucoseEntries.length > 0
      ? Math.round(
          glucoseEntries.reduce((a, b) => a + b, 0) / glucoseEntries.length
        )
      : null;

  const bpEntries = mockHealthEntries.filter(
    (e) => e.healthData?.bloodPressureSystolic
  );
  const lastBp = bpEntries[0]?.healthData;

  return (
    <div className="page-container">
      {/* Profile header */}
      <div className="flex flex-col items-center mb-8">
        <Avatar name={fullName} size="lg" className="mb-3" />
        <h1 className="text-heading-2 text-navy-700">{fullName}</h1>
        <p className="text-body text-gray-500">
          Patient ID: {mockPatient.patientId}
        </p>
      </div>

      {/* Personal info */}
      <section className="mb-6">
        <h2 className="section-title">Personal Information</h2>
        <Card>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Date of Birth</span>
              <span className="font-medium text-navy-700">
                {formatDate(mockPatient.dateOfBirth)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Gender</span>
              <span className="font-medium text-navy-700 capitalize">
                {mockPatient.gender}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phone</span>
              <span className="font-medium text-navy-700">
                {mockPatient.phone}
              </span>
            </div>
            {mockPatient.email && (
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium text-navy-700">
                  {mockPatient.email}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Hospital</span>
              <span className="font-medium text-navy-700">
                {mockPatient.hospitalName}
              </span>
            </div>
          </div>
        </Card>
      </section>

      {/* Medical record */}
      <section className="mb-6">
        <h2 className="section-title">Medical Record</h2>
        <Card>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Diagnosis</span>
              <Badge variant="medication">
                {mockMedicalRecord.diagnosis}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Disease Type</span>
              <span className="font-medium text-navy-700 capitalize">
                {mockMedicalRecord.diseaseType}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Next Visit</span>
              <span className="font-semibold text-primary-700">
                {formatDate(mockMedicalRecord.nextFollowUp)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Last Synced</span>
              <span className="text-sm text-gray-400">
                {formatDate(mockMedicalRecord.syncedAt)}
              </span>
            </div>
          </div>
        </Card>
      </section>

      {/* Prescriptions */}
      <section className="mb-6">
        <h2 className="section-title">Prescriptions</h2>
        <div className="space-y-3">
          {mockMedicalRecord.prescriptions.map((rx, i) => (
            <Card key={i}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-navy-700">{rx.name}</p>
                  <p className="text-sm text-primary-600">{rx.dosage}</p>
                </div>
                <Badge variant="default">{rx.frequency}</Badge>
              </div>
              <p className="text-sm text-gray-500">{rx.instructions}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Health data summary */}
      <section className="mb-6">
        <h2 className="section-title">Health Summary</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="text-center">
            <p className="text-sm text-gray-500 mb-1">Avg Glucose</p>
            <p className="text-2xl font-bold text-navy-700">
              {avgGlucose ?? "--"}
            </p>
            <p className="text-xs text-gray-400">mg/dL</p>
          </Card>
          <Card className="text-center">
            <p className="text-sm text-gray-500 mb-1">Last BP</p>
            <p className="text-2xl font-bold text-navy-700">
              {lastBp
                ? `${lastBp.bloodPressureSystolic}/${lastBp.bloodPressureDiastolic}`
                : "--"}
            </p>
            <p className="text-xs text-gray-400">mmHg</p>
          </Card>
          <Card className="text-center">
            <p className="text-sm text-gray-500 mb-1">Total Entries</p>
            <p className="text-2xl font-bold text-navy-700">
              {mockHealthEntries.length}
            </p>
            <p className="text-xs text-gray-400">this week</p>
          </Card>
          <Card className="text-center">
            <p className="text-sm text-gray-500 mb-1">Med Streak</p>
            <p className="text-2xl font-bold text-primary-600">3</p>
            <p className="text-xs text-gray-400">days</p>
          </Card>
        </div>
      </section>
    </div>
  );
}
