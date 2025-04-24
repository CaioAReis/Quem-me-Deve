import "../../global.css";

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

export default function Layout() {
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

  return <Stack screenOptions={{ headerShown: false }} />;
}
