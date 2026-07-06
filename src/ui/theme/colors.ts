export const colors = {
  brand: {
    blue: "#0066ff",
    blueAlt: "#0077ff",
    blueDark: "#071b4d",
    fuchsia: "#ec168f",
    fuchsiaDark: "#c91178",
  },
  background: {
    app: "#f7f9fc",
    soft: "#f3f6fb",
  },
  surface: {
    card: "#ffffff",
    raised: "#ffffff",
  },
  border: {
    soft: "#e6edf5",
    focus: "#0066ff",
  },
  text: {
    primary: "#071b4d",
    secondary: "#526174",
    muted: "#7b8aa0",
    inverse: "#ffffff",
  },
  state: {
    success: "#16a34a",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#0066ff",
  },
} as const;

export type Colors = typeof colors;
