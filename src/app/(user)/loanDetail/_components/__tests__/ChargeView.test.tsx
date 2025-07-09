import { act, fireEvent, render } from "@testing-library/react-native";
import { addDays } from "date-fns";
import * as Linking from "expo-linking";
import { useColorScheme } from "nativewind";

import { ChargeView } from "../ChargeView";

jest.mock("nativewind", () => ({
  useColorScheme: jest.fn(),
}));

jest.mock("expo-linking", () => {
  return {
    openURL: jest.fn(),
  };
});

describe("ChargeView", () => {
  const phone = "79999999999";
  const deadline = addDays(new Date(), 40);

  it("Checking that renders correctly", () => {
    (useColorScheme as jest.Mock).mockImplementation(() => ({ colorScheme: "light" }));

    const { getByText } = render(<ChargeView deadline={deadline} phone={phone} />);

    expect(getByText("Fazer Cobrança")).toBeTruthy();
  });

  it("Checking onPress Call button", () => {
    (useColorScheme as jest.Mock).mockImplementation(() => ({ colorScheme: "dark" }));

    const { getByTestId } = render(<ChargeView deadline={deadline} phone={phone} />);

    act(() => {
      fireEvent.press(getByTestId("call-btn"));
    });

    expect(Linking.openURL).toHaveBeenCalledWith(`tel:${phone}`);
  });

  it("Checking onPress Whatsapp button", () => {
    (useColorScheme as jest.Mock).mockImplementation(() => ({ colorScheme: "dark" }));

    const { getByTestId } = render(<ChargeView deadline={deadline} phone={phone} />);

    act(() => {
      fireEvent.press(getByTestId("whts-btn"));
    });

    expect(Linking.openURL).toHaveBeenCalled();
  });
});
