import { LinearGradient } from "expo-linear-gradient";
import { SvgXml } from "react-native-svg";
import { twMerge } from "tailwind-merge";

import { Box, Center, Text } from "../layout";

type Props = {
  xml?: string;
  name: string;
  className?: string;
  size?: "xs" | "sm" | "base" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
};

const SIZES = {
  xs: { dim: 50, label: "xl" },
  sm: { dim: 70, label: "xl" },
  base: { dim: 80, label: "xl" },
  xl: { dim: 100, label: "3xl" },
  "2xl": { dim: 110, label: "3xl" },
  "3xl": { dim: 120, label: "3xl" },
  "4xl": { dim: 130, label: "4xl" },
  "5xl": { dim: 140, label: "4xl" },
};

export function Avatar({ xml, name, size = "base", className }: Props) {
  const nameSplited = name.split(" ");
  const lettersName = nameSplited[0][0] + nameSplited[nameSplited.length - 1][0];

  const { dim, label } = SIZES[size];

  return (
    <Box
      className={twMerge(
        "overflow-hidden rounded-full border-2 border-gray-50 p-0 dark:border-gray-900",
        className
      )}
    >
      <LinearGradient
        testID="avatar-gradient"
        end={{ x: 1.1, y: 0.3 }}
        colors={["#7740FE", "#2CDC5F"]}
        style={{ width: dim, height: dim }}
      >
        <Center className="size-full">
          {xml ? (
            <SvgXml testID="xml-avatar" width="100%" height="100%" xml={xml} />
          ) : (
            <Text className={`font-poppinsMedium text-gray-50 text-${label}`}>
              {lettersName.toLocaleUpperCase()}
            </Text>
          )}
        </Center>
      </LinearGradient>
    </Box>
  );
}
