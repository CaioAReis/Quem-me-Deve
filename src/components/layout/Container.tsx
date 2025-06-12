import { SafeAreaView } from "react-native";
import { twMerge } from "tailwind-merge";

import { LayoutProps } from "@/@types";

export const Container = ({ children, className, ...rest }: LayoutProps) => {
  return (
    <SafeAreaView className={twMerge("flex-1 bg-gray-50 dark:bg-gray-900", className)} {...rest}>
      {children}
    </SafeAreaView>
  );
};
