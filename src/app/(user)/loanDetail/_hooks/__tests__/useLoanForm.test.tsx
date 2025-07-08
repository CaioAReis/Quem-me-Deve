import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Controller } from "react-hook-form";
import { Button, TextInput } from "react-native";

import { useLoanForm } from "../useLoanForm";

import { createHistoryItem, updateLoanTotalDebit } from "@/services/services";

jest.mock("@/services/services", () => ({
  createHistoryItem: jest.fn(() => ({
    value: 2000,
    type: "loan",
    id: "history1",
    createdAt: new Date(),
  })),

  updateLoanTotalDebit: jest.fn(),
}));

function Wrapper({ loanId, onCloseModal, setLoanDetails }: any) {
  const { handleSubmit, control } = useLoanForm({
    loanId,
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
            testID="input-loan"
            value={String(value)}
            onChangeText={(text) => onChange(Number(text))}
          />
        )}
      />

      <Button title="Send" onPress={handleSubmit} testID="btn-submit" />
    </>
  );
}

describe("useLoanForm", () => {
  const loanId = "loan1";
  const onCloseModal = jest.fn();
  const setLoanDetails = jest.fn((callback) => callback({ totalDebit: 9000, history: [] }));

  it("Checking that renders correctly", () => {
    const { getByTestId } = render(<Wrapper />);

    expect(getByTestId("btn-submit")).toBeTruthy();
  });

  it("Checking when onSubmit is pressed", async () => {
    const { getByTestId } = render(
      <Wrapper loanId={loanId} onCloseModal={onCloseModal} setLoanDetails={setLoanDetails} />
    );

    fireEvent.changeText(getByTestId("input-loan"), "2000");
    fireEvent.press(getByTestId("btn-submit"));

    await waitFor(async () => {
      expect(createHistoryItem).toHaveBeenCalledWith({
        loanId: "loan1",
        type: "loan",
        value: 2000,
      });

      expect(updateLoanTotalDebit).toHaveBeenCalledWith({
        loanId: "loan1",
        newTotal: 11000,
      });

      expect(setLoanDetails).toHaveBeenCalled();
      expect(onCloseModal).toHaveBeenCalled();
    });
  });
});
