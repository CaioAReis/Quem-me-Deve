import { fireEvent, renderRouter, screen } from "expo-router/testing-library";

import Welcome from "../index";

import { Text } from "@/components/layout";
import { useSessionStore } from "@/store/session";

describe("Welcome", () => {
  it("Checking that screen was rendered", () => {
    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ session: null })
    );

    renderRouter({ index: Welcome }, { initialUrl: "/" });

    expect(screen).toHavePathname("/");
    expect(screen.getByTestId("image-welcome")).toBeTruthy();
    expect(screen.getByTestId("content-welcome")).toBeTruthy();
  });

  it("Checking the Redirect when has session", () => {
    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        session: {
          id: "user1",
          name: "User One",
          phone: "79999999999",
        },
      })
    );

    renderRouter(
      {
        index: Welcome,
        "(user)/home": () => <Text>Home</Text>,
      },
      { initialUrl: "/" }
    );

    expect(screen).toHavePathname("/home");
    expect(screen.getByText("Home")).toBeTruthy();
  });

  it("Checking that Continue Button is working", async () => {
    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ session: null })
    );

    renderRouter(
      {
        index: Welcome,
        startSession: () => <Text>StartSession</Text>,
      },
      { initialUrl: "/" }
    );

    expect(screen.getByTestId("image-welcome")).toBeTruthy();

    fireEvent.press(screen.getByTestId("continue-welcome"));

    expect(await screen.findByText("StartSession")).toBeTruthy();
    expect(screen).toHavePathname("/startSession");
  });
});
