import { colors } from "./colors";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { sizes } from "./sizes";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  sizes,
} as const;

export type Theme = typeof theme;
