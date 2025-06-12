import { ActivityIndicator, Image } from "react-native";

import { Center } from "../layout";

export function LoadingScreen() {
  return (
    <Center className="flex-1">
      <Image
        testID="logo-loading"
        className="m-8 size-14"
        source={require("@/assets/images/logo.png")}
      />
      <ActivityIndicator testID="indicator-loading" color="#7740FE" />
    </Center>
  );
}
