import { act, renderHook, waitFor } from "@testing-library/react-native";

import * as homeModule from "../useHome";
import { useHome } from "../useHome";

describe("useHome", () => {
  it("Checking if values are initialized when TAB is pending", () => {
    const {
      result: {
        current: { loanBalance, loanList, reload },
      },
    } = renderHook(() => useHome({ currentTab: "pending" }));

    expect(reload).toBeTruthy();
    expect(loanBalance).toBe(800);
    expect(loanList.length).toBe(2);
  });

  it("Checking if values are initialized when TAB is paid", () => {
    const {
      result: {
        current: { loanBalance, loanList, reload },
      },
    } = renderHook(() => useHome({ currentTab: "paid" }));

    expect(reload).toBeTruthy();
    expect(loanBalance).toBe(0);
    expect(loanList.length).toBe(0);
  });

  it("Checking that reload function is called", async () => {
    const reloadMock = jest.fn();

    jest.spyOn(homeModule, "useHome").mockReturnValue({
      loanBalance: 0,
      loanList: [],
      reload: reloadMock,
    });

    const {
      result: {
        current: { reload },
      },
    } = renderHook(() => useHome({ currentTab: "paid" }));

    act(() => {
      reload();
    });

    await waitFor(() => {
      expect(reload).toHaveBeenCalled();
    });
  });
});
