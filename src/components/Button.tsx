import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Center, Text } from "./layout";

type Props = {
  className?: string;
  children: ReactNode;
  variant?: "solid" | "outline";
} & TouchableOpacityProps;

export function Button({ children, className, variant, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`overflow-hidden rounded-full ${className}`}
      {...rest}
    >
      <LinearGradient style={{ padding: 2 }} end={{ x: 0.6, y: 2 }} colors={["#7740FE", "#2CDC5F"]}>
        <Center className={`${styles[variant ?? "solid"]} rounded-full`}>
          <Text variant="H5" className={`${colorStyles[variant ?? "solid"]} m-2 text-center`}>
            {children}
          </Text>
        </Center>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = {
  solid: "bg-transparent",
  outline: "bg-gray-50",
};

const colorStyles = {
  solid: "color-white",
  outline: "color-primary-500",
};
