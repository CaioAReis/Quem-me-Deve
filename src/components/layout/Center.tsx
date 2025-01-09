import { View } from "react-native";

import { LayoutProps } from "@/@types";

export const Center = ({ children, className }: LayoutProps) => {
  return <View className={`${styles.container} ${className}`}>{children}</View>;
};

const styles = {
  container: "justify-center items-center",
};
