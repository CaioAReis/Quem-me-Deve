import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { twMerge } from "tailwind-merge";

import { Center, Text } from "../layout";

type Props = {
  colors?: string[];
  loading?: boolean;
  className?: string;
  children: ReactNode;
  variant?: "solid" | "outline";
} & TouchableOpacityProps;

export function Button({
  colors,
  children,
  className,
  loading = false,
  variant = "solid",
  ...rest
}: Props) {
  const gradientColor = colors
    ? colors.length === 1
      ? [colors[0], colors[0]]
      : colors
    : ["#7740FE", "#2CDC5F"];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      testID="touchable-button"
      className={twMerge("overflow-hidden rounded-full disabled:opacity-40", className)}
      {...rest}
    >
      <LinearGradient
        style={{ padding: 2 }}
        end={{ x: 0.6, y: 2 }}
        colors={gradientColor as [string, string, ...string[]]}
      >
        <Center testID="contain-button" className={`${styles[variant]} rounded-full`}>
          {loading ? (
            <ActivityIndicator
              size="small"
              testID="loading-button"
              className={`size-11 ${colorStyles[variant]}`}
            />
          ) : (
            <Text variant="H5" className={`${colorStyles[variant]} m-2 text-center`}>
              {children}
            </Text>
          )}
        </Center>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = {
  solid: "bg-transparent",
  outline: "bg-gray-50 dark:bg-gray-900",
};

const colorStyles = {
  solid: "color-white dark:text-gray-90",
  outline: "color-primary-500 dark:color-primary-300",
};
