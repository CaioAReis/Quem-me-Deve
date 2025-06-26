import { renderRouter, screen } from "expo-router/testing-library";

import Home from "../index";

import { useSessionStore } from "@/store/session";

describe("home", () => {
  it("Checking that was screen rendered", () => {
    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        hiddenValues: false,
        session: { name: "User Name" },
      })
    );

    renderRouter({ index: Home });

    expect(screen).toHavePathname("/");
    expect(screen.getByText("Pagos")).toBeTruthy();
    expect(screen.getByText("Pendente")).toBeTruthy();
    expect(screen.getByText("User Name")).toBeTruthy();
    expect(screen.getByTestId("divider")).toBeTruthy();
    expect(screen.getByTestId("fab-button")).toBeTruthy();
    expect(screen.getByText("Empréstimos Realizados:")).toBeTruthy();
  });

  it("Checking if the items are rendered", () => {
    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        hiddenValues: false,
        session: { name: "User Name" },
      })
    );

    renderRouter({ index: Home });

    expect(screen.getAllByTestId("loan-card").length).toBe(2);
  });
});
