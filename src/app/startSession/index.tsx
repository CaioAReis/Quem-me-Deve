import { thumbs } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Stack } from "expo-router";
import { Image } from "react-native";
import { SvgXml } from "react-native-svg";

import { Button, Input } from "@/components";
import { Center, Container, Text, VStack } from "@/components/layout";

export default function StartSession() {
  const avatar = createAvatar(thumbs, {
    seed: "John Doe",
    scale: 80,
    shapeColor: ["FE7740"],
    backgroundRotation: [25],
    backgroundType: ["gradientLinear"],
    backgroundColor: ["7740FE", "2CDC5F"],
  });

  return (
    <>
      <Stack.Screen options={{ title: "StartSession" }} />

      <Container className="bg-gray-50">
        <Image className="m-8 size-12" source={require("@/assets/images/logo.png")} />

        <VStack className="w-full items-center justify-center gap-12 p-6">
          <Text variant="H3" className="text-center leading-[1.6]">
            Complete as informações
          </Text>

          <Text className="text-center text-base/snug opacity-55">
            {"Antes de começar, precisamos\n de algumas informações."}
          </Text>

          <Center className="size-40 overflow-hidden rounded-full">
            <SvgXml width="100%" height="100%" xml={avatar.toString()} />
          </Center>

          <VStack className="w-full">
            <Input label="Seu nome" placeholder="Seu nome" />
          </VStack>

          <Button className="mt-8 w-full">Continue</Button>
        </VStack>
      </Container>
    </>
  );
}
