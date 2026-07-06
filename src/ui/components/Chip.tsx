import { Pressable, StyleSheet, Text, type PressableProps, type ViewStyle } from "react-native";

import { useTheme } from "../hooks";

export type ChipProps = PressableProps & {
  label: string;
  selected?: boolean;
  style?: ViewStyle;
};

export function Chip({ label, selected = false, disabled, style, ...props }: ChipProps) {
  const { colors, radius, spacing, typography } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected ? colors.brand.blue : colors.surface.card,
          borderColor: selected ? colors.brand.blue : colors.border.soft,
          borderRadius: radius.full,
          paddingHorizontal: spacing[3],
          paddingVertical: spacing[2],
        },
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
      {...props}
    >
      <Text style={[typography.secondary, { color: selected ? colors.text.inverse : colors.text.primary }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
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
