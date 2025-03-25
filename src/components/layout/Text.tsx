import { Text as TextRN, TextProps as TextPropsRN } from "react-native";
import { twMerge } from "tailwind-merge";

import { TextProps } from "@/@types";

export const Text = ({ children, variant, className, ...rest }: TextProps & TextPropsRN) => {
  return (
    <TextRN
      className={twMerge(`${styles.color} ${styles[variant ?? "default"]}`, className)}
      {...rest}
    >
      {children}
    </TextRN>
  );
};

const styles = {
  color: "text-gray-900 dark:text-gray-100",
  default: "font-poppinsRegular text-lg",
  H1: "text-4xl font-poppinsMedium",
  H2: "text-3xl  font-poppinsMedium",
  H3: "text-2xl font-poppinsMedium",
  H4: "text-xl font-poppinsMedium",
  H5: "text-lg font-poppinsMedium",
  H6: "text-base font-poppinsMedium",
};
