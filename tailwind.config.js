/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "pop-in": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        "pop-out": {
          "0%": { opacity: "0", transform: "translateY(0px)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.5s ease",
        "pop-out": "pop-out 0.5s ease",
      },
    },
  },
  plugins: [],
};
