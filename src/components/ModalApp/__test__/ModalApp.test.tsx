import { act, fireEvent, render, waitFor } from "@testing-library/react-native";

import { ModalApp } from "../ModalApp";

import { Text } from "@/components/layout";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("ModalApp", () => {
  it("Checking if the trigger was rendered", () => {
    const { getByTestId } = render(
      <ModalApp icon="Info" title="Modal Title" isTest trigger={<Text testID="trigger">Open</Text>}>
        {() => <Text>Modal Content</Text>}
      </ModalApp>
    );

    expect(getByTestId("trigger")).toBeTruthy();
  });

  it("Checking if trigger work", async () => {
    const { getByText } = render(
      <ModalApp icon="Info" title="Modal Title" isTest trigger={<Text testID="trigger">Open</Text>}>
        {() => <Text>Modal Content</Text>}
      </ModalApp>
    );

    act(() => {
      fireEvent.press(getByText(/open/i));
    });

    await waitFor(() => {
      expect(getByText("Modal Title")).toBeTruthy();
      expect(getByText("Modal Content")).toBeTruthy();
    });
  });
});
