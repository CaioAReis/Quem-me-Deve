import { View } from "react-native";

import { LayoutProps } from "@/@types";

export const HStack = ({ children, className }: LayoutProps) => {
  return <View className={`${styles.container} ${className}`}>{children}</View>;
};

const styles = {
  container: "flex-row gap-4",
};
