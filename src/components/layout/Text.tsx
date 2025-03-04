import { Text as TextRN } from "react-native";

import { TextProps } from "@/@types";

export const Text = ({ children, variant, className }: TextProps) => {
  return (
    <TextRN className={`text-gray-900 ${styles[variant ?? "default"]} ${className}`}>
      {children}
    </TextRN>
  );
};

const styles = {
  default: "text-lg font-poppinsRegular",
  H1: "text-4xl font-poppinsMedium",
  H2: "text-3xl font-poppinsMedium",
  H3: "text-2xl font-poppinsMedium",
  H4: "text-xl font-poppinsMedium",
  H5: "text-lg font-poppinsMedium",
  H6: "text-base font-poppinsMedium",
};
