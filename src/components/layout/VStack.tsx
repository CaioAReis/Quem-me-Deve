import { View } from "react-native";

import { LayoutProps } from "@/@types";

export const VStack = ({ children, className }: LayoutProps) => {
  return <View className={`${styles.container} ${className}`}>{children}</View>;
};

const styles = {
  container: "flex-col gap-4",
};
