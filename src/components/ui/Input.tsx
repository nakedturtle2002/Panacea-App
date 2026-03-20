"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-body font-semibold text-navy-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full rounded-2xl border border-border bg-white px-4 py-3.5 text-body text-navy-700 placeholder:text-gray-400 min-h-touch",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          error && "border-red-400 focus:ring-red-400",
          className
        )}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={
          error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
        }
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-body-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="text-body-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}
