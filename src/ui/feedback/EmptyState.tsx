import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, type ViewProps, type ViewStyle } from "react-native";

import { Button, type ButtonProps } from "../components";
import { useTheme } from "../hooks";

export type EmptyStateProps = ViewProps & {
  title: string;
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  action?: ButtonProps;
  style?: ViewStyle;
};

export function EmptyState({ title, message, icon = "sparkles-outline", action, style, ...props }: EmptyStateProps) {
  const { colors, radius, spacing, typography } = useTheme();

  return (
    <View style={[styles.container, { padding: spacing[6] }, style]} {...props}>
      <View
        style={[
          styles.icon,
          {
            backgroundColor: colors.background.soft,
            borderRadius: radius.full,
            height: 56,
            width: 56,
          },
        ]}
      >
        <Ionicons name={icon} size={24} color={colors.brand.blue} />
      </View>
      <View style={[styles.textGroup, { marginTop: spacing[4] }]}>
        <Text style={[typography.cardTitle, { color: colors.text.primary }]}>{title}</Text>
        {message ? (
          <Text style={[typography.secondary, { color: colors.text.secondary }]}>{message}</Text>
        ) : null}
      </View>
      {action ? (
        <View style={{ marginTop: spacing[4] }}>
          <Button {...action} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
  textGroup: {
    alignItems: "center",
  },
});
