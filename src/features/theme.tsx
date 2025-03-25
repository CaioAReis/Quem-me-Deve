import { Moon, Sun } from "lucide-react-native";
import { colorScheme, useColorScheme } from "nativewind";
import { TouchableOpacity } from "react-native";

export function Theme() {
  const { toggleColorScheme } = useColorScheme();
  const isDark = colorScheme.get() === "dark";

  return (
    <TouchableOpacity onPress={toggleColorScheme}>
      {isDark ? <Sun color="white" /> : <Moon color="white" />}
    </TouchableOpacity>
  );
}
