import { Link, Stack } from "expo-router";
import { Puzzle } from "lucide-react-native";

import { Button } from "@/components";
import { Center, Text, VStack } from "@/components/layout";
import { Container } from "@/components/layout/Container";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />

      <Container>
        <Center className="flex-1 gap-12 px-10">
          <Puzzle size={30} color="#7740FE" fill="#7740FE80" />
          <VStack className="items-center gap-2">
            <Text variant="H2">Oops!</Text>
            <Text>Página não encontrada!</Text>
          </VStack>
          <Link href="/" asChild>
            <Button className="w-full">Voltar ao início</Button>
          </Link>
        </Center>
      </Container>
    </>
  );
}
