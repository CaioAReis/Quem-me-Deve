import { Stack } from "expo-router";

import { Center, Container, Text } from "@/components/layout";

export default function NewLoan() {
  return (
    <>
      <Stack.Screen options={{ title: "New Loan" }} />

      <Container className="bg-gray-50">
        <Center className="flex-1">
          <Text>New Loan</Text>
        </Center>
      </Container>
    </>
  );
}
