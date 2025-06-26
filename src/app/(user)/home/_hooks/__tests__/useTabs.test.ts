import { act, renderHook, waitFor } from "@testing-library/react-native";

import { useTabs } from "../useTabs";

describe("useTabs", () => {
  it("Checking if values ​​are initialized", () => {
    const { result } = renderHook(() => useTabs());

    expect(result.current.currentTab).toBe("pending");
    expect(result.current.handleChangeToPaid).toBeTruthy();
    expect(result.current.handleChangeToPending).toBeTruthy();
  });

  it("Checking handleChangeToPaid function", async () => {
    const { result } = renderHook(() => useTabs());

    expect(result.current.currentTab).toBe("pending");

    act(() => {
      result.current.handleChangeToPaid();
    });

    await waitFor(() => {
      expect(result.current.currentTab).toBe("paid");
    });
  });

  it("Checking handleChangeToPending function", async () => {
    const { result } = renderHook(() => useTabs());

    expect(result.current.currentTab).toBe("pending");

    act(() => {
      result.current.handleChangeToPaid();
      result.current.handleChangeToPending();
    });

    await waitFor(() => {
      expect(result.current.currentTab).toBe("pending");
    });
  });
});
