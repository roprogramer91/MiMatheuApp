import { StyleSheet, Text, View, type ViewProps, type ViewStyle } from "react-native";

import { useTheme } from "../hooks";

export type BadgeTone = "blue" | "fuchsia" | "success" | "warning" | "error" | "info" | "neutral";

export type BadgeProps = ViewProps & {
  label: string;
  tone?: BadgeTone;
  style?: ViewStyle;
};

export function Badge({ label, tone = "neutral", style, ...props }: BadgeProps) {
  const { colors, radius, spacing, typography } = useTheme();
  const toneColor =
    tone === "blue"
      ? colors.brand.blue
      : tone === "fuchsia"
        ? colors.brand.fuchsia
        : tone === "success"
          ? colors.state.success
          : tone === "warning"
            ? colors.state.warning
            : tone === "error"
              ? colors.state.error
              : tone === "info"
                ? colors.state.info
                : colors.text.muted;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: `${toneColor}14`,
          borderColor: `${toneColor}24`,
          borderRadius: radius.full,
          paddingHorizontal: spacing[2],
          paddingVertical: spacing[1],
        },
        style,
      ]}
      {...props}
    >
      <Text style={[typography.badge, { color: toneColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderWidth: 1,
  },
});
