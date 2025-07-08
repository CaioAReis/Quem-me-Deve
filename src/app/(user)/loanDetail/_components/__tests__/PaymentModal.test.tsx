import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { act } from "react";

import { PaymentModal } from "../PaymentModal";

describe("PaymentModal", () => {
  const totalDebit = 9000;
  const onCloseModal = jest.fn();
  const setLoanDetails = jest.fn();

  it("Checking that renders correctly", () => {
    const { getByText } = render(
      <PaymentModal
        loanId="loan1"
        totalDebit={totalDebit}
        onCloseModal={onCloseModal}
        setLoanDetails={setLoanDetails}
      />
    );

    expect(getByText("Valor do Pagamento")).toBeTruthy();
    expect(getByText("Valor Total da Dívida")).toBeTruthy();
    expect(getByText("Não deixe a amizade virar prejuízo.")).toBeTruthy();
  });

  it("Checking that show errors", async () => {
    const { getByText, getByTestId } = render(
      <PaymentModal
        loanId="loan1"
        totalDebit={totalDebit}
        onCloseModal={onCloseModal}
        setLoanDetails={setLoanDetails}
      />
    );

    act(() => {
      fireEvent.press(getByTestId("add-payment"));
    });

    await waitFor(() => {
      expect(getByText("Valor não pode ser zero")).toBeTruthy();
    });
  });

  describe("Checking when type a value", () => {
    it("When value is zero", async () => {
      const { getByText, getByTestId } = render(
        <PaymentModal
          loanId="loan1"
          totalDebit={totalDebit}
          onCloseModal={onCloseModal}
          setLoanDetails={setLoanDetails}
        />
      );

      fireEvent.changeText(getByTestId("input-payment"), "00");

      await act(async () => {
        fireEvent.press(getByTestId("add-payment"));
      });

      await waitFor(() => {
        expect(getByText("Valor não pode ser zero")).toBeTruthy();
      });
    });

    it("When value is invalid", async () => {
      const { getByText, getByTestId } = render(
        <PaymentModal
          loanId="loan1"
          totalDebit={totalDebit}
          onCloseModal={onCloseModal}
          setLoanDetails={setLoanDetails}
        />
      );

      fireEvent.changeText(getByTestId("input-payment"), "xxx");

      await act(async () => {
        fireEvent.press(getByTestId("add-payment"));
      });

      await waitFor(() => {
        expect(getByText("Preencha com o valor recebido")).toBeTruthy();
      });
    });

    it("When value is valid", async () => {
      const { getByTestId } = render(
        <PaymentModal
          loanId="loan1"
          totalDebit={totalDebit}
          onCloseModal={onCloseModal}
          setLoanDetails={setLoanDetails}
        />
      );

      fireEvent.changeText(getByTestId("input-payment"), "9000");

      await act(async () => {
        fireEvent.press(getByTestId("add-payment"));
      });

      await waitFor(() => {
        expect(onCloseModal).toHaveBeenCalled();
        expect(setLoanDetails).toHaveBeenCalled();
      });
    });

    it("When value is greater than debit", async () => {
      const { getByTestId, getByText } = render(
        <PaymentModal
          loanId="loan1"
          totalDebit={totalDebit}
          onCloseModal={onCloseModal}
          setLoanDetails={setLoanDetails}
        />
      );

      fireEvent.changeText(getByTestId("input-payment"), "10000");

      await act(async () => {
        fireEvent.press(getByTestId("add-payment"));
      });

      await waitFor(() => {
        expect(getByText("O valor não pode ser maior que a dívida")).toBeTruthy();
      });
    });

    it("When value is equal all debit", async () => {
      const { getByTestId } = render(
        <PaymentModal
          loanId="loan1"
          totalDebit={totalDebit}
          onCloseModal={onCloseModal}
          setLoanDetails={setLoanDetails}
        />
      );

      await act(async () => {
        fireEvent.press(getByTestId("all-debit"));
      });

      await act(async () => {
        fireEvent.press(getByTestId("add-payment"));
      });

      await waitFor(() => {
        expect(onCloseModal).toHaveBeenCalled();
        expect(setLoanDetails).toHaveBeenCalled();
      });
    });
  });
});
