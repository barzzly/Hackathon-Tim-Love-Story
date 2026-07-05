/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens mapped to CSS variables (see src/styles.css)
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        card: "rgb(var(--surface) / <alpha-value>)",
        "card-foreground": "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--surface) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "on-accent": "rgb(var(--on-accent) / <alpha-value>)",
        destructive: "rgb(var(--destructive) / <alpha-value>)",
        "on-destructive": "rgb(var(--on-destructive) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        kicker: "0.28em",
      },
      boxShadow: {
        soft: "0 1px 0 0 rgb(var(--border) / 1)",
        card: "0 30px 80px -40px rgb(0 0 0 / 0.7)",
      },
      borderRadius: {
        xl: "0.5rem",
        "2xl": "0.75rem",
      },
    },
  },
  plugins: [],
};
