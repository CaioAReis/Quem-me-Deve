import { fireEvent, render } from "@testing-library/react-native";

import { TabButton } from "../TabButton";

describe("TabButton", () => {
  it("Checking that renders correctly", () => {
    const { getByText } = render(
      <TabButton selected icon="AArrowDown" label="Test Button" onPress={jest.fn()} />
    );

    expect(getByText("Test Button")).toBeTruthy();
  });

  it("Checking the selected style", () => {
    const { getByText } = render(
      <TabButton selected icon="AArrowDown" label="Test Button" onPress={jest.fn()} />
    );

    const button = getByText("Test Button");
    console.warn(button.props.className);

    expect(button.props.className).toContain("text-primary-400");
  });

  it("Checking the unselected style", () => {
    const { getByText } = render(
      <TabButton icon="AArrowDown" label="Test Button" onPress={jest.fn()} />
    );

    const button = getByText("Test Button");
    console.warn(button.props.className);

    expect(button.props.className).toContain("text-gray-500");
  });

  it("Checking onPress", () => {
    const onPressMock = jest.fn();

    const { getByTestId } = render(
      <TabButton label="Test Button" icon="AArrowDown" onPress={onPressMock} />
    );

    fireEvent.press(getByTestId("tab-button"));

    expect(onPressMock).toHaveBeenCalled();
  });
});
