import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, type PressableProps, type ViewStyle } from "react-native";

import { useTheme } from "../hooks";

export type IconButtonVariant = "primary" | "secondary" | "ghost";

export type IconButtonProps = PressableProps & {
  name: keyof typeof Ionicons.glyphMap;
  variant?: IconButtonVariant;
  active?: boolean;
  size?: number;
  style?: ViewStyle;
};

export function IconButton({
  name,
  variant = "secondary",
  active = false,
  size = 20,
  disabled,
  style,
  ...props
}: IconButtonProps) {
  const { colors, radius, sizes } = useTheme();
  const isPrimary = variant === "primary" || active;
  const backgroundColor = isPrimary
    ? colors.brand.blue
    : variant === "secondary"
      ? colors.surface.card
      : "transparent";
  const iconColor = isPrimary ? colors.text.inverse : colors.brand.blueDark;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          borderColor: variant === "secondary" ? colors.border.soft : backgroundColor,
          borderRadius: radius.full,
          height: sizes.iconButton,
          width: sizes.iconButton,
        },
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
      {...props}
    >
      <Ionicons name={name} size={size} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderWidth: 1,
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.86,
  },
});
