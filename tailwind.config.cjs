/** @type {import('tailwindcss').Config} */
const brandColors = {
  birdblue: "#1D9BF0",
  platinum: "#E7E9EA",
  silver: "#71767B",
  onix: "#333639",
  richBlack: "#15202B",
};

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...brandColors,

        backgroundColor: brandColors.richBlack,
        textColor: brandColors.platinum,
      },
    },
  },
  plugins: [],
};
