import { Dispatch } from "react";
import { useForm } from "react-hook-form";

import { HistoryItem, Loan } from "@/@types";
import { createHistoryItem, updateLoanTotalDebit } from "@/services/services";

type Props = {
  loanId: string;
  onCloseModal: VoidFunction;
  setLoanDetails: Dispatch<React.SetStateAction<Loan>>;
};

export function useLoanForm({ onCloseModal, loanId, setLoanDetails }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<HistoryItem, "value">>({ defaultValues: { value: 0 } });

  const onSubmit = (data: Pick<HistoryItem, "value">) => {
    setLoanDetails((prev) => {
      const newHistory = createHistoryItem({
        loanId,
        type: "loan",
        value: data?.value,
      });

      const totalDebit = Number(prev.totalDebit) + Number(data.value);

      updateLoanTotalDebit({ loanId, newTotal: totalDebit });

      return {
        ...prev,
        totalDebit,
        history: newHistory ? [...prev.history, newHistory] : [...prev.history],
      };
    });

    onCloseModal();
  };

  return { handleSubmit: handleSubmit(onSubmit), errors, control };
}
