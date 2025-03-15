import { useEffect, useState } from "react";

import { Loan } from "@/@types";
import { loan1, loan2, loan3, loan4, loan5 } from "@/data/loans";

export function useHome({ currentTab }: { currentTab: "pending" | "paid" }) {
  const [loanList, setLoanList] = useState<Loan[]>([]);

  const loans = [loan1, loan2, loan3, loan4, loan5] as Loan[];

  useEffect(() => {
    let result;
    if (currentTab === "pending") result = loans.filter((loan) => loan.totalDebt > 0);
    else result = loans.filter((loan) => loan.totalDebt === 0);

    setLoanList(result);
  }, [currentTab]);

  const loanBalance =
    loans.reduce((total, current) => {
      total += current.totalDebt;

      return total;
    }, 0) / 100;

  return { loanList, loanBalance };
}
