import "../../global.css";

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

import { LoadingScreen } from "@/components";
import { useSessionStore } from "@/store/session";

export default function Layout() {
  const hasHydrated = useSessionStore((state) => state.hasHydrated);

  const [loaded, error] = useFonts({
    "Poppins-light": require("@/assets/fonts/Poppins-100.ttf"),
    "Poppins-regular": require("@/assets/fonts/Poppins-400.ttf"),
    "Poppins-medium": require("@/assets/fonts/Poppins-500.ttf"),
    "Poppins-bold": require("@/assets/fonts/Poppins-700.ttf"),
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  if (!hasHydrated) return <LoadingScreen />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
