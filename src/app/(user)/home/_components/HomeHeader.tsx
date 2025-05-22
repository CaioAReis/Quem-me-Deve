import { LinearGradient } from "expo-linear-gradient";

import { Avatar } from "@/components";
import { Box, Center, HStack, Text, VStack } from "@/components/layout";
import { CurrencyVisibility } from "@/features/currencyVisibility";
import { Theme } from "@/features/theme";
import { generateAvatar } from "@/lib";
import { useSessionStore } from "@/store";
import { convertToCurrency } from "@/utils/functions";

export function HomeHeader({ loanBalance }: { loanBalance: number }) {
  const hiddenValues = useSessionStore((state) => state.hiddenValues);

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
            <CurrencyVisibility />

            <Theme />
          </HStack>
        </HStack>

        <Center className="my-6 gap-2">
          <Text className="text-base text-white">Balanço total</Text>

          {hiddenValues ? (
            <Box className="mt-2 h-14 w-2/3 rounded-lg bg-gray-200/55" />
          ) : (
            <Text variant="H1" className="font-poppinsBold text-white">
              {convertToCurrency(loanBalance)}
            </Text>
          )}
        </Center>
      </VStack>
    </LinearGradient>
  );
}
