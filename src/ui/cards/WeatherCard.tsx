import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Badge, Card, type CardProps } from "../components";
import { useTheme } from "../hooks";

export type WeatherCardProps = Omit<CardProps, "children"> & {
  title?: string;
  temperature: string;
  condition: string;
  detail?: string;
  recommendation?: string;
};

export function WeatherCard({ title, temperature, condition, detail, recommendation, ...props }: WeatherCardProps) {
  const { colors, radius, spacing, typography } = useTheme();

  return (
    <Card {...props}>
      <View style={styles.header}>
        <View style={styles.textGroup}>
          <Text style={[typography.caption, { color: colors.text.muted }]}>{title ?? "Clima"}</Text>
          <Text style={[typography.display, { color: colors.text.primary }]}>{temperature}</Text>
          <Text style={[typography.body, { color: colors.text.secondary }]}>{condition}</Text>
        </View>
        <View
          style={[
            styles.iconWrap,
            {
              backgroundColor: `${colors.brand.blue}12`,
              borderRadius: radius.full,
              height: 56,
              width: 56,
            },
          ]}
        >
          <Ionicons name="partly-sunny-outline" size={28} color={colors.brand.blue} />
        </View>
      </View>
      {detail ? <Text style={[typography.secondary, { color: colors.text.secondary }]}>{detail}</Text> : null}
      {recommendation ? (
        <View style={{ marginTop: spacing[1] }}>
          <Badge label={recommendation} tone="blue" />
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  textGroup: {
    flex: 1,
  },
});
