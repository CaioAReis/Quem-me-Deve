import { View } from "react-native";
import { twMerge } from "tailwind-merge";

import { LayoutProps } from "@/@types";

export const VStack = ({ children, className, ...rest }: LayoutProps) => {
  return (
    <View className={twMerge(styles.container, className)} {...rest}>
      {children}
    </View>
  );
};

const styles = {
  container: "flex-col gap-4",
};
