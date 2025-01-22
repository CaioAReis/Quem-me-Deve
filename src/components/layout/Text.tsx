import { Text as TextRN } from "react-native";

import { TextProps } from "@/@types";

export const Text = ({ children, variant, className }: TextProps) => {
  return (
    <TextRN className={`${styles.default} ${styles[variant ?? "default"]} ${className}`}>
      {children}
    </TextRN>
  );
};

const styles = {
  default: "text-lg",
  H1: "font-bold text-4xl",
  H2: "font-bold text-3xl",
  H3: "font-bold text-2xl",
  H4: "font-bold text-xl",
  H5: "font-bold text-lg",
  H6: "font-bold text-base",
};
