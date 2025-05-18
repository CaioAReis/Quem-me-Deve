import { useForm } from "react-hook-form";

import { PaymentFormProps } from "@/@types";

export function usePaymentForm({ totalDebit, onCloseModal }: PaymentFormProps) {
  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { paymentValue: 0 } });

  const handlePayAllDebit = () => {
    setValue("paymentValue", totalDebit);

    clearErrors();
  };

  const onSubmit = (data: { paymentValue: number }) => {
    console.warn(data.paymentValue);

    onCloseModal();
  };

  return { handleSubmit: handleSubmit(onSubmit), handlePayAllDebit, errors, control };
}
