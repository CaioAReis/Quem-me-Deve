import { isFuture, parse } from "date-fns";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";

import { Loan } from "@/@types";
import { Input } from "@/components";
import { VStack } from "@/components/layout";
import { convertToCurrency, dateMask, phoneMask } from "@/utils/functions";
import { RegExValidate } from "@/utils/regex";

type Props<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
};

export function LoanForm({
  errors,
  control,
}: Props<Omit<Loan, "deadline"> & { deadline: string }>) {
  return (
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
        name="totalDebit"
        control={control}
        rules={{
          required: "Preencha com o valor do Empréstimo",
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
            isInvalid={errors.totalDebit?.message}
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
          validate: {
            afterToday: (value) => {
              if (value) {
                const result = isFuture(parse(value, "dd/MM/yyyy", new Date()));

                if (!result) return "Data deve ser maior que a atual";
              }
            },
          },
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
  );
}
