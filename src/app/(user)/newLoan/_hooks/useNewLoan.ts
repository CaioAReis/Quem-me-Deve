import { parse } from "date-fns";
import { useNavigation } from "expo-router";
import { useColorScheme } from "nativewind";
import { useForm } from "react-hook-form";

import { Loan } from "@/@types";

export function useNewLoan() {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Loan, "deadline"> & { deadline: string }>({
    defaultValues: { totalDebt: 0 },
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
      totalDebt: Number(data.totalDebt),
      deadline: data.deadline ? parse(data.deadline, "dd/MM/yyyy", new Date()) : null,
      history: [{ createdAt: new Date(), value: Number(data.totalDebt), type: "loan" }],
    } as unknown as Loan;

    console.warn(body);
    handleBack();
  };

  return { control, handleSubmit: handleSubmit(onSubmit), errors, color, handleBack };
}
