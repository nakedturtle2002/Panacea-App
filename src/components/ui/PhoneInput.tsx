"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const COUNTRY_CODES = [
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+63", country: "Philippines", flag: "🇵🇭" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+855", country: "Cambodia", flag: "🇰🇭" },
  { code: "+856", country: "Laos", flag: "🇱🇦" },
  { code: "+95", country: "Myanmar", flag: "🇲🇲" },
];

interface PhoneInputProps {
  label?: string;
  countryCode: string;
  phone: string;
  onCountryCodeChange: (code: string) => void;
  onPhoneChange: (phone: string) => void;
  required?: boolean;
  error?: string;
}

export default function PhoneInput({
  label = "Phone Number",
  countryCode,
  phone,
  onCountryCodeChange,
  onPhoneChange,
  required,
  error,
}: PhoneInputProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-body font-semibold text-deep-800">{label}</label>
      )}
      <div ref={wrapperRef} className="relative flex gap-2">
        {/* Country code selector */}
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-3.5 rounded-2xl border border-white/40 bg-white/80 backdrop-blur-sm text-body text-deep-800 min-h-touch whitespace-nowrap",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "hover:bg-gray-50 transition-colors"
          )}
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
        >
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="font-medium">{selectedCountry.code}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 ml-0.5">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Phone number input */}
        <input
          type="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="Phone number"
          required={required}
          className={cn(
            "flex-1 rounded-2xl border border-border bg-white px-4 py-3.5 text-body text-deep-800 placeholder:text-gray-400 min-h-touch",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            error && "border-red-400 focus:ring-red-400"
          )}
        />

        {/* Dropdown */}
        {dropdownOpen && (
          <ul
            className="absolute top-full left-0 z-30 mt-1 w-72 max-h-64 overflow-y-auto rounded-2xl border border-white/40 bg-white/95 backdrop-blur-md shadow-glow-lg"
            role="listbox"
          >
            {COUNTRY_CODES.map((country) => (
              <li key={country.code}>
                <button
                  type="button"
                  onClick={() => {
                    onCountryCodeChange(country.code);
                    setDropdownOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-body text-deep-800 hover:bg-primary-50 transition-colors min-h-touch border-b border-gray-100 last:border-b-0",
                    country.code === countryCode && "bg-primary-50 font-semibold"
                  )}
                  role="option"
                  aria-selected={country.code === countryCode}
                >
                  <span className="text-xl">{country.flag}</span>
                  <span className="flex-1 text-left">{country.country}</span>
                  <span className="text-gray-500 font-medium">{country.code}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <p className="text-body-sm text-red-600" role="alert">{error}</p>
      )}
    </div>
  );
}
