"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon";
  className?: string;
}

const sizeConfig = {
  sm: { width: 32, height: 32, fullWidth: 32, fullHeight: 38 },
  md: { width: 48, height: 48, fullWidth: 48, fullHeight: 58 },
  lg: { width: 80, height: 80, fullWidth: 80, fullHeight: 96 },
  xl: { width: 120, height: 120, fullWidth: 120, fullHeight: 144 },
};

export default function Logo({ size = "md", variant = "full", className }: LogoProps) {
  const config = sizeConfig[size];
  const src = variant === "full" ? "/panacea-logo.svg" : "/panacea-icon.svg";
  const w = variant === "full" ? config.fullWidth : config.width;
  const h = variant === "full" ? config.fullHeight : config.height;

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image
        src={src}
        alt="Panacea"
        width={w}
        height={h}
        priority
        className="object-contain"
      />
    </div>
  );
}
