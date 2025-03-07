import { SafeAreaView } from "react-native";
import { twMerge } from "tailwind-merge";

import { LayoutProps } from "@/@types";

export const Container = ({ children, className }: LayoutProps) => {
  return <SafeAreaView className={twMerge("flex-1", className)}>{children}</SafeAreaView>;
};
