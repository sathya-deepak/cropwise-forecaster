import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2D5A27",
          light: "#4A7A44",
          dark: "#1D3A1A",
        },
        secondary: {
          DEFAULT: "#8B4513",
          light: "#A65D2E",
          dark: "#6B3005",
        },
        accent: {
          DEFAULT: "#DEB887",
          light: "#E8C9A3",
          dark: "#C49B6A",
        },
        cream: "#FFFAF0",
      },
      backgroundImage: {
        "hero-pattern": "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2560&q=80')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
