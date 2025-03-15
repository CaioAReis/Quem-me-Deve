import { Eye, EyeOff } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import { useAppStore } from "@/store";

export function CurrencyVisibility() {
  const hiddenValues = useAppStore((state) => state.hiddenValues);
  const changeVisibilityValues = useAppStore((state) => state.changeVisibilityValues);

  return (
    <TouchableOpacity onPress={changeVisibilityValues}>
      {hiddenValues ? <EyeOff color="white" /> : <Eye color="white" />}
    </TouchableOpacity>
  );
}
