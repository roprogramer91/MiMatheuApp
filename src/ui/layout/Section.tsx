import type { ReactNode } from "react";
import { StyleSheet, Text, View, type ViewProps, type ViewStyle } from "react-native";

import { useTheme } from "../hooks";

export type SectionProps = ViewProps & {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  style?: ViewStyle;
};

export function Section({ title, description, action, children, style, ...props }: SectionProps) {
  const { colors, spacing, typography } = useTheme();
  const hasHeader = Boolean(title || description || action);

  return (
    <View style={style} {...props}>
      {hasHeader ? (
        <View style={[styles.header, { marginBottom: spacing[3] }]}>
          <View style={styles.headerText}>
            {title ? (
              <Text style={[typography.sectionTitle, { color: colors.text.primary }]}>
                {title}
              </Text>
            ) : null}
            {description ? (
              <Text style={[typography.secondary, { color: colors.text.secondary }]}>
                {description}
              </Text>
            ) : null}
          </View>
          {action}
        </View>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    flex: 1,
  },
});
