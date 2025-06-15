import { fireEvent, render } from "@testing-library/react-native";

import { Theme } from "../theme";

jest.mock("nativewind", () => ({
  useColorScheme: jest.fn(),
  colorScheme: { get: jest.fn() },
}));

describe("Theme", () => {
  const mockToggleColorScheme = jest.fn();
  const { colorScheme, useColorScheme } = jest.requireMock("nativewind");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Checking that sun icon was rendered when theme is dark", () => {
    colorScheme.get.mockReturnValue("dark");
    useColorScheme.mockReturnValue({ toggleColorScheme: mockToggleColorScheme });

    const { getByTestId } = render(<Theme />);

    expect(getByTestId("sun-icon")).toBeTruthy();
  });

  it("Checking that moon icon was rendered when theme is light", () => {
    colorScheme.get.mockReturnValue("light");
    useColorScheme.mockReturnValue({ toggleColorScheme: mockToggleColorScheme });

    const { getByTestId } = render(<Theme />);

    expect(getByTestId("moon-icon")).toBeTruthy();
  });

  it("Checking that toggleColorScheme function is called", () => {
    colorScheme.get.mockReturnValue("light");
    useColorScheme.mockReturnValue({ toggleColorScheme: mockToggleColorScheme });

    const { getByTestId } = render(<Theme />);

    fireEvent.press(getByTestId("touchable-theme"));

    expect(mockToggleColorScheme).toHaveBeenCalled();
  });
});
