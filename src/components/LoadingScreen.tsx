import { ActivityIndicator, Image } from "react-native";

import { Center } from "./layout";

export function LoadingScreen() {
  return (
    <Center className="flex-1">
      <Image className="m-8 size-14" source={require("@/assets/images/logo.png")} />
      <ActivityIndicator color="#7740FE" />
    </Center>
  );
}
