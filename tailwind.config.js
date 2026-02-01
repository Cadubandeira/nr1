/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./login.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        surface: "var(--color-surface)",
        bg: "var(--color-bg)"
      },
      borderRadius: {
        lg: "var(--radius-lg)"
      }
    }
  },
  plugins: []
};
