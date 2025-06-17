import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import { Loan, User } from "@/@types";
import { getLoanDetails } from "@/services/services";

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

  const onUserUpdate = (user: Partial<User>) => {
    setLoanDetails((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        user: { ...prev.user, ...user },
      };
    });
  };

  useEffect(() => {
    const result = getLoanDetails(id as string);

    if (result) {
      setLoanDetails(result);
    }
  }, []);

  return { handleGoBack, loanDetails, onUserUpdate, setLoanDetails, totalDebit, totalPayment };
}
