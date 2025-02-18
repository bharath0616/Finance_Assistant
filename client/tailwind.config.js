/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["DM Sans", "sans-serif"], // Set DM Sans as the default font for all text
      },
    },
  },
  plugins: [],
}
