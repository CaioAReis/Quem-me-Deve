import { useForm } from "react-hook-form";

import { User } from "@/@types";

type Props = {
  onCloseModal: VoidFunction;
  user: Pick<User, "name" | "phone">;
};

export function useEditDebtForm({ user, onCloseModal }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<User, "name" | "phone">>({
    defaultValues: {
      name: user.name ?? "",
      phone: user.phone ?? "",
    },
  });

  const onSubmit = (data: Pick<User, "name" | "phone">) => {
    console.warn(data);

    onCloseModal();
  };

  return { handleSubmit: handleSubmit(onSubmit), errors, control };
}
