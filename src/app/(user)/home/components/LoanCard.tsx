import { Avatar } from "@/components";
import { Box, HStack, Text, VStack } from "@/components/layout";

export function LoanCard() {
  return (
    <HStack className="items-center justify-between px-6 py-1">
      <HStack className="flex-1 gap-3">
        <Avatar name="Caio AReis" size="xs" />

        <VStack className="gap-0">
          <Text variant="H5">Caio AReis</Text>
          <Text className="text-xs text-gray-600">Desde 20/02/2025</Text>
        </VStack>
      </HStack>

      <HStack className="items-center gap-2">
        <Box className="rounded-full bg-orange-400 px-2 py-1">
          <Text className="font-poppinsMedium text-xs text-white">20%</Text>
        </Box>

        <Text variant="H6">R$ 300,00</Text>
      </HStack>
    </HStack>
  );
}
