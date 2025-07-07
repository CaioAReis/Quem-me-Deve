import { act, fireEvent, render, waitFor } from "@testing-library/react-native";

import { LoanModal } from "../LoanModal";

describe("LoanModal", () => {
  const onCloseModal = jest.fn();
  const setLoanDetails = jest.fn();

  it("Checking that renders correctly", () => {
    const { getByText } = render(
      <LoanModal loanId="loan1" setLoanDetails={setLoanDetails} onCloseModal={onCloseModal} />
    );

    expect(getByText("Salvar Empréstimo")).toBeTruthy();
    expect(getByText("Valor do Empréstimo")).toBeTruthy();
  });

  it("Checking that show errors", async () => {
    const { getByTestId, getByText } = render(
      <LoanModal loanId="loan1" setLoanDetails={setLoanDetails} onCloseModal={onCloseModal} />
    );

    act(() => {
      fireEvent.press(getByTestId("add-loan"));
    });

    await waitFor(() => {
      expect(getByText("Valor não pode ser zero")).toBeTruthy();
    });
  });

  describe("Checking when type a value", () => {
    it("When value is zero", async () => {
      const { getByTestId, getByText } = render(
        <LoanModal loanId="loan1" setLoanDetails={setLoanDetails} onCloseModal={onCloseModal} />
      );

      fireEvent.changeText(getByTestId("input-loan"), "00");

      await act(async () => {
        fireEvent.press(getByTestId("add-loan"));
      });

      await waitFor(() => {
        expect(getByText("Valor não pode ser zero")).toBeTruthy();
      });
    });

    it("When value is invalid", async () => {
      const { getByTestId, getByText } = render(
        <LoanModal loanId="loan1" setLoanDetails={setLoanDetails} onCloseModal={onCloseModal} />
      );

      fireEvent.changeText(getByTestId("input-loan"), "xxx");

      await act(async () => {
        fireEvent.press(getByTestId("add-loan"));
      });

      await waitFor(() => {
        expect(getByText("Preencha com o valor emprestado")).toBeTruthy();
      });
    });

    it("When value is valid", async () => {
      const { getByTestId } = render(
        <LoanModal loanId="loan1" setLoanDetails={setLoanDetails} onCloseModal={onCloseModal} />
      );

      fireEvent.changeText(getByTestId("input-loan"), "9000");

      await act(async () => {
        fireEvent.press(getByTestId("add-loan"));
      });

      await waitFor(() => {
        expect(onCloseModal).toHaveBeenCalled();
        expect(setLoanDetails).toHaveBeenCalled();
      });
    });
  });
});
