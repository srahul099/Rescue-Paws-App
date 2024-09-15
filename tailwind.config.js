/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "general-sans": ["generalsans-regular", "sans-serif"],
        "general-sans-bold": ["generalsans-bold", "sans-serif"],
        "general-sans-light": ["generalsans-light", "sans-serif"],
        "general-sans-medium": ["generalsans-medium", "sans-serif"],
        "general-sans-semibold": ["generalsans-semibold", "sans-serif"],
      },
      colors: {
        "login-bg": "#01EDFA",
        white: "#ffffff",
        charcoal: "#272829",
        grey: "#383B45",
        "light-grey": "#D3D3D3",
        platinum: "#E5E4E2",
        smoke: "#808080",
        "btn-orange": "#FF8D08",
        "dark-orange": "#FF6D00",
        "light-orange": "#FFEAD2",
        "btn-red": "#dc2626",
        "btn-yellow": "#f59e0b",
        "btn-green": "#10b981",
      },
    },
  },
  plugins: [],
};
