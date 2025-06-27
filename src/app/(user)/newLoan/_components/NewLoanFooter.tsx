import { Image } from "react-native";

import { Center, Text } from "@/components/layout";

type Props = {
  image?: string;
  title?: string;
};

export function NewLoanFooter({ image, title }: Props) {
  return (
    <Center className="mb-36 mt-12 flex-1 gap-6" testID="new-loan-footer">
      <Image
        className="size-56"
        resizeMode="contain"
        source={image ?? require("@/assets/images/burn.png")}
      />

      <Text variant="H5" className="text-center text-gray-800 dark:text-gray-200">
        {title ?? ""}
      </Text>
    </Center>
  );
}
