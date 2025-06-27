import { fireEvent, render } from "@testing-library/react-native";

import { NewLoanHeader } from "../NewLoanHeader";

describe("NewLoanHeader", () => {
  it("Checking that renders correctly", () => {
    const handleBack = jest.fn();
    const { getByText, getByTestId } = render(
      <NewLoanHeader title="Header Title" handleBack={handleBack} color="blue" />
    );

    expect(getByTestId("new-loan-header")).toBeTruthy();
    expect(getByText("Header Title")).toBeTruthy();
  });

  it("Checking that renders correctly with default props", () => {
    const handleBack = jest.fn();
    const { getByTestId } = render(<NewLoanHeader handleBack={handleBack} color="blue" />);

    expect(getByTestId("new-loan-header")).toBeTruthy();
  });

  it("Checking handleBack when back button is pressed", () => {
    const handleBack = jest.fn();
    const { getByTestId } = render(
      <NewLoanHeader title="Header Title" handleBack={handleBack} color="blue" />
    );

    fireEvent.press(getByTestId("arrow-back"));

    expect(handleBack).toHaveBeenCalled();
  });
});
