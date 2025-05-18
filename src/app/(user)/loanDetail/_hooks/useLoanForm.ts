import { useForm } from "react-hook-form";

import { HistoryItem } from "@/@types";

export function useLoanForm({ onCloseModal }: { onCloseModal: VoidFunction }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HistoryItem>({ defaultValues: { value: 0 } });

  const onSubmit = (data: HistoryItem) => {
    console.warn(data.value);

    onCloseModal();
  };

  return { handleSubmit: handleSubmit(onSubmit), errors, control };
}
