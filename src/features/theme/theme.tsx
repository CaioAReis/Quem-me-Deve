import { Moon, Sun } from "lucide-react-native";
import { colorScheme, useColorScheme } from "nativewind";
import { TouchableOpacity } from "react-native";

import { Box } from "@/components/layout";

export function Theme() {
  const { toggleColorScheme } = useColorScheme();
  const isDark = colorScheme.get() === "dark";

  return (
    <TouchableOpacity testID="touchable-theme" onPress={toggleColorScheme}>
      {isDark ? (
        <Box testID="sun-icon">
          <Sun color="white" />
        </Box>
      ) : (
        <Box testID="moon-icon">
          <Moon color="white" />
        </Box>
      )}
    </TouchableOpacity>
  );
}
