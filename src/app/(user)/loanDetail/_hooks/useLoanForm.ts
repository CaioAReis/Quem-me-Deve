import { Dispatch } from "react";
import { useForm } from "react-hook-form";

import { HistoryItem, Loan } from "@/@types";
import { createHistoryItem } from "@/services";

type Props = {
  loanId: string;
  onCloseModal: VoidFunction;
  setLoanDetails: Dispatch<React.SetStateAction<Loan | null>>;
};

export function useLoanForm({ onCloseModal, loanId, setLoanDetails }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<HistoryItem, "value">>({ defaultValues: { value: 0 } });

  const onSubmit = (data: Pick<HistoryItem, "value">) => {
    setLoanDetails((prev) => {
      if (!prev) return null;
      const newHistory = createHistoryItem({
        type: "loan",
        loanId: prev?.id,
        value: data?.value ?? 0,
      });

      return { ...prev, history: [...prev.history, newHistory] };
    });

    onCloseModal();
  };

  return { handleSubmit: handleSubmit(onSubmit), errors, control };
}
