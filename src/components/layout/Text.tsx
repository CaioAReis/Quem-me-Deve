import { Text as TextRN } from "react-native";
import { twMerge } from "tailwind-merge";

import { TextProps } from "@/@types";

export const Text = ({ children, variant, className }: TextProps) => {
  return <TextRN className={twMerge(styles[variant ?? "default"], className)}>{children}</TextRN>;
};

const styles = {
  default: "font-poppinsRegular text-lg text-gray-900",
  H1: "text-4xl font-poppinsMedium",
  H2: "text-3xl  font-poppinsMedium",
  H3: "text-2xl font-poppinsMedium",
  H4: "text-xl font-poppinsMedium",
  H5: "text-lg font-poppinsMedium",
  H6: "text-base font-poppinsMedium",
};
