import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View, type TextInputProps, type ViewStyle } from "react-native";

import { useTheme } from "../hooks";

export type SearchBarProps = TextInputProps & {
  containerStyle?: ViewStyle;
};

export function SearchBar({ containerStyle, placeholder = "Buscar", style, ...props }: SearchBarProps) {
  const { colors, radius, sizes, spacing, typography } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface.card,
          borderColor: colors.border.soft,
          borderRadius: radius.lg,
          minHeight: sizes.touchable,
          paddingHorizontal: spacing[3],
        },
        containerStyle,
      ]}
    >
      <Ionicons name="search" size={18} color={colors.text.muted} style={{ marginRight: spacing[2] }} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.text.muted}
        style={[styles.input, typography.body, { color: colors.text.primary }, style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
});
