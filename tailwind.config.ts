import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E8F8F8",
          100: "#D0F0F0",
          200: "#B8E8E8",
          300: "#A8E0E8",
          400: "#50C0C0",
          500: "#38C0C8",
          600: "#30A8B8",
          700: "#28A0A8",
          800: "#1E8090",
          900: "#156070",
        },
        deep: {
          50: "#F5F3F4",
          100: "#E8E6E7",
          200: "#C8C6C7",
          300: "#9A9A9A",
          400: "#8A8A8A",
          500: "#6B6B6B",
          600: "#4A4A4A",
          700: "#2E2E2E",
          800: "#1A1A1A",
          900: "#0A0A0A",
        },
        pastel: {
          cyan: "#D0F0F0",
          mint: "#D1FAE5",
          blue: "#DBEAFE",
          sky: "#E0F2FE",
          lavender: "#EDE9FE",
        },
        navy: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1E3A5F",
          800: "#1E2D4A",
          900: "#0F172A",
        },
        surface: "#FFFFFF",
        background: "#FEFDFD",
        border: "#D6D4D5",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "body-sm": ["1rem", { lineHeight: "1.5" }],
        body: ["1.125rem", { lineHeight: "1.75" }],
        "body-lg": ["1.25rem", { lineHeight: "1.875" }],
        "heading-1": ["2rem", { lineHeight: "2.5rem", fontWeight: "700" }],
        "heading-2": ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        "heading-3": [
          "1.25rem",
          { lineHeight: "1.75rem", fontWeight: "600" },
        ],
      },
      minHeight: {
        touch: "48px",
      },
      minWidth: {
        touch: "48px",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 12px rgba(40, 160, 168, 0.06), 0 1px 3px rgba(40, 160, 168, 0.04)",
        glow: "0 4px 20px rgba(56, 192, 200, 0.3)",
        "glow-lg":
          "0 8px 32px rgba(56, 192, 200, 0.35), 0 4px 12px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
