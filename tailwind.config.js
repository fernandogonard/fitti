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
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#121212',
        },
        lightGray: "#d1d1d1",
        orange: "#ff5500",
        gold: "#f5b800",
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
