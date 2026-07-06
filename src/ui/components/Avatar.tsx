import { Image, StyleSheet, Text, View, type ImageSourcePropType, type ViewProps, type ViewStyle } from "react-native";

import { useTheme } from "../hooks";

export type AvatarSize = "sm" | "md" | "lg";

export type AvatarProps = ViewProps & {
  source?: ImageSourcePropType;
  label?: string;
  size?: AvatarSize;
  style?: ViewStyle;
};

export function Avatar({ source, label, size = "md", style, ...props }: AvatarProps) {
  const { colors, radius, sizes, typography } = useTheme();
  const dimension = sizes.avatar[size];
  const initials = label?.trim().slice(0, 2).toUpperCase();

  return (
    <View
      style={[
        styles.avatar,
        {
          backgroundColor: colors.background.soft,
          borderColor: colors.border.soft,
          borderRadius: radius.full,
          height: dimension,
          width: dimension,
        },
        style,
      ]}
      {...props}
    >
      {source ? (
        <Image source={source} style={[styles.image, { borderRadius: radius.full }]} />
      ) : (
        <Text style={[typography.badge, { color: colors.text.primary }]}>{initials}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    borderWidth: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
