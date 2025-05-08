import { ArrowDown, ArrowUp } from "lucide-react-native";

import { HistoryItem } from "@/@types";
import { HStack, Text, VStack } from "@/components/layout";
import { convertToCurrency } from "@/utils/functions";

type Props = {
  loan: HistoryItem;
};

export function LoanCard({ loan }: Props) {
  return (
    <HStack className="items-center p-4">
      {loan.type === "loan" && <ArrowDown size={28} color="#ef4444" />}
      {loan.type === "payment" && <ArrowUp size={28} color="#22c55e" />}

      <VStack className="flex-1 gap-1">
        <Text variant="H6">Você {loan.type === "loan" ? "Emprestou" : "Recebeu"}</Text>
        <Text className="text-xs text-gray-600 dark:text-gray-400">
          {loan?.createdAt?.toLocaleDateString()}
        </Text>
      </VStack>

      <Text variant="H5" className={styles[loan.type]}>
        {convertToCurrency(loan?.value / 100)}
      </Text>
    </HStack>
  );
}

const styles = {
  loan: "text-red-500 dark:text-red-500",
  payment: "text-green-500 dark:text-green-500",
};
