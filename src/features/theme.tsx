import { Moon, Sun } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import { useAppStore } from "@/store";

export function Theme() {
  const isDark = useAppStore((state) => state.isDark);
  const changeTheme = useAppStore((state) => state.changeTheme);

  return (
    <TouchableOpacity onPress={changeTheme}>
      {isDark ? <Sun color="white" /> : <Moon color="white" />}
    </TouchableOpacity>
  );
}
