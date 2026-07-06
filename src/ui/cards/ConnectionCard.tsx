import { StyleSheet, Text, View } from "react-native";

import { Avatar, Badge, Button, Card, type ButtonProps, type CardProps } from "../components";
import { useTheme } from "../hooks";

export type ConnectionCardProps = Omit<CardProps, "children"> & {
  title: string;
  message: string;
  badge?: string;
  source?: string;
  action?: ButtonProps;
};

export function ConnectionCard({ title, message, badge, source, action, ...props }: ConnectionCardProps) {
  const { colors, spacing, typography } = useTheme();

  return (
    <Card {...props}>
      <View style={styles.header}>
        <Avatar label={source ?? title} style={{ marginRight: spacing[3] }} />
        <View style={styles.headerText}>
          <Text style={[typography.cardTitle, { color: colors.text.primary }]}>{title}</Text>
          {source ? <Text style={[typography.caption, { color: colors.text.muted }]}>{source}</Text> : null}
        </View>
        {badge ? <Badge label={badge} tone="fuchsia" style={{ marginLeft: spacing[2] }} /> : null}
      </View>
      <Text style={[typography.body, { color: colors.text.secondary, marginTop: spacing[3] }]}>{message}</Text>
      {action ? (
        <View style={{ marginTop: spacing[1] }}>
          <Button {...action} />
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
  headerText: {
    flex: 1,
  },
});
