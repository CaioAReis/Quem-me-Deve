import { View } from "react-native";

import { LayoutProps } from "@/@types";

export const Box = ({ children, className }: LayoutProps) => {
  return <View className={`${styles.container} ${className}`}>{children}</View>;
};

const styles = {
  container: "flex-col p-2",
};
