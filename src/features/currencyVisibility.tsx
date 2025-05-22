import { Eye, EyeOff } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import { useSessionStore } from "@/store";

export function CurrencyVisibility() {
  const hiddenValues = useSessionStore((state) => state.hiddenValues);
  const changeVisibilityValues = useSessionStore((state) => state.changeVisibilityValues);

  return (
    <TouchableOpacity onPress={changeVisibilityValues} activeOpacity={0.7}>
      {hiddenValues ? <Eye color="white" /> : <EyeOff color="white" />}
    </TouchableOpacity>
  );
}
