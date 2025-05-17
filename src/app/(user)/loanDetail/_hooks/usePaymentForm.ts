import { useForm } from "react-hook-form";

import { PaymentFormProps } from "@/@types";

export function usePaymentForm({ totalDebit, closeModal }: PaymentFormProps) {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { paymentValue: 0 } });

  const handlePayAllDebit = () => setValue("paymentValue", totalDebit);

  const onSubmit = (data: { paymentValue: number }) => {
    console.warn(data.paymentValue);

    closeModal();
  };

  return { handleSubmit: () => handleSubmit(onSubmit), handlePayAllDebit, errors, control };
}
