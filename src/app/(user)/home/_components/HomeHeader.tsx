import { LinearGradient } from "expo-linear-gradient";
import { Eye, Moon } from "lucide-react-native";

import { Avatar } from "@/components";
import { Center, HStack, Text, VStack } from "@/components/layout";
import { generateAvatar } from "@/lib";

export function HomeHeader({ loanBalance }: { loanBalance: number }) {
  return (
    <LinearGradient end={{ x: 0.8, y: 1 }} colors={["#7740FE", "#2CDC5F"]}>
      <VStack className="p-6">
        <HStack className="items-center">
          <HStack className="flex-1 items-center">
            <Avatar size="xs" name="Caio AReis" xml={generateAvatar("")} />

            <VStack className="gap-0">
              <Text className="text-sm text-gray-200">Olá,</Text>
              <Text variant="H5" className="text-white">
                Caio AReis
              </Text>
            </VStack>
          </HStack>

          <HStack>
            <Eye color="white" />
            <Moon color="white" />
          </HStack>
        </HStack>

        <Center className="my-6 gap-2">
          <Text className="text-base text-white">Balanço total</Text>
          <Text variant="H1" className="font-poppinsBold text-white">
            {Number(loanBalance).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </Text>
        </Center>
      </VStack>
    </LinearGradient>
  );
}
