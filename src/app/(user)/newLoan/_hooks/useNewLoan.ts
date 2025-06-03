import { parse } from "date-fns";
import { useNavigation } from "expo-router";
import { useColorScheme } from "nativewind";
import { useForm } from "react-hook-form";

import { Loan } from "@/@types";
import { createUserLoan } from "@/services";

export function useNewLoan() {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Loan, "deadline"> & { deadline: string }>({
    defaultValues: { totalDebit: 0 },
  });

  const color = colorScheme === "dark" ? "#e9e9ea" : "#3e3e46";

  const handleBack = () => navigation.goBack();

  const onSubmit = (data: Omit<Loan, "deadline"> & { deadline: string }) => {
    const body = {
      user: {
        name: data.user.name,
        phone: data.user.phone.replace(/\D/g, ""),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      totalDebit: Number(data.totalDebit),
      deadline: data.deadline ? parse(data.deadline, "dd/MM/yyyy", new Date()) : null,
      history: [{ createdAt: new Date(), value: Number(data.totalDebit), type: "loan" }],
    } as unknown as Loan;

    createUserLoan({
      name: body.user.name,
      phone: body.user.phone,
      value: body.history[0].value ?? 0,
      deadline: body.deadline!.toDateString(),
    });

    handleBack();
  };

  return { control, handleSubmit: handleSubmit(onSubmit), errors, color, handleBack };
}
