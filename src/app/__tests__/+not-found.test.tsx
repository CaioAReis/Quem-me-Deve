import { fireEvent, renderRouter, screen } from "expo-router/testing-library";

import NotFoundScreen from "../+not-found";

import { Text } from "@/components/layout";

describe("NotFoundScreen", () => {
  it("Checking that screen was rendered", () => {
    renderRouter({ "404": NotFoundScreen }, { initialUrl: "/404" });

    expect(screen.getByText("Oops!")).toBeTruthy();
    expect(screen.getByText("Página não encontrada!")).toBeTruthy();
  });

  it("Checking when goBack Button is pressed", async () => {
    renderRouter(
      {
        "404": NotFoundScreen,
        index: () => <Text>Home</Text>,
      },
      { initialUrl: "/404" }
    );

    expect(screen.getByText("Oops!")).toBeTruthy();
    expect(screen.getByText("Página não encontrada!")).toBeTruthy();

    fireEvent.press(screen.getByTestId("goback-notfound"));

    expect(await screen.findByText("Home")).toBeTruthy();
    expect(screen).toHavePathname("/");
  });
});
