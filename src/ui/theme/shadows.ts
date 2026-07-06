import type { ViewStyle } from "react-native";

export const shadows = {
  card: {
    shadowColor: "#071b4d",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.07,
    shadowRadius: 28,
    elevation: 3,
  },
  floating: {
    shadowColor: "#071b4d",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 6,
  },
  modal: {
    shadowColor: "#071b4d",
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.18,
    shadowRadius: 70,
    elevation: 10,
  },
  bottomNavigation: {
    shadowColor: "#071b4d",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 8,
  },
} satisfies Record<string, ViewStyle>;

export type Shadows = typeof shadows;
