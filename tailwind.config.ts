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
        deep: {
          50: "#EBF4FF",
          100: "#D6E8FA",
          200: "#ADC8E6",
          300: "#7BA4CC",
          400: "#4A7FB3",
          500: "#1E5A99",
          600: "#164680",
          700: "#0F2942",
          800: "#0A1F35",
          900: "#06131F",
        },
        pastel: {
          cyan: "#E0F7F5",
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
        background: "#F0FAFA",
        border: "#D1E8E8",
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
        soft: "0 2px 12px rgba(15, 41, 66, 0.06), 0 1px 3px rgba(15, 41, 66, 0.04)",
        glow: "0 4px 20px rgba(20, 184, 166, 0.2)",
        "glow-lg":
          "0 8px 32px rgba(20, 184, 166, 0.25), 0 4px 12px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
