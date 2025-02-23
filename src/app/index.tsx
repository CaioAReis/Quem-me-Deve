import { Stack } from "expo-router";

import { Center, Container, Text } from "@/components/layout";

export default function Welcome() {
  return (
    <>
      <Stack.Screen options={{ title: "Welcome" }} />

      <Container>
        <Center className="flex-1">
          <Text variant="H1">Hello World!</Text>
          <Text variant="H1">Hello World!</Text>

          <Text>Welcome to App</Text>
          <Text className="font-poppins[3]">Welcome to App</Text>
        </Center>
      </Container>
    </>
  );
}
