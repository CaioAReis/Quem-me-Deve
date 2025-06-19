import { LinearGradient } from "expo-linear-gradient";
import { Link, Stack, Redirect } from "expo-router";
import { Image } from "react-native";

import { Button } from "@/components";
import { Center, Container, Text } from "@/components/layout";
import { useSessionStore } from "@/store/session";

export default function Welcome() {
  const session = useSessionStore((state) => state.session);

  if (session) {
    return <Redirect href="/(user)/home" />;
  }

  return (
    <>
      <Stack.Screen options={{ title: "Welcome" }} />

      <Container>
        <Image className="m-8 size-12" source={require("@/assets/images/logo.png")} />

        <Center className="my-6 h-80 w-10/12 self-end overflow-hidden rounded-l-[80]">
          <LinearGradient
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            end={{ x: 1, y: 0.6 }}
            colors={["#7740FE", "#2CDC5F"]}
          >
            <Image
              resizeMode="contain"
              testID="image-welcome"
              className="ml-9 size-64"
              source={require("@/assets/images/finances.png")}
            />
          </LinearGradient>
        </Center>

        <Center className="gap-6 p-6" testID="content-welcome">
          <Text variant="H3" className="text-center leading-[1.6]">
            {"Garanta o controle do\n seu dinheiro emprestado!"}
          </Text>

          <Text className="text-center text-base/snug opacity-55">
            Evite esquecimentos e dores de cabeça mantenha suas finanças no controle.
          </Text>

          <Link href="/startSession" asChild>
            <Button testID="continue-welcome" className="mt-8 w-full">
              Continuar
            </Button>
          </Link>
        </Center>
      </Container>
    </>
  );
}
