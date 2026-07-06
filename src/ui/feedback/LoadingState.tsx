import { ActivityIndicator, StyleSheet, Text, View, type ViewProps, type ViewStyle } from "react-native";

import { useTheme } from "../hooks";

export type LoadingStateProps = ViewProps & {
  title?: string;
  message?: string;
  style?: ViewStyle;
};

export function LoadingState({ title = "Cargando", message, style, ...props }: LoadingStateProps) {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={[styles.container, { padding: spacing[6] }, style]} {...props}>
      <ActivityIndicator color={colors.brand.blue} />
      <View style={[styles.textGroup, { marginTop: spacing[3] }]}>
        <Text style={[typography.cardTitle, { color: colors.text.primary }]}>{title}</Text>
        {message ? (
          <Text style={[typography.secondary, { color: colors.text.secondary }]}>{message}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  textGroup: {
    alignItems: "center",
  },
});
