import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, type ViewProps, type ViewStyle } from "react-native";

import { Button, type ButtonProps } from "../components";
import { useTheme } from "../hooks";

export type ErrorStateProps = ViewProps & {
  title?: string;
  message?: string;
  action?: ButtonProps;
  style?: ViewStyle;
};

export function ErrorState({
  title = "No pudimos cargar esta informacion",
  message = "Intenta nuevamente en unos segundos.",
  action,
  style,
  ...props
}: ErrorStateProps) {
  const { colors, radius, spacing, typography } = useTheme();

  return (
    <View style={[styles.container, { padding: spacing[6] }, style]} {...props}>
      <View
        style={[
          styles.icon,
          {
            backgroundColor: `${colors.state.error}12`,
            borderRadius: radius.full,
            height: 56,
            width: 56,
          },
        ]}
      >
        <Ionicons name="alert-circle-outline" size={26} color={colors.state.error} />
      </View>
      <View style={[styles.textGroup, { marginTop: spacing[4] }]}>
        <Text style={[typography.cardTitle, { color: colors.text.primary }]}>{title}</Text>
        <Text style={[typography.secondary, { color: colors.text.secondary }]}>{message}</Text>
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
