import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Badge, Card, type CardProps } from "../components";
import { useTheme } from "../hooks";

export type RouteAlertCardProps = Omit<CardProps, "children"> & {
  title: string;
  location: string;
  reason: string;
  severity?: "info" | "warning" | "error";
};

export function RouteAlertCard({ title, location, reason, severity = "info", ...props }: RouteAlertCardProps) {
  const { colors, radius, spacing, typography } = useTheme();
  const toneColor =
    severity === "warning" ? colors.state.warning : severity === "error" ? colors.state.error : colors.state.info;

  return (
    <Card {...props}>
      <View style={styles.header}>
        <View
          style={[
            styles.iconWrap,
          {
            backgroundColor: `${toneColor}12`,
            borderRadius: radius.full,
            marginRight: spacing[3],
          },
        ]}
        >
          <Ionicons name="navigate-outline" size={22} color={toneColor} />
        </View>
        <View style={styles.textGroup}>
          <Text style={[typography.cardTitle, { color: colors.text.primary }]}>{title}</Text>
          <Text style={[typography.secondary, { color: colors.text.secondary }]}>{location}</Text>
        </View>
        <Badge
          label={severity === "info" ? "Info" : severity === "warning" ? "Atencion" : "Urgente"}
          tone={severity}
          style={{ marginLeft: spacing[2] }}
        />
      </View>
      <Text style={[typography.body, { color: colors.text.secondary, marginTop: spacing[3] }]}>{reason}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
  iconWrap: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  textGroup: {
    flex: 1,
  },
});
