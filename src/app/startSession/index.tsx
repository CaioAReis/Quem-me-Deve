import { Stack } from "expo-router";
import { Controller } from "react-hook-form";
import { Image } from "react-native";

import { useStartSessionForm } from "./_hooks/useStartSessionForm";

import { Avatar, Button, Input } from "@/components";
import { Container, Text, VStack } from "@/components/layout";

export default function StartSession() {
  const { control, watch, errors, handleSubmit } = useStartSessionForm();

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

          <Avatar size="5xl" name="User" xml={watch("avatar")} />

          <VStack className="w-full">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Preencha com seu nome" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  label="Seu Nome"
                  onChangeText={onChange}
                  placeholder="Nome completo"
                  isInvalid={errors.name?.message}
                />
              )}
            />
          </VStack>

          <Button onPress={handleSubmit} className="mt-8 w-full">
            Continue
          </Button>
        </VStack>
      </Container>
    </>
  );
}
