import "../../global.css";

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

import { LoadingScreen } from "@/components";
import { loadStore } from "@/store/db";
import { useSessionStore } from "@/store/session";

export default function Layout() {
  const hasHydrated = useSessionStore((state) => state.hasHydrated);

  const [loaded] = useFonts({
    "Poppins-light": require("@/assets/fonts/Poppins-100.ttf"),
    "Poppins-regular": require("@/assets/fonts/Poppins-400.ttf"),
    "Poppins-medium": require("@/assets/fonts/Poppins-500.ttf"),
    "Poppins-bold": require("@/assets/fonts/Poppins-700.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      if (loaded) {
        await SplashScreen.hideAsync();
        loadStore();
      }
    };

    prepare();
  }, [loaded]);

  if (!loaded) return null;

  if (!hasHydrated) return <LoadingScreen />;

  return (
    <View testID="root" style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
