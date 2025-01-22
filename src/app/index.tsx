import { Stack } from "expo-router";

import { Center, Container, Text } from "@/components/layout";

export default function Welcome() {
  return (
    <>
      <Stack.Screen options={{ title: "Welcome" }} />

      <Container>
        <Center className="flex-1 border-2">
          <Text variant="H1">Hello World!</Text>
          <Text>Welcome to App</Text>
        </Center>
      </Container>
    </>
  );
}
