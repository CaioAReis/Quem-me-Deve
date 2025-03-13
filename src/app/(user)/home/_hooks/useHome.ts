import { useEffect, useState } from "react";

export function useHome({ currentTab }: { currentTab: "pending" | "paid" }) {
  const [loanList, setLoanList] = useState([]);

  useEffect(() => {
    setLoanList([]);
  }, []);

  const loanBalance = 2312;

  return { loanList, loanBalance };
}
