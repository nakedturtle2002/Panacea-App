"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/shared/Logo";
import Button from "@/components/ui/Button";

export default function RoleSelector() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <div className="text-center">
          <Logo size="lg" className="justify-center mb-4" />
          <p className="text-body-lg text-gray-500">
            Continuous care, between visits
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <Button
            fullWidth
            size="lg"
            onClick={() => router.push("/onboarding")}
            aria-label="Continue as Patient"
          >
            I am a Patient
          </Button>
          <Button
            fullWidth
            size="lg"
            variant="secondary"
            onClick={() => router.push("/doctor/dashboard")}
            aria-label="Continue as Doctor"
          >
            I am a Doctor
          </Button>
        </div>

        <p className="text-sm text-gray-400 text-center max-w-xs">
          Panacea helps bridge the gap between clinic visits through simple,
          low-friction aftercare.
        </p>
      </div>
    </div>
  );
}
