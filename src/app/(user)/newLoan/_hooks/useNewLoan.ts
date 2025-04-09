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
    clearErrors,
    formState: { errors },
  } = useForm<Omit<Loan, "deadline"> & { deadline: string }>({
    defaultValues: { totalDebt: 0 },
  });

  const color = colorScheme === "dark" ? "#e9e9ea" : "#3e3e46";

  const handleBack = () => navigation.goBack();

  const onSubmit = (data: Omit<Loan, "deadline"> & { deadline: string }) => {
    alert("Submit");
    console.error(data);

    handleBack();
  };

  return { control, handleSubmit, clearErrors, errors, color, handleBack, onSubmit };
}
