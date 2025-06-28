import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { format, subDays, addDays } from "date-fns";
import { useForm } from "react-hook-form";
import { Button } from "react-native";

import { LoanForm } from "../LoanForm";

import { Loan } from "@/@types";

describe("LoanForm", () => {
  function Wrapper({
    defaultValues,
  }: { defaultValues?: Partial<Omit<Loan, "deadline"> & { deadline: string }> } = {}) {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<Omit<Loan, "deadline"> & { deadline: string }>({
      defaultValues,
    });

    const onSubmit = jest.fn();

    return (
      <>
        <LoanForm errors={errors} control={control} />
        <Button title="Send" onPress={handleSubmit(onSubmit)} />
      </>
    );
  }

  it("Checking that renders correctly", () => {
    const { getByText } = render(<Wrapper />);

    expect(getByText("Nome do Devedor")).toBeTruthy();
    expect(getByText("Telefone do Devedor")).toBeTruthy();
    expect(getByText("Valor do Empréstimo")).toBeTruthy();
    expect(getByText("Vencimento")).toBeTruthy();
  });

  it("Checking when inputs are empty", async () => {
    const { getByText } = render(<Wrapper />);

    act(() => {
      fireEvent.press(getByText("Send"));
    });

    await waitFor(() => {
      expect(getByText("Preencha com o nome da pessoa")).toBeTruthy();
      expect(getByText("Preencha com o Telefone da pessoa")).toBeTruthy();
      expect(getByText("Preencha com o valor do Empréstimo")).toBeTruthy();
    });
  });

  describe("totalDebit", () => {
    it("When totalDebit is zero", async () => {
      const { getByText } = render(<Wrapper defaultValues={{ totalDebit: 0 }} />);

      act(() => {
        fireEvent.press(getByText("Send"));
      });

      await waitFor(() => {
        expect(getByText("Valor não pode ser zero")).toBeTruthy();
      });
    });

    it("When typing string", async () => {
      const { getByText } = render(<Wrapper />);

      act(() => {
        fireEvent.changeText(getByText("Valor do Empréstimo"), "abc");
        fireEvent.press(getByText("Send"));
      });

      await waitFor(() => {
        expect(getByText("Preencha com o valor do Empréstimo")).toBeTruthy();
      });
    });

    it("When typing a value", async () => {
      const { getByTestId } = render(<Wrapper defaultValues={{ totalDebit: 4000 }} />);

      const input = getByTestId("loan-form-total-debit");

      await waitFor(() => {
        expect(input.props.value).toMatch(/40,00/);
      });
    });
  });

  describe("deadline", () => {
    it("When typing an invalid date", async () => {
      const { getByText, getByTestId } = render(
        <Wrapper defaultValues={{ deadline: "31/02/2028" }} />
      );

      act(() => {
        fireEvent.changeText(getByTestId("loan-form-deadline"), "31/02/2028");
        fireEvent.press(getByText("Send"));
      });

      await waitFor(() => {
        expect(getByText("Data inválida")).toBeTruthy();
      });
    });

    it("When typing a before date", async () => {
      const { getByText, getByTestId } = render(<Wrapper />);

      const date = subDays(new Date(), 2);
      const formattedDate = format(date, "dd/MM/yyyy");

      act(() => {
        fireEvent.changeText(getByTestId("loan-form-deadline"), formattedDate);
        fireEvent.press(getByText("Send"));
      });

      await waitFor(() => {
        expect(getByText("Data deve ser maior que a atual")).toBeTruthy();
      });
    });

    it("When typing a valid date", async () => {
      const { getByText, getByTestId } = render(<Wrapper />);

      const date = addDays(new Date(), 2);
      const formattedDate = format(date, "dd/MM/yyyy");

      const input = getByTestId("loan-form-deadline");

      act(() => {
        fireEvent.changeText(getByTestId("loan-form-deadline"), formattedDate);
        fireEvent.press(getByText("Send"));
      });

      await waitFor(() => {
        expect(input.props.value).toMatch(formattedDate);
      });
    });
  });
});
