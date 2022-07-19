/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "chitter-base": "#7f50f5",
        "chitter-light": "#9f6bff",
        "chitter-black": "#121212",
        "chitter-dark": "#7349de",
        "chitter-darker": "#492e8f",
        "chitter-darkest": "#140c29",
        "chitter-text": "#d9d9d9",
        "material-hover": "rgba(255, 255, 255, 0.06)",
      }
    },
  },
  plugins: [],
}
