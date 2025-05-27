import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import { Loan } from "@/@types";
import { getLoanDetails } from "@/services";

export function useLoanDetail() {
  const { id } = useLocalSearchParams();
  const [loanDetails, setLoanDetails] = useState<Loan | null>(null);

  const handleGoBack = useCallback(() => router.back(), []);

  const { totalDebit, totalPayment } = (loanDetails?.history ?? []).reduce(
    (sum, item) => {
      if (item.type === "loan") {
        sum.totalDebit += item.value;
      } else if (item.type === "payment") {
        sum.totalPayment += item.value;
      }
      return sum;
    },
    { totalDebit: 0, totalPayment: 0 }
  );

  useEffect(() => {
    const result = getLoanDetails(id as string);

    if (result) {
      setLoanDetails(result);
    }
  }, []);

  return { handleGoBack, loanDetails, totalDebit, totalPayment };
}
