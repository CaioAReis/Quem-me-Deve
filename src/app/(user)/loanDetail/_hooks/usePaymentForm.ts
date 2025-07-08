import { useForm } from "react-hook-form";

import { NewItemProps } from "@/@types";
import { createHistoryItem, updateLoanTotalDebit } from "@/services/services";

export function usePaymentForm({ totalDebit, loanId, setLoanDetails, onCloseModal }: NewItemProps) {
  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { value: 0 } });

  const handlePayAllDebit = () => {
    setValue("value", totalDebit!);

    clearErrors();
  };

  const onSubmit = (data: { value: number }) => {
    setLoanDetails((prev) => {
      const newHistory = createHistoryItem({
        loanId: loanId!,
        type: "payment",
        value: data?.value,
      });

      const totalDebit = Number(prev.totalDebit) - Number(data.value);

      updateLoanTotalDebit({ loanId: loanId!, newTotal: totalDebit });

      return {
        ...prev,
        totalDebit,
        history: newHistory ? [...prev.history, newHistory] : [...prev.history],
      };
    });

    onCloseModal();
  };

  return { handleSubmit: handleSubmit(onSubmit), handlePayAllDebit, errors, control };
}
