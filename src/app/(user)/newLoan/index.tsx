import { Stack } from "expo-router";
import { ArrowLeftCircle } from "lucide-react-native";
import { Controller } from "react-hook-form";
import { Image, ScrollView, TouchableOpacity } from "react-native";

import { useNewLoan } from "./_hooks/useNewLoan";

import { Button, Input } from "@/components";
import { Box, Center, Container, HStack, Text, VStack } from "@/components/layout";
import { convertToCurrency, dateMask, phoneMask } from "@/utils/functions";
import { RegExValidate } from "@/utils/regex";

export default function NewLoan() {
  const { control, handleSubmit, errors, clearErrors, onSubmit, color, handleBack } = useNewLoan();

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
              <Controller
                name="user.name"
                control={control}
                rules={{ required: "Preencha com o nome da pessoa" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onBlur={onBlur}
                    label="Nome do Devedor"
                    onChangeText={onChange}
                    placeholder="Nome do Devedor"
                    isInvalid={errors.user?.name?.message}
                  />
                )}
              />

              <Controller
                name="user.phone"
                control={control}
                rules={{
                  required: "Preencha com o Telefone da pessoa",
                  pattern: { value: RegExValidate.PHONE, message: "Telefone inválido" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    maxLength={15}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                    label="Telefone do Devedor"
                    value={phoneMask(value ?? "")}
                    placeholder="Telefone do Devedor"
                    isInvalid={errors.user?.phone?.message}
                  />
                )}
              />

              <Controller
                name="totalDebt"
                control={control}
                rules={{
                  required: "Preencha com o valor do Empréstimo",
                  validate: {
                    isValid: (value) => {
                      const numberValue = Number(value);
                      if (numberValue <= 0) return "Valor não pode ser zero";
                      else clearErrors("totalDebt");
                    },
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    maxLength={15}
                    onBlur={onBlur}
                    keyboardType="number-pad"
                    label="Valor do Empréstimo"
                    style={{ textAlign: "right" }}
                    placeholder="Valor do Empréstimo"
                    isInvalid={errors.totalDebt?.message}
                    value={convertToCurrency(Number(value) / 100)}
                    onChangeText={(text) => onChange(text.replace(/\D/g, ""))}
                  />
                )}
              />

              <Controller
                name="deadline"
                control={control}
                rules={{
                  pattern: { value: RegExValidate.DATE, message: "Data inválida" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    maxLength={10}
                    onBlur={onBlur}
                    label="Vencimento"
                    placeholder="Vencimento"
                    onChangeText={onChange}
                    keyboardType="number-pad"
                    value={dateMask(value ?? "")}
                    isInvalid={errors.deadline?.message}
                  />
                )}
              />
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
          <Button onPress={handleSubmit(onSubmit)}>Salvar</Button>
        </Box>
      </Container>
    </>
  );
}
