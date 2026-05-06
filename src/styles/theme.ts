export const theme = {
  colors: {
    primary: "#1976d2",
    primaryDark: "#125ea8",
    primaryGlow: "#42a5f5",
    accent: "#e3f2fd",
    bg: "#ffffff",
    surface: "#f7f9fc",
    surfaceAlt: "#eef2f7",
    text: "#0f172a",
    textSoft: "#334155",
    muted: "#64748b",
    border: "#e5e7eb",
    borderStrong: "#cbd5e1",
    star: "#f59e0b",
    success: "#16a34a",
    danger: "#dc2626",
    white: "#ffffff",
  },
  radii: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    pill: "999px",
  },
  shadows: {
    sm: "0 1px 2px rgba(15,23,42,.06)",
    card: "0 1px 2px rgba(15,23,42,.06), 0 8px 24px rgba(15,23,42,.06)",
    lg: "0 10px 40px rgba(15,23,42,.12)",
    glow: "0 8px 30px rgba(25,118,210,.25)",
  },
  bp: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  fonts: {
    heading: `"Manrope", system-ui, -apple-system, sans-serif`,
    body: `"Inter", system-ui, -apple-system, sans-serif`,
  },
  container: "1200px",
} as const;

export type AppTheme = typeof theme;
