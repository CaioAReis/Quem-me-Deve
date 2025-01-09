import { Stack } from "expo-router";

import { ScreenContent } from "@/components/ScreenContent";
import { Container } from "@/components/layout";

export default function Welcome() {
  return (
    <>
      <Stack.Screen options={{ title: "Welcome" }} />

      <Container>
        <ScreenContent path="app/index.tsx" title="Home" />
      </Container>
    </>
  );
}
