import { StyleSheet, Text, View } from "react-native";

import { Badge, Card, type CardProps } from "../components";
import { useTheme } from "../hooks";

export type NewsCardProps = Omit<CardProps, "children"> & {
  title: string;
  summary: string;
  source?: string;
  date?: string;
  badge?: string;
};

export function NewsCard({ title, summary, source, date, badge, ...props }: NewsCardProps) {
  const { colors, spacing, typography } = useTheme();

  return (
    <Card {...props}>
      <View style={[styles.meta, { marginBottom: spacing[2] }]}>
        {source ? <Text style={[typography.caption, { color: colors.text.muted, marginRight: spacing[2] }]}>{source}</Text> : null}
        {date ? <Text style={[typography.caption, { color: colors.text.muted, marginRight: spacing[2] }]}>{date}</Text> : null}
        {badge ? <Badge label={badge} tone="blue" style={{ marginRight: spacing[2] }} /> : null}
      </View>
      <Text style={[typography.cardTitle, { color: colors.text.primary }]}>{title}</Text>
      <Text style={[typography.body, { color: colors.text.secondary, marginTop: spacing[2] }]}>{summary}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  meta: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
