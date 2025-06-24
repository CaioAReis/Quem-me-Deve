import { useFonts } from "expo-font";
import { renderRouter, screen } from "expo-router/testing-library";

import Layout from "../_layout";

import { useSessionStore } from "@/store/session";

describe("_layout", () => {
  it("Show SplashScreen when Zustand is not loaded", () => {
    (useFonts as jest.Mock).mockReturnValue([true]);

    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ hasHydrated: false })
    );

    renderRouter({ _layout: Layout });

    expect(screen.getByTestId("logo-loading")).toBeTruthy();
  });

  it("Return null when fonts were not loaded", () => {
    (useFonts as jest.Mock).mockReturnValue([false]);

    renderRouter({ _layout: Layout });

    expect(screen.queryByTestId("root")).toBeNull();
  });

  it("loaded", () => {
    (useFonts as jest.Mock).mockReturnValue([true]);

    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ hasHydrated: true })
    );

    renderRouter({ _layout: Layout });

    expect(screen.getByTestId("root")).toBeTruthy();
  });
});
