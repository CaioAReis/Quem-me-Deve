import { Info } from "lucide-react-native";
import { Controller } from "react-hook-form";

import { useEditDebtForm } from "../_hooks/useEditDebtor";

import { User } from "@/@types";
import { Button, Input } from "@/components";
import { HStack, Text, VStack } from "@/components/layout";

type Props = {
  onCloseModal: VoidFunction;
  user: Pick<User, "name" | "phone">;
};

export function EditDebtorModal({ user, onCloseModal }: Props) {
  const { control, errors, handleSubmit } = useEditDebtForm({ user, onCloseModal });

  return (
    <VStack className="my-4">
      <VStack className="gap-2">
        <Controller
          name="name"
          control={control}
          rules={{ required: "Preencha com o nome do Devedor" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Nome"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Nome do Devedor"
              isInvalid={errors.name?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          rules={{ required: "Preencha com o telefone do Devedor" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              label="Telefone"
              onChangeText={onChange}
              isInvalid={errors.name?.message}
              placeholder="Telefone do Devedor"
            />
          )}
        />
      </VStack>

      <HStack className="my-8 items-center justify-center gap-2 rounded-xl bg-primary-500/20 p-2">
        <Info color="#7740FE" />
        <Text className="text-sm text-primary-500">Anote tudo certinho.</Text>
      </HStack>

      <Button onPress={handleSubmit}>Salvar Empréstimo</Button>
    </VStack>
  );
}
