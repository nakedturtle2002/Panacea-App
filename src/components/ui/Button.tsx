"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-sm",
  secondary:
    "bg-white hover:bg-gray-50 active:bg-gray-100 text-navy-700 border border-border shadow-sm",
  ghost:
    "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-navy-700",
  danger:
    "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-sm",
};

const sizeStyles: Record<string, string> = {
  sm: "px-4 py-2.5 text-body-sm min-h-[44px]",
  md: "px-5 py-3.5 text-body min-h-touch",
  lg: "px-6 py-4 text-body-lg min-h-[56px] font-semibold",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
