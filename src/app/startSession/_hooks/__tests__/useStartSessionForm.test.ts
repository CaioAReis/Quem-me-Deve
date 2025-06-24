import { act, renderHook } from "@testing-library/react-native";
import { router } from "expo-router";

import { useStartSessionForm } from "../useStartSessionForm";

import { useSessionStore } from "@/store/session";

describe("useStartSessionForm", () => {
  beforeEach(() => {
    const mockFunction = jest.fn();

    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ setSession: mockFunction })
    );

    jest.clearAllMocks();
  });

  it("Checking initialize values", () => {
    const { result } = renderHook(() => useStartSessionForm());

    expect(result.current.watch("name")).toBe("");
    expect(typeof result.current.control).toBe("object");
    expect(typeof result.current.handleSubmit).toBe("function");
  });

  it("Checking redirect onSubmit", async () => {
    const spy = jest.spyOn(router, "push").mockImplementation(() => null);

    const { result } = renderHook(() => useStartSessionForm());

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(spy).toHaveBeenCalledWith("/(user)/home");
  });
});
