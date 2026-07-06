import type { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, type PressableProps, type ViewStyle } from "react-native";

import { useTheme } from "../hooks";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonTone = "blue" | "fuchsia";

export type ButtonProps = PressableProps & {
  title: string;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
};

export function Button({
  title,
  variant = "primary",
  tone = "blue",
  leftIcon,
  rightIcon,
  loading = false,
  fullWidth = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const { colors, radius, sizes, spacing, typography } = useTheme();
  const isDisabled = disabled || loading;
  const backgroundColor =
    variant === "primary"
      ? tone === "fuchsia"
        ? colors.brand.fuchsia
        : colors.brand.blue
      : variant === "danger"
        ? colors.state.error
        : variant === "secondary"
          ? colors.surface.card
          : "transparent";
  const textColor =
    variant === "primary" || variant === "danger"
      ? colors.text.inverse
      : tone === "fuchsia"
        ? colors.brand.fuchsia
        : colors.brand.blue;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          borderColor: variant === "secondary" ? colors.border.soft : backgroundColor,
          borderRadius: radius.md,
          minHeight: sizes.touchable,
          paddingHorizontal: spacing[4],
        },
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
      {...props}
    >
      {loading ? <ActivityIndicator color={textColor} /> : leftIcon}
      <Text
        style={[
          typography.button,
          {
            color: textColor,
            marginLeft: leftIcon || loading ? spacing[2] : 0,
            marginRight: rightIcon && !loading ? spacing[2] : 0,
          },
        ]}
      >
        {title}
      </Text>
      {!loading ? rightIcon : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.88,
  },
});
