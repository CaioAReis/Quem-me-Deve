import { HistoryItem, Loan } from "@/@types";
import { db } from "@/store/db";

export const getLoansWithUsersAndHistory = () => {
  const loans = db.getTable("loans");
  const histories = db.getTable("history");

  const result = Object.entries(loans).map(([loanId, loan]) => {
    const userRow = db.getRow("users", String(loan.userId));
    const loanHistory = Object.values(histories).filter((item) => item.loanId === loanId);

    const user = {
      id: userRow.id,
      name: userRow.name,
      phone: userRow.phone,
    };

    return {
      user,
      id: loanId,
      totalDebit: loan.totalDebit,
      deadline: new Date(String(loan.deadline ?? "")),
      history: loanHistory as unknown as HistoryItem[],
      updatedAt: new Date(String(loan.updatedAt ?? "")),
      createdAt: new Date(String(loan.createdAt ?? "")),
    } as Loan;
  });

  return result;
};
