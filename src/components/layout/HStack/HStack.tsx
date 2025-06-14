import { View } from "react-native";
import { twMerge } from "tailwind-merge";

import { LayoutProps } from "@/@types";

export const HStack = ({ children, className, ...rest }: LayoutProps) => {
  return (
    <View className={twMerge(styles.container, className)} {...rest}>
      {children}
    </View>
  );
};

const styles = {
  container: "flex-row gap-4",
};
