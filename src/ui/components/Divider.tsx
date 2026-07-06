import { View, type ViewProps, type ViewStyle } from "react-native";

import { useTheme } from "../hooks";

export type DividerProps = ViewProps & {
  vertical?: boolean;
  style?: ViewStyle;
};

export function Divider({ vertical = false, style, ...props }: DividerProps) {
  const { colors, sizes } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.border.soft,
          height: vertical ? "100%" : sizes.divider,
          width: vertical ? sizes.divider : "100%",
        },
        style,
      ]}
      {...props}
    />
  );
}
