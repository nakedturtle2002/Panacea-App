"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/shared/Logo";
import Button from "@/components/ui/Button";

export default function RoleSelector() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-background to-background flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-10">
        {/* Logo and branding */}
        <div className="flex flex-col items-center gap-6">
          <Logo size="xl" />
          <p className="text-body-lg text-gray-500 text-center max-w-xs leading-relaxed">
            Continuous care, between visits
          </p>
        </div>

        {/* CTA buttons */}
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

        {/* Trust message */}
        <div className="text-center max-w-xs">
          <p className="text-body-sm text-gray-400 leading-relaxed">
            Panacea helps bridge the gap between clinic visits through simple,
            low-friction aftercare.
          </p>
        </div>
      </div>
    </div>
  );
}
