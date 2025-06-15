import { render, fireEvent } from "@testing-library/react-native";

import { CurrencyVisibility } from "../currencyVisibility";

import { useSessionStore } from "@/store/session";

jest.mock("@/store/session", () => ({
  useSessionStore: jest.fn(),
}));

describe("CurrencyVisibility", () => {
  const mockChangeVisibility = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render the open eye when values are hidden", () => {
    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ hiddenValues: true, changeVisibilityValues: mockChangeVisibility })
    );

    const { getByTestId } = render(<CurrencyVisibility />);
    expect(getByTestId("eye-open")).toBeTruthy();
  });

  it("Should render the close eye when values are showing", () => {
    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ hiddenValues: false, changeVisibilityValues: mockChangeVisibility })
    );

    const { getByTestId } = render(<CurrencyVisibility />);
    expect(getByTestId("eye-closed")).toBeTruthy();
  });

  it("Checking if the changeVisibilityValues function was called", () => {
    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ hiddenValues: false, changeVisibilityValues: mockChangeVisibility })
    );

    const { getByTestId } = render(<CurrencyVisibility />);
    fireEvent.press(getByTestId("touchable-visibility"));

    expect(mockChangeVisibility).toHaveBeenCalled();
  });
});
