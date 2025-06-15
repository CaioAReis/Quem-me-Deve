import { Eye, EyeOff } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import { Box } from "@/components/layout";
import { useSessionStore } from "@/store/session";

export function CurrencyVisibility() {
  const hiddenValues = useSessionStore((state) => state.hiddenValues);
  const changeVisibilityValues = useSessionStore((state) => state.changeVisibilityValues);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      testID="touchable-visibility"
      onPress={changeVisibilityValues}
    >
      {hiddenValues ? (
        <Box testID="eye-open">
          <Eye color="white" />
        </Box>
      ) : (
        <Box testID="eye-closed">
          <EyeOff color="white" />
        </Box>
      )}
    </TouchableOpacity>
  );
}
