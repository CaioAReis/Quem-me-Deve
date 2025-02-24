import { Stack } from "expo-router";
import { Image } from "react-native";

import { Center, Container } from "@/components/layout";

export default function Welcome() {
  return (
    <>
      <Stack.Screen options={{ title: "Welcome" }} />

      <Container className="border border-red-600">
        <Image className="m-8 size-16" source={require("@/assets/images/logo.png")} />

        <Center className="h-96 w-11/12 self-end rounded-l-[80] bg-purple-500">
          <Image
            resizeMode="contain"
            className="ml-9 size-72"
            source={require("@/assets/images/finances.png")}
          />
        </Center>
      </Container>
    </>
  );
}
