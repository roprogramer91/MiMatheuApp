import type { ReactNode } from "react";
import { Pressable, StyleSheet, View, type PressableProps, type ViewProps, type ViewStyle } from "react-native";

import { useTheme } from "../hooks";

export type CardProps = ViewProps & {
  children: ReactNode;
  onPress?: PressableProps["onPress"];
  elevated?: boolean;
  bordered?: boolean;
  style?: ViewStyle;
};

export function Card({
  children,
  onPress,
  elevated = true,
  bordered = true,
  style,
  ...props
}: CardProps) {
  const { colors, radius, shadows, spacing } = useTheme();
  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.surface.card,
      borderColor: colors.border.soft,
      borderRadius: radius.xl,
      padding: spacing[5],
    },
    bordered && styles.bordered,
    elevated && shadows.card,
    style,
  ];

  if (onPress) {
    return (
      <Pressable style={({ pressed }) => [cardStyle, pressed && styles.pressed]} onPress={onPress}>
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
  },
  bordered: {
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
});
