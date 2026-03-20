"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { hospitalData, HospitalEntry } from "@/lib/mock-data/hospitals";
import { cn } from "@/lib/utils";

interface HospitalPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
}

interface GroupedResult {
  city: string;
  hospitals: HospitalEntry[];
}

export default function HospitalPicker({
  value,
  onChange,
  label = "Hospital",
  required,
}: HospitalPickerProps) {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter and group hospitals by city
  const grouped = useMemo<GroupedResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [];

    const filtered = hospitalData.filter((h) =>
      h.name.toLowerCase().includes(q) ||
      h.city.toLowerCase().includes(q)
    );

    const cityMap = new Map<string, HospitalEntry[]>();
    for (const h of filtered) {
      const key = `${h.city}, ${h.region}`;
      if (!cityMap.has(key)) cityMap.set(key, []);
      cityMap.get(key)!.push(h);
    }

    return Array.from(cityMap.entries()).map(([city, hospitals]) => ({
      city,
      hospitals,
    }));
  }, [query]);

  const flatResults = useMemo(
    () => grouped.flatMap((g) => g.hospitals),
    [grouped]
  );

  // Show dropdown when we have results and user is actively typing
  useEffect(() => {
    if (query.length >= 1 && query !== value && flatResults.length > 0) {
      setIsOpen(true);
      setHighlightIndex(-1);
    } else if (flatResults.length === 0) {
      setIsOpen(false);
    }
  }, [query, value, flatResults.length]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      selectHospital(flatResults[highlightIndex].name);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative flex flex-col gap-1.5">
      {label && (
        <label className="text-body font-semibold text-navy-700">{label}</label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value !== value) {
              onChange("");
            }
          }}
          onFocus={() => {
            if (query.length >= 1 && flatResults.length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search hospitals..."
          required={required}
          className={cn(
            "w-full rounded-2xl border border-border bg-white px-4 py-3.5 text-body text-navy-700 placeholder:text-gray-400 min-h-touch",
            "focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent",
            value && "border-primary-300 bg-primary-50/50"
          )}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls="hospital-listbox"
          role="combobox"
        />
        {value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-500">
              <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        {!value && query.length === 0 && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      {isOpen && (
        <ul
          id="hospital-listbox"
          className="absolute top-full left-0 right-0 z-20 mt-1 max-h-72 overflow-y-auto rounded-2xl border border-border bg-white shadow-xl"
          role="listbox"
        >
          {grouped.map((group) => (
            <li key={group.city} role="presentation">
              {/* City group header */}
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 sticky top-0">
                <span className="text-body-sm font-semibold text-gray-500 uppercase tracking-wide">
                  {group.city}
                </span>
              </div>
              <ul role="group" aria-label={group.city}>
                {group.hospitals.map((hospital) => {
                  const flatIdx = flatResults.indexOf(hospital);
                  return (
                    <li key={hospital.name} role="presentation">
                      <button
                        type="button"
                        onClick={() => selectHospital(hospital.name)}
                        className={cn(
                          "w-full text-left px-4 py-3 text-body text-navy-700 hover:bg-primary-50 transition-colors min-h-touch border-b border-gray-50 last:border-b-0",
                          flatIdx === highlightIndex && "bg-primary-50",
                          hospital.name === value && "bg-primary-100 font-semibold"
                        )}
                        role="option"
                        aria-selected={hospital.name === value}
                      >
                        <span className="flex items-center gap-2.5">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 flex-shrink-0">
                            <path d="M3 21h18" />
                            <path d="M5 21V7l8-4v18" />
                            <path d="M19 21V11l-6-4" />
                          </svg>
                          <span className="flex-1">
                            {hospital.name}
                            {hospital.type === "private" && (
                              <span className="ml-2 text-xs text-gray-400 font-normal">Private</span>
                            )}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
          {flatResults.length === 0 && query.length >= 1 && (
            <li className="px-4 py-4 text-body text-gray-400 text-center">
              No hospitals found for &ldquo;{query}&rdquo;
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
