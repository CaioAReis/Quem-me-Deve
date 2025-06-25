import { Link, RelativePathString } from "expo-router";
import { TouchableOpacity } from "react-native";

import { useLoanCard } from "../_hooks/useLoanCard";

import { Avatar } from "@/components";
import { Box, HStack, Text, VStack } from "@/components/layout";
import { useSessionStore } from "@/store/session";
import { convertDateToBR, convertToCurrency } from "@/utils/functions";

type Props = {
  since: Date;
  debit: number;
  userName: string;
  loanBalance: number;
  href: RelativePathString;
};

export function LoanCard({ userName, since, debit, loanBalance, href }: Props) {
  const { percent } = useLoanCard({ debit, loanBalance });
  const hiddenValues = useSessionStore((state) => state.hiddenValues);

  return (
    <Link href={href} asChild>
      <TouchableOpacity activeOpacity={0.7}>
        <HStack className="items-center justify-between px-6 py-1">
          <HStack className="flex-1 items-center gap-3">
            <Avatar name={userName} size="xs" />

            <VStack className="flex-1 gap-0">
              <Text variant="H6" className="text-gray-800" numberOfLines={1}>
                {userName}
              </Text>

              <Text className="text-xs text-gray-600">
                Desde {convertDateToBR(since) ?? "Não disponível"}
              </Text>
            </VStack>
          </HStack>

          {hiddenValues ? (
            <Box testID="hidden" className="h-8 w-28 rounded-lg bg-gray-200 dark:bg-gray-700" />
          ) : (
            <HStack className="items-center gap-2">
              <Box className="rounded-full bg-orange-400 px-2 py-1">
                <Text className="font-poppinsMedium text-xs text-white">{percent}%</Text>
              </Box>

              <Text variant="H6" className="text-gray-800">
                {convertToCurrency(debit / 100)}
              </Text>
            </HStack>
          )}
        </HStack>
      </TouchableOpacity>
    </Link>
  );
}
