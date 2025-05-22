import { router } from "expo-router";
import { useForm } from "react-hook-form";

import { User } from "@/@types";
import { generateAvatar } from "@/lib";
import { useSessionStore } from "@/store";

export function useStartSessionForm() {
  const setSession = useSessionStore((state) => state.setSession);

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ defaultValues: { name: "", avatar: generateAvatar("") } });

  const onSubmit = (data: User) => {
    const userData = {
      ...data,
      avatar: generateAvatar(data.name),
    } as User;

    setSession(userData);

    router.push("/(user)/home");
  };

  return { watch, control, setValue, handleSubmit: handleSubmit(onSubmit), errors };
}
