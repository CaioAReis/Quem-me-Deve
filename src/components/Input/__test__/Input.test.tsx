import { fireEvent, render } from "@testing-library/react-native";

import { Input } from "../Input";

describe("Input", () => {
  it("Checking if label is correct", () => {
    const { getByText } = render(<Input label="User Name" />);

    expect(getByText(/user name/i)).toBeTruthy();
  });

  it("Checking if is disabled", () => {
    const { getByDisplayValue } = render(<Input value="test@example.com" isDisabled />);
    const input = getByDisplayValue("test@example.com");

    expect(input.props.editable).toBe(false);
  });

  it("Checking if onChange is working", () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<Input onChangeText={onChangeMock} />);

    const input = getByTestId("input-field");
    fireEvent.changeText(input, "example");
    expect(onChangeMock).toHaveBeenCalledWith("example");
  });

  describe("When isInvalid was passed", () => {
    it("Checking if the error message is being displayed", () => {
      const { getByTestId } = render(<Input label="User Name" isInvalid="Invalid name" />);

      expect(getByTestId("invalid-input")).toBeTruthy();
    });

    it("Checking if the error message is correct", () => {
      const { getByText } = render(<Input label="User Name" isInvalid="Invalid name" />);

      expect(getByText(/invalid name/i));
    });
  });
});
