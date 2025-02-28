import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Text } from "./layout";

type Props = {
  className?: string;
  children: ReactNode;
} & TouchableOpacityProps;

export function Button({ children, className, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`overflow-hidden rounded-full ${className}`}
      {...rest}
    >
      <LinearGradient end={{ x: 0.6, y: 2 }} colors={["#7740FE", "#2CDC5F"]}>
        <Text variant="H4" className="m-3 text-center color-white">
          {children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
