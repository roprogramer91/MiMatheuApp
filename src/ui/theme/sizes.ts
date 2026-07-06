export const sizes = {
  touchable: 44,
  iconButton: 44,
  avatar: {
    sm: 32,
    md: 44,
    lg: 56,
  },
  divider: 1,
  screenMaxWidth: 720,
} as const;

export type Sizes = typeof sizes;
