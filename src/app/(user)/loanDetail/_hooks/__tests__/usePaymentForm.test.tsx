import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Controller } from "react-hook-form";
import { Button, TextInput } from "react-native";

import { usePaymentForm } from "../usePaymentForm";

import { createHistoryItem, updateLoanTotalDebit } from "@/services/services";

jest.mock("@/services/services", () => ({
  createHistoryItem: jest.fn(() => ({
    value: 2000,
    id: "history1",
    type: "payment",
    createdAt: new Date(),
  })),

  updateLoanTotalDebit: jest.fn(),
}));

function Wrapper({ loanId, totalDebit, onCloseModal, setLoanDetails }: any) {
  const { handleSubmit, handlePayAllDebit, control } = usePaymentForm({
    loanId,
    totalDebit,
    onCloseModal,
    setLoanDetails,
  });

  return (
    <>
      <Controller
        name="value"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            testID="input-payment"
            value={String(value)}
            onChangeText={(text) => onChange(Number(text))}
          />
        )}
      />

      <Button title="Pay All" onPress={handlePayAllDebit} testID="btn-pay-all" />
      <Button title="Send" onPress={handleSubmit} testID="btn-submit" />
    </>
  );
}

describe("usePaymentForm", () => {
  const loanId = "loan1";
  const totalDebit = 9000;
  const onCloseModal = jest.fn();
  const setLoanDetails = jest.fn((callback) => callback({ totalDebit, history: [] }));

  it("Checking that renders correctly", () => {
    const { getByText } = render(<Wrapper />);

    expect(getByText("Send")).toBeTruthy();
  });

  it("Checking when pay all is pressed", async () => {
    const { getByTestId } = render(
      <Wrapper
        loanId={loanId}
        totalDebit={totalDebit}
        onCloseModal={onCloseModal}
        setLoanDetails={setLoanDetails}
      />
    );

    fireEvent.press(getByTestId("btn-pay-all"));

    const input = getByTestId("input-payment");
    expect(input.props.value).toBe("9000");
  });

  it("Checking when onSubmit is pressed", async () => {
    const { getByTestId } = render(
      <Wrapper
        loanId={loanId}
        totalDebit={totalDebit}
        onCloseModal={onCloseModal}
        setLoanDetails={setLoanDetails}
      />
    );

    fireEvent.changeText(getByTestId("input-payment"), "2000");
    fireEvent.press(getByTestId("btn-submit"));

    await waitFor(async () => {
      expect(createHistoryItem).toHaveBeenCalledWith({
        loanId: "loan1",
        type: "payment",
        value: 2000,
      });

      expect(updateLoanTotalDebit).toHaveBeenCalledWith({
        loanId: "loan1",
        newTotal: 7000,
      });

      expect(setLoanDetails).toHaveBeenCalled();
      expect(onCloseModal).toHaveBeenCalled();
    });
  });
});
