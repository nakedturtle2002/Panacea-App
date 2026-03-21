import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "medication" | "symptoms" | "lifestyle" | "success" | "warning" | "error";
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: "bg-deep-50 text-deep-700",
  medication: "bg-primary-100 text-primary-800",
  symptoms: "bg-amber-100 text-amber-800",
  lifestyle: "bg-blue-100 text-deep-700",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
  error: "bg-red-100 text-red-800",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-body-sm font-semibold",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
