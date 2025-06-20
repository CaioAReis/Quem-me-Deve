import { act, renderHook } from "@testing-library/react-native";
import * as expoRouter from "expo-router";

import { useStartSessionForm } from "../_hooks/useStartSessionForm";

import { useSessionStore } from "@/store/session";

describe("useStartSessionForm", () => {
  const setSession = jest.fn();

  beforeEach(() => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue(setSession);
    jest.clearAllMocks();
  });

  it("Checking initialize values", () => {
    const { result } = renderHook(() => useStartSessionForm());

    expect(result.current.watch("name")).toBe("");
    expect(typeof result.current.control).toBe("object");
    expect(typeof result.current.handleSubmit).toBe("function");
  });

  it("Checking redirect onSubmit", async () => {
    const { result } = renderHook(() => useStartSessionForm());

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(expoRouter.router.push).toHaveBeenCalledWith("/(user)/home");
  });
});
