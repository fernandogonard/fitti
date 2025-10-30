/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        black: "#0d0d0d",
        darkGray: "#1a1a1a",
        gray: "#2e2e2e",
        lightGray: "#d1d1d1",
        orange: "#ff5500",
        gold: "#f5b800",
        gray900: "#121212", // Definición de bg-gray-900
        gray800: "#1f2937", // Definición de bg-gray-800
        gray700: "#374151", // Definición de hover:bg-gray-700
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        display: ["Oswald", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 10px rgba(255, 85, 0, 0.5)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
