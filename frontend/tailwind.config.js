/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefcf5",
          100: "#d8f6e8",
          200: "#b1ecd2",
          300: "#7ddfb6",
          400: "#45cb97",
          500: "#23b682",
          600: "#189169",
          700: "#147556",
          800: "#145d46",
          900: "#124d3b",
        },
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Manrope", "ui-sans-serif", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 24px -14px rgba(16, 24, 40, 0.25)",
        soft: "0 12px 40px -22px rgba(16, 24, 40, 0.3)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 450ms ease-out both",
      },
    },
  },
  plugins: [],
}
