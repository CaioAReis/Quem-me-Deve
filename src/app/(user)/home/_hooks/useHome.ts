import { useEffect, useState } from "react";

import { Loan } from "@/@types";
import { getLoansWithUsersAndHistory } from "@/services/services";

export function useHome({ currentTab }: { currentTab: "pending" | "paid" }) {
  const [loanList, setLoanList] = useState<Loan[]>([]);

  const fetchData = () => {
    let result = getLoansWithUsersAndHistory();

    if (currentTab === "pending") result = result.filter((loan) => loan.totalDebit > 0);
    else result = result.filter((loan) => loan.totalDebit === 0);

    setLoanList(result as Loan[]);
  };

  useEffect(() => {
    fetchData();
  }, [currentTab]);

  const loanBalance =
    loanList.reduce((total, current) => {
      total += current.totalDebit;

      return total;
    }, 0) / 100;

  return { loanList, loanBalance, reload: fetchData };
}
