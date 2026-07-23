/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          primary: "var(--surface-primary)",
          secondary: "var(--surface-secondary)",
          elevated: "var(--surface-elevated)",
          brand: "var(--surface-brand)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          inverse: "var(--text-inverse)",
        },
        border: {
          default: "var(--border-default)",
          subtle: "var(--border-subtle)",
        },
        accent: {
          primary: "var(--accent-primary)",
          hover: "var(--accent-hover)",
          subtle: "var(--accent-subtle)",
        },
        status: {
          success: "var(--status-success)",
          warning: "var(--status-warning)",
          error: "var(--status-error)",
          info: "var(--status-info)",
        },
      },
      fontFamily: {
        sans: ["Geist", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.05", fontWeight: "300", letterSpacing: "-0.025em" }],
        "h1": ["2.5rem", { lineHeight: "1.1", fontWeight: "400", letterSpacing: "-0.02em" }],
        "h2": ["1.875rem", { lineHeight: "1.2", fontWeight: "500", letterSpacing: "-0.015em" }],
        "h3": ["1.375rem", { lineHeight: "1.3", fontWeight: "500", letterSpacing: "-0.01em" }],
        "h4": ["1.125rem", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400", letterSpacing: "0" }],
        "body": ["1rem", { lineHeight: "1.6", fontWeight: "400", letterSpacing: "0" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400", letterSpacing: "0" }],
        "caption": ["0.8125rem", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.01em" }],
        "overline": ["0.6875rem", { lineHeight: "1.3", fontWeight: "600", letterSpacing: "0.08em" }],
      },
      spacing: {
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
        "12": "3rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem",
      },
      boxShadow: {
        "subtle": "0 1px 2px rgba(59,53,80,0.06)",
        "default": "0 2px 8px rgba(59,53,80,0.08)",
        "prominent": "0 8px 32px rgba(59,53,80,0.12)",
        "ambient": "0 0 0 1px rgba(59,53,80,0.04)",
        "card-hover": "0 8px 30px rgba(59,53,80,0.12)",
      },
      borderRadius: {
        "pill": "9999px",
        "xl": "0.75rem",
        "2xl": "1rem",
      },
      maxWidth: {
        "content": "1280px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "card-lift": {
          "0%": { transform: "translateY(0)", boxShadow: "0 1px 2px rgba(59,53,80,0.06)" },
          "100%": { transform: "translateY(-4px)", boxShadow: "0 8px 30px rgba(59,53,80,0.12)" },
        },
        "nav-blur": {
          "0%": { backdropFilter: "blur(0)", "-webkit-backdrop-filter": "blur(0)" },
          "100%": { backdropFilter: "blur(16px)", "-webkit-backdrop-filter": "blur(16px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "card-lift": "card-lift 0.2s cubic-bezier(0.16,1,0.3,1) forwards",
        "nav-blur": "nav-blur 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
}
