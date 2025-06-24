import { act, fireEvent, renderRouter, screen, waitFor } from "expo-router/testing-library";

import StartSession from "../index";

import { Text } from "@/components/layout";
import { useSessionStore } from "@/store/session";

describe("startSession", () => {
  it("Checking that screen rendered", () => {
    renderRouter({ index: StartSession });

    expect(screen).toHavePathname("/");
    expect(screen.getByText("Complete as informações")).toBeTruthy();
    expect(screen.getByTestId("input")).toBeTruthy();
  });

  it("When continue with Input empty", async () => {
    renderRouter({ index: StartSession });

    expect(screen.getByTestId("input")).toBeTruthy();

    act(() => {
      fireEvent.press(screen.getByText(/continue/i));
    });

    await waitFor(() => {
      expect(screen.getByText("Preencha com seu nome")).toBeTruthy();
    });
  });

  it("When continue with Input filled", async () => {
    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ setSession: jest.fn() })
    );

    renderRouter({
      index: StartSession,
      "(user)/home": () => <Text>Home</Text>,
    });

    act(() => {
      fireEvent.changeText(screen.getByTestId("input"), "User name");
      fireEvent.press(screen.getByText(/continue/i));
    });

    await waitFor(() => {
      expect(screen).toHavePathname("/home");
      expect(screen.getByText("Home")).toBeTruthy();
    });
  });
});
