import type { ReactNode } from "react";
import { StyleSheet, View, type ViewProps, type ViewStyle } from "react-native";

import { useTheme } from "../hooks";

export type ContainerProps = ViewProps & {
  children: ReactNode;
  centered?: boolean;
  padded?: boolean;
  style?: ViewStyle;
};

export function Container({
  children,
  centered = false,
  padded = false,
  style,
  ...props
}: ContainerProps) {
  const { sizes, spacing } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { maxWidth: sizes.screenMaxWidth },
        centered && styles.centered,
        padded && { paddingHorizontal: spacing[5] },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "100%",
  },
  centered: {
    justifyContent: "center",
  },
});
