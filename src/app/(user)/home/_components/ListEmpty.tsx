import { Image } from "react-native";

import { Center, Text, VStack } from "@/components/layout";

export function ListEmpty() {
  return (
    <Center className="gap-6 py-8">
      <Image
        testID="image-empty"
        resizeMode="contain"
        className="h-52 w-3/4"
        source={require("@/assets/images/empty.png")}
      />

      <VStack className="items-center gap-2">
        <Text variant="H4" className="text-center text-gray-800">
          Sem dívidas registradas!
        </Text>

        <Text className="text-center text-base text-gray-800">
          {"Será que estão te pagando certinho\n ou você esqueceu de salvar?"}
        </Text>
      </VStack>
    </Center>
  );
}
