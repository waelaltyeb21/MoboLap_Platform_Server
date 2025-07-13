/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
      },
      fontSize: {
        heading: "var(--font-heading)",
        body: "var(--font-body)",
        small: "var(--font-small)",
      },
    },
  },
  //   plugins: [require("tailwindcss-animate")],
};
