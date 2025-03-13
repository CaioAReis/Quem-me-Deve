import { useCallback, useState } from "react";

export function useTabs() {
  const [currentTab, setCurrentTab] = useState<"pending" | "paid">("pending");

  const handleChangeToPaid = useCallback(() => setCurrentTab("paid"), []);
  const handleChangeToPending = useCallback(() => setCurrentTab("pending"), []);

  return { currentTab, handleChangeToPaid, handleChangeToPending };
}
