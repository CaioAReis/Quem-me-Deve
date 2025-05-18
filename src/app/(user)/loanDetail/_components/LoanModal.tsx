import { Info } from "lucide-react-native";
import { Controller } from "react-hook-form";

import { useLoanForm } from "../_hooks/useLoanForm";

import { Button, Input } from "@/components";
import { HStack, Text, VStack } from "@/components/layout";
import { convertToCurrency } from "@/utils/functions";

export function LoanModal({ onCloseModal }: { onCloseModal: VoidFunction }) {
  const { control, errors, handleSubmit } = useLoanForm({ onCloseModal });

  return (
    <VStack className="my-4">
      <Controller
        name="value"
        control={control}
        rules={{
          required: "Preencha com o valor recebido",
          validate: {
            isValid: (value) => {
              if (value === 0) return "Valor não pode ser zero";
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
            isInvalid={errors.value?.message}
            value={convertToCurrency(Number(value) / 100)}
            onChangeText={(text) => onChange(text.replace(/\D/g, ""))}
          />
        )}
      />

      <HStack className="my-8 items-center justify-center gap-2 rounded-xl bg-primary-500/20 p-2">
        <Info color="#7740FE" />
        <Text className="flex-1 text-sm text-primary-500">
          Prefira valores que não comprometam seu orçamento caso demorem a ser pagos.
        </Text>
      </HStack>

      <Button onPress={handleSubmit}>Salvar Empréstimo</Button>
    </VStack>
  );
}
