import { ArrowLeftCircle } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import { HStack, Text } from "@/components/layout";

type Props = {
  color: string;
  title?: string;
  handleBack: VoidFunction;
};

export function NewLoanHeader({ handleBack, color, title }: Props) {
  return (
    <HStack className="m-4 items-center" testID="new-loan-header">
      <TouchableOpacity testID="arrow-back" onPress={handleBack}>
        <ArrowLeftCircle size={30} color={color} />
      </TouchableOpacity>

      <Text variant="H5">{title ?? ""}</Text>
    </HStack>
  );
}
