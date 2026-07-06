import { View, type DimensionValue, type ViewProps, type ViewStyle } from "react-native";

import { useTheme } from "../hooks";

export type SkeletonProps = ViewProps & {
  height?: number;
  width?: DimensionValue;
  rounded?: boolean;
  style?: ViewStyle;
};

export function Skeleton({ height = 16, width = "100%", rounded = true, style, ...props }: SkeletonProps) {
  const { colors, radius } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.background.soft,
          borderRadius: rounded ? radius.full : radius.sm,
          height,
          width,
        },
        style,
      ]}
      {...props}
    />
  );
}
