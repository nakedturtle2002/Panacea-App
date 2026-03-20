"use client";

import { useState, useRef, useEffect } from "react";
import { mockHospitals } from "@/lib/mock-data/hospitals";
import { cn } from "@/lib/utils";

interface HospitalPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
}

export default function HospitalPicker({
  value,
  onChange,
  label = "Hospital",
  required,
}: HospitalPickerProps) {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 1 && query !== value) {
      const filtered = mockHospitals.filter((h) =>
        h.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query, value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectHospital = (hospital: string) => {
    setQuery(hospital);
    onChange(hospital);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative flex flex-col gap-1.5">
      {label && (
        <label className="text-body font-medium text-navy-700">{label}</label>
      )}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value !== value) {
              onChange("");
            }
          }}
          onFocus={() => {
            if (query.length >= 1 && suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder="Type to search hospitals..."
          required={required}
          className={cn(
            "w-full rounded-xl border border-border bg-white px-4 py-3 text-body text-navy-700 placeholder:text-gray-400 min-h-touch",
            "focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent",
            value && "border-primary-300 bg-primary-50"
          )}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls="hospital-listbox"
          role="combobox"
        />
        {value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary-500"
            >
              <path
                d="M20 6 9 17l-5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-400">
        Type 1-2 characters to see suggestions
      </p>

      {isOpen && (
        <ul
          id="hospital-listbox"
          className="absolute top-full left-0 right-0 z-20 mt-1 max-h-60 overflow-y-auto rounded-xl border border-border bg-white shadow-lg"
          role="listbox"
        >
          {suggestions.map((hospital) => (
            <li key={hospital}>
              <button
                type="button"
                onClick={() => selectHospital(hospital)}
                className="w-full text-left px-4 py-3 text-body text-navy-700 hover:bg-primary-50 transition-colors min-h-touch border-b border-border last:border-b-0"
                role="option"
                aria-selected={hospital === value}
              >
                <span className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-400 flex-shrink-0"
                  >
                    <path d="M3 21h18" />
                    <path d="M5 21V7l8-4v18" />
                    <path d="M19 21V11l-6-4" />
                    <path d="M9 9v.01" />
                    <path d="M9 12v.01" />
                    <path d="M9 15v.01" />
                    <path d="M9 18v.01" />
                  </svg>
                  {hospital}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
