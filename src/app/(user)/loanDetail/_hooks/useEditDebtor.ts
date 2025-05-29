import { useForm } from "react-hook-form";

import { User } from "@/@types";
import { updateUser } from "@/services";

type Props = {
  user: User;
  onCloseModal: VoidFunction;
  onUserUpdate: (user: Partial<User>) => void;
};

export function useEditDebtForm({ user, onUserUpdate, onCloseModal }: Props) {
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
    updateUser(user.id!, data);

    onUserUpdate(data);

    onCloseModal();
  };

  return { handleSubmit: handleSubmit(onSubmit), errors, control };
}
