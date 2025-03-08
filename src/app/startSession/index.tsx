import { thumbs } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Stack } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { Image } from "react-native";

import { Avatar, Button, Input } from "@/components";
import { Container, Text, VStack } from "@/components/layout";

type UserData = {
  name: string;
  avatar: string;
};

export default function StartSession() {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  const avatar = createAvatar(thumbs, {
    scale: 80,
    seed: watch("name"),
    shapeColor: ["FE7740"],
    backgroundRotation: [25],
    backgroundType: ["gradientLinear"],
    backgroundColor: ["7740FE", "2CDC5F"],
  });

  const onSubmit = (data: UserData) => {
    const userData = {
      ...data,
      avatar: avatar.toString(),
    } as UserData;

    console.log(userData);
  };

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

          <Avatar
            size="5xl"
            name="Caio AReis"
            xml={avatar.toString()}
          />

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

          <Button onPress={handleSubmit(onSubmit)} className="mt-8 w-full">
            Continue
          </Button>
        </VStack>
      </Container>
    </>
  );
}
