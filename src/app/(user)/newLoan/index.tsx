import { Stack, useNavigation } from "expo-router";
import { ArrowLeftCircle } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Image, ScrollView, TouchableOpacity } from "react-native";

import { Button, Input } from "@/components";
import { Box, Center, Container, HStack, Text, VStack } from "@/components/layout";

export default function NewLoan() {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();

  const color = colorScheme === "dark" ? "#e9e9ea" : "#3e3e46";

  const handleBack = () => navigation.goBack();

  return (
    <>
      <Stack.Screen options={{ title: "New Loan" }} />

      <Container>
        <ScrollView className="relative">
          <HStack className="m-4 items-center ">
            <TouchableOpacity onPress={handleBack}>
              <ArrowLeftCircle size={30} color={color} />
            </TouchableOpacity>

            <Text variant="H5">Novo Empréstimo</Text>
          </HStack>

          <VStack className="mt-5 flex-1 px-4">
            <VStack>
              <Input placeholder="Nome do Devedor" label="Nome do Devedor" />
              <Input placeholder="Telefone" label="Telefone" />
              <Input placeholder="Valor do Empréstimo" label="Valor do Empréstimo" />
              <Input placeholder="Vencimento" label="Vencimento" />
            </VStack>

            <Center className="mb-36 mt-12 flex-1 gap-6">
              <Image
                className="size-56"
                resizeMode="contain"
                source={require("@/assets/images/burn.png")}
              />

              <Text variant="H5" className="text-center text-gray-800 dark:text-gray-200">
                {"Mais fácil lembrar agora do que\n se arrepender depois!"}
              </Text>
            </Center>
          </VStack>
        </ScrollView>

        <Box className="w-full border-t-2 border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
          <Button>Salvar</Button>
        </Box>
      </Container>
    </>
  );
}
