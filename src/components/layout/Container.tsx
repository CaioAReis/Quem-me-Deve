import { SafeAreaView } from "react-native";

import { LayoutProps } from "@/@types";

export const Container = ({ children, className }: LayoutProps) => {
  return <SafeAreaView className={`flex-1 ${className}`}>{children}</SafeAreaView>;
};
