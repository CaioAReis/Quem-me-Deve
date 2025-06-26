import { renderHook } from "@testing-library/react-native";

import { useLoanCard } from "../useLoanCard";

describe("useLoanCard", () => {
  it("Checking that return correctly: 60", () => {
    const { result } = renderHook(() => useLoanCard({ debit: 6000, loanBalance: 100 }));

    expect(result.current.percent).toBe("60");
  });
});
