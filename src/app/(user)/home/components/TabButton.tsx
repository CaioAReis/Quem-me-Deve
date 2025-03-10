import { icons } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import { HStack, Text } from "@/components/layout";

type Props = {
  label: string;
  selected?: boolean;
  onPress?: VoidFunction;
  icon: keyof typeof icons;
};

export function TabButton({ label, icon, selected, onPress }: Props) {
  const LucideIcon = icons[icon];
  const selectedColor = selected ? "#7740FE" : "#7e7e84";

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} className="flex-1">
      <HStack
        className={`items-center justify-center gap-2 border-b-2 px-2 pb-1 ${selected ? styles.lineSelected : styles.linedefault}`}
      >
        <Text className={selected ? styles.selected : styles.default}>{label}</Text>
        <LucideIcon size={20} color={selectedColor} />
      </HStack>
    </TouchableOpacity>
  );
}

const styles = {
  default: "text-gray-500 font-poppinsRegular",
  selected: "text-primary-400 font-poppinsMedium",

  linedefault: "border-transparent",
  lineSelected: "border-primary-400",
};
