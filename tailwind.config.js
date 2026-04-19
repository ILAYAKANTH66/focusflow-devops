/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 12px 40px rgba(59, 130, 246, 0.25)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top left, rgba(56, 189, 248, 0.35), transparent 55%), radial-gradient(circle at 90% 10%, rgba(99, 102, 241, 0.25), transparent 40%)",
      },
    },
  },
  plugins: [],
};
