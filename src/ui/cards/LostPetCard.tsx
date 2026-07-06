import { Image, StyleSheet, Text, View, type ImageSourcePropType } from "react-native";

import { Badge, Button, Card, type ButtonProps, type CardProps } from "../components";
import { useTheme } from "../hooks";

export type LostPetCardProps = Omit<CardProps, "children"> & {
  name: string;
  zone: string;
  status: "lost" | "found" | "reunited";
  image?: ImageSourcePropType;
  detail?: string;
  action?: ButtonProps;
};

export function LostPetCard({ name, zone, status, image, detail, action, ...props }: LostPetCardProps) {
  const { colors, radius, spacing, typography } = useTheme();
  const statusLabel = status === "lost" ? "Perdida" : status === "found" ? "Encontrada" : "Reunida";
  const statusTone = status === "lost" ? "fuchsia" : status === "found" ? "blue" : "success";

  return (
    <Card {...props}>
      <View style={styles.row}>
        <View
          style={[
            styles.imageWrap,
            {
              backgroundColor: colors.background.soft,
              borderRadius: radius.lg,
              marginRight: spacing[3],
            },
          ]}
        >
          {image ? <Image source={image} style={styles.image} /> : null}
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[typography.cardTitle, { color: colors.text.primary }]}>{name}</Text>
            <Badge label={statusLabel} tone={statusTone} style={{ marginLeft: spacing[2] }} />
          </View>
          <Text style={[typography.secondary, { color: colors.text.secondary, marginTop: spacing[1] }]}>{zone}</Text>
          {detail ? (
            <Text style={[typography.secondary, { color: colors.text.muted, marginTop: spacing[1] }]}>
              {detail}
            </Text>
          ) : null}
        </View>
      </View>
      {action ? (
        <View style={{ marginTop: spacing[1] }}>
          <Button {...action} />
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  imageWrap: {
    height: 76,
    overflow: "hidden",
    width: 76,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
