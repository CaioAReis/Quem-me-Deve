import { fireEvent, render } from "@testing-library/react-native";

import { Button } from "../Button";

describe("Button", () => {
  it("Checking if rendering the correct text", () => {
    const { getByText } = render(<Button>SignIn</Button>);

    expect(getByText("SignIn")).toBeTruthy();
  });

  it("Checking when is loading", () => {
    const { getByTestId } = render(<Button loading>SignIn</Button>);

    expect(getByTestId("loading-button")).toBeTruthy();
  });

  it("Checking default variant", () => {
    const { getByTestId } = render(<Button>SignIn</Button>);

    const contain = getByTestId("contain-button");

    expect(contain.props.className).toContain("bg-transparent");
  });

  it("Checking outline variant", () => {
    const { getByTestId } = render(<Button variant="outline">SignIn</Button>);

    const contain = getByTestId("contain-button");

    expect(contain.props.className).toContain("bg-gray-50");
  });

  it("When onPress is clicked", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<Button onPress={onPressMock}>SignIn</Button>);

    fireEvent.press(getByTestId("touchable-button"));
    expect(onPressMock).toHaveBeenCalled();
  });

  it("When onPress is clicked but is disabled", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button onPress={onPressMock} disabled>
        SignIn
      </Button>
    );

    fireEvent.press(getByTestId("touchable-button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
