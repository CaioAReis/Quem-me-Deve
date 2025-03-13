import { useForm } from "react-hook-form";

import { generateAvatar } from "@/lib";

type UserData = {
  name: string;
  avatar: string;
};

export function useStartSessionForm() {
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({ defaultValues: { name: "", avatar: generateAvatar("") } });

  return { watch, control, setValue, handleSubmit, errors };
}
