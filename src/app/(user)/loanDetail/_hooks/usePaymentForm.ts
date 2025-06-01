import { useForm } from "react-hook-form";

import { NewItemProps } from "@/@types";
import { createHistoryItem, updateLoanTotalDebit } from "@/services";

export function usePaymentForm({ totalDebit, loanId, setLoanDetails, onCloseModal }: NewItemProps) {
  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { value: 0 } });

  const handlePayAllDebit = () => {
    setValue("value", totalDebit ?? 0);

    clearErrors();
  };

  const onSubmit = (data: { value: number }) => {
    setLoanDetails((prev) => {
      if (!prev) return null;

      const newHistory = createHistoryItem({
        loanId: loanId ?? "",
        type: "payment",
        value: data?.value ?? 0,
      });

      const totalDebit = Number(prev.totalDebit) - Number(data.value);

      updateLoanTotalDebit({ loanId: loanId ?? "", newTotal: totalDebit });

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
