import type { ReactNode } from "react";
import { ScrollView, StyleSheet, View, type ScrollViewProps, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "../hooks";

export type ScreenProps = Omit<ScrollViewProps, "contentContainerStyle"> & {
  children: ReactNode;
  scroll?: boolean;
  centered?: boolean;
  contentContainerStyle?: ViewStyle;
};

export function Screen({
  children,
  scroll = true,
  centered = false,
  style,
  contentContainerStyle,
  ...props
}: ScreenProps) {
  const { colors, spacing } = useTheme();

  const containerStyle = [
    styles.content,
    {
      paddingHorizontal: spacing[5],
      paddingVertical: spacing[4],
    },
    centered && styles.centered,
    contentContainerStyle,
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background.app }, style]}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={containerStyle}
          showsVerticalScrollIndicator={false}
          {...props}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={containerStyle}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  centered: {
    justifyContent: "center",
  },
});
