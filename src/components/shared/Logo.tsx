import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showTagline?: boolean;
}

const sizeConfig = {
  sm: { icon: 28, text: "text-xl", gap: "gap-2" },
  md: { icon: 36, text: "text-2xl", gap: "gap-2.5" },
  lg: { icon: 48, text: "text-4xl", gap: "gap-3" },
  xl: { icon: 64, text: "text-5xl", gap: "gap-4" },
};

function PanaceaIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Rounded square background */}
      <rect width="64" height="64" rx="16" fill="#14B8A6" />
      {/* Cross / plus symbol */}
      <rect x="26" y="14" width="12" height="36" rx="4" fill="white" />
      <rect x="14" y="26" width="36" height="12" rx="4" fill="white" />
      {/* Heart accent */}
      <path
        d="M32 46C32 46 22 38 22 31C22 28 24.5 26 27 26C29 26 31 27.5 32 29C33 27.5 35 26 37 26C39.5 26 42 28 42 31C42 38 32 46 32 46Z"
        fill="#0D9488"
        opacity="0.3"
      />
    </svg>
  );
}

export default function Logo({ size = "md", className, showTagline }: LogoProps) {
  const config = sizeConfig[size];

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("flex items-center", config.gap)}>
        <PanaceaIcon size={config.icon} />
        <div
          className={cn(
            "font-bold tracking-tight text-navy-700",
            config.text
          )}
        >
          <span className="text-primary-500">Pan</span>acea
        </div>
      </div>
      {showTagline && (
        <p className="text-body text-gray-500 mt-2">
          Continuous care, between visits
        </p>
      )}
    </div>
  );
}

export { PanaceaIcon };
