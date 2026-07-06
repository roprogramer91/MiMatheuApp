import type { TextStyle } from "react-native";

const fontFamily = undefined;

export const typography = {
  fontFamily,
  logo: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
  },
  display: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: "800",
  },
  screenTitle: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
  },
  sectionTitle: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "700",
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
  bodyStrong: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
  },
  secondary: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
  },
  badge: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
  },
} satisfies Record<string, TextStyle | undefined>;

export type Typography = typeof typography;
