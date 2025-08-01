/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        "up-to-down": {
          "0%": { transform: "translateY(-30%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "up-to-down":
          "up-to-down 1s ease-out forwards alternate-reverse infinite",
      },
    },
  },
};
