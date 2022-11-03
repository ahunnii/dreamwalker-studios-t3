/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        golden: "1.618",
      },
      backgroundImage: {
        "burnt-titanium": "url('/assets/colors/burnt_titanium_alt.png')",
        rainbow: "url('/assets/colors/rainbow_alt.png')",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
