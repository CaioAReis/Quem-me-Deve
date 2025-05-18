import { Info } from "lucide-react-native";
import { Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native";

import { usePaymentForm } from "../_hooks/usePaymentForm";

import { PaymentFormProps } from "@/@types";
import { Button, Input } from "@/components";
import { HStack, Text, VStack } from "@/components/layout";
import { convertToCurrency } from "@/utils/functions";

export function PaymentModal({ totalDebit, onCloseModal }: PaymentFormProps) {
  const { control, errors, handlePayAllDebit, handleSubmit } = usePaymentForm({
    totalDebit,
    onCloseModal,
  });

  console.warn(errors);

  return (
    <VStack className="my-4">
      <Controller
        name="paymentValue"
        control={control}
        rules={{
          required: "Preencha com o valor recebido",
          validate: {
            isValid: (value) => {
              if (value === 0) return "Valor não pode ser zero";
              if (value > totalDebit) return "O valor não pode ser maior que a dívida";
            },
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            maxLength={15}
            onBlur={onBlur}
            keyboardType="number-pad"
            label="Valor do Pagamento"
            style={{ textAlign: "right" }}
            placeholder="Valor do Pagamento"
            isInvalid={errors.paymentValue?.message}
            value={convertToCurrency(Number(value) / 100)}
            onChangeText={(text) => onChange(text.replace(/\D/g, ""))}
          />
        )}
      />

      <TouchableOpacity onPress={handlePayAllDebit} className="items-center" activeOpacity={0.7}>
        <Text variant="H5" className="text-primary-400 underline">
          Valor Total da Dívida
        </Text>
      </TouchableOpacity>

      <HStack className="my-10 items-center justify-center rounded-xl bg-primary-500/20 p-2">
        <Info color="#7740FE" />
        <Text className="text-sm text-primary-500">Não deixe a amizade virar prejuízo.</Text>
      </HStack>

      <Button onPress={handleSubmit}>Salvar Pagamento</Button>
    </VStack>
  );
}
