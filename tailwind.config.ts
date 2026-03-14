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
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
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
        background: "#FAFAF8",
        border: "#E2E8F0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "body": ["1rem", { lineHeight: "1.625" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        "heading-1": ["1.75rem", { lineHeight: "2.25rem", fontWeight: "600" }],
        "heading-2": ["1.375rem", { lineHeight: "1.875rem", fontWeight: "600" }],
        "heading-3": ["1.125rem", { lineHeight: "1.625rem", fontWeight: "500" }],
      },
      minHeight: {
        "touch": "48px",
      },
      minWidth: {
        "touch": "48px",
      },
    },
  },
  plugins: [],
};

export default config;
