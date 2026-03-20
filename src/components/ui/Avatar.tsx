import React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles: Record<string, string> = {
  sm: "w-10 h-10 text-body-sm",
  md: "w-14 h-14 text-body",
  lg: "w-20 h-20 text-heading-2",
};

export default function Avatar({ name, size = "md", className }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold",
        sizeStyles[size],
        className
      )}
      role="img"
      aria-label={name}
    >
      {initials}
    </div>
  );
}
