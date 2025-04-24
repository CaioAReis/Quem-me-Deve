import { Stack } from "expo-router";
import { ScrollView } from "react-native";

import { LoanForm, NewLoanFooter, NewLoanHeader } from "./_components";
import { useNewLoan } from "./_hooks/useNewLoan";

import { Button } from "@/components";
import { Box, Container, VStack } from "@/components/layout";

export default function NewLoan() {
  const { control, handleSubmit, errors, color, handleBack } = useNewLoan();

  console.warn(errors);

  return (
    <>
      <Stack.Screen options={{ title: "New Loan" }} />

      <Container>
        <ScrollView className="relative">
          <NewLoanHeader title="Novo Empréstimo" color={color} handleBack={handleBack} />

          <VStack className="mt-5 flex-1 px-4">
            <LoanForm control={control} errors={errors} />

            <NewLoanFooter
              image={require("@/assets/images/burn.png")}
              title={"Mais fácil lembrar agora do que\n se arrepender depois!"}
            />
          </VStack>
        </ScrollView>

        <Box className="w-full border-t-2 border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
          <Button onPress={handleSubmit}>Salvar</Button>
        </Box>
      </Container>
    </>
  );
}
