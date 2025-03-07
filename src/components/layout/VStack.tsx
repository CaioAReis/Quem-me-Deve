import { View } from "react-native";
import { twMerge } from "tailwind-merge";

import { LayoutProps } from "@/@types";

export const VStack = ({ children, className }: LayoutProps) => {
  return <View className={twMerge(styles.container, className)}>{children}</View>;
};

const styles = {
  container: "flex-col gap-4",
};
