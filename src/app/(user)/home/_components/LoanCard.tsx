import { Avatar } from "@/components";
import { Box, HStack, Text, VStack } from "@/components/layout";

type Props = {
  since: Date;
  debit: number;
  userName: string;
  loanBalance: number;
};

export function LoanCard({ userName, since, debit, loanBalance }: Props) {
  return (
    <HStack className="items-center justify-between px-6 py-1">
      <HStack className="flex-1 items-center gap-3">
        <Avatar name={userName} size="xs" />

        <VStack className="flex-1 gap-0">
          <Text variant="H6" className="text-gray-800" numberOfLines={1}>
            {userName}
          </Text>

          <Text className="text-xs text-gray-600">Desde {since.toLocaleDateString("pt-BR")}</Text>
        </VStack>
      </HStack>

      <HStack className="items-center gap-2">
        <Box className="rounded-full bg-orange-400 px-2 py-1">
          <Text className="font-poppinsMedium text-xs text-white">20%</Text>
        </Box>

        <Text variant="H6" className="text-gray-800">
          {(debit / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </Text>
      </HStack>
    </HStack>
  );
}
