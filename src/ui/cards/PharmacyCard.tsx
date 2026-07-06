import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Badge, Button, Card, type ButtonProps, type CardProps } from "../components";
import { useTheme } from "../hooks";

export type PharmacyCardProps = Omit<CardProps, "children"> & {
  name: string;
  address: string;
  schedule?: string;
  open?: boolean;
  action?: ButtonProps;
};

export function PharmacyCard({ name, address, schedule, open, action, ...props }: PharmacyCardProps) {
  const { colors, radius, spacing, typography } = useTheme();

  return (
    <Card {...props}>
      <View style={styles.header}>
        <View
          style={[
            styles.iconWrap,
            {
              backgroundColor: `${colors.state.success}12`,
              borderRadius: radius.full,
              marginRight: spacing[3],
            },
          ]}
        >
          <Ionicons name="medical-outline" size={22} color={colors.state.success} />
        </View>
        <View style={styles.textGroup}>
          <Text style={[typography.cardTitle, { color: colors.text.primary }]}>{name}</Text>
          <Text style={[typography.secondary, { color: colors.text.secondary }]}>{address}</Text>
        </View>
        {typeof open === "boolean" ? (
          <Badge label={open ? "Abierto" : "Cerrado"} tone={open ? "success" : "neutral"} style={{ marginLeft: spacing[2] }} />
        ) : null}
      </View>
      {schedule ? <Text style={[typography.secondary, { color: colors.text.muted, marginTop: spacing[3] }]}>{schedule}</Text> : null}
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
