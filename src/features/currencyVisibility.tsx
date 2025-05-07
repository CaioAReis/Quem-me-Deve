import { Eye, EyeOff } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import { useAppStore } from "@/store";

export function CurrencyVisibility() {
  const hiddenValues = useAppStore((state) => state.hiddenValues);
  const changeVisibilityValues = useAppStore((state) => state.changeVisibilityValues);

  return (
    <TouchableOpacity onPress={changeVisibilityValues} activeOpacity={0.7}>
      {hiddenValues ? <Eye color="white" /> : <EyeOff color="white" />}
    </TouchableOpacity>
  );
}
