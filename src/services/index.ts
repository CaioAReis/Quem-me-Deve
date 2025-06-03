import { HistoryItem, Loan, User } from "@/@types";
import { db } from "@/store/db";

export const getLoansWithUsersAndHistory = () => {
  const loans = db.getTable("loans");

  const result = Object.entries(loans).map(([loanId, loan]) => {
    const userRow = db.getRow("users", String(loan.userId));

    const user = {
      id: userRow.id,
      name: userRow.name,
      phone: userRow.phone,
    };

    return {
      user,
      id: loanId,
      history: [],
      totalDebit: loan.totalDebit,
      deadline: new Date(String(loan.deadline ?? "")),
      updatedAt: new Date(String(loan.updatedAt ?? "")),
      createdAt: new Date(String(loan.createdAt ?? "")),
    } as Loan;
  });

  return result;
};

export const getLoanDetails = (loanId: string) => {
  const loan = db.getRow("loans", loanId);

  if (!loan) {
    console.warn(`Empréstimo com ID ${loanId} não encontrado.`);
    return null;
  }

  const allHistory = db.getTable("history");
  const userRow = db.getRow("users", String(loan.userId));

  const history = Object.entries(allHistory)
    .filter(([_, item]) => item.loanId === loanId)
    .map(([id, item]) => ({
      id,
      type: item.type,
      value: Number(item.value),
      createdAt: new Date(String(item.createdAt)),
    }));

  const user = {
    name: userRow.name,
    phone: userRow.phone,
    id: String(loan.userId),
  } as User;

  return {
    user,
    id: loanId,
    totalDebit: Number(loan.totalDebit),
    history: history as unknown as HistoryItem[],
    deadline: new Date(String(loan.deadline ?? "")),
    createdAt: new Date(String(loan.createdAt ?? "")),
    updatedAt: new Date(String(loan.updatedAt ?? "")),
  } as Loan;
};

export const updateUser = (userId: string, updates: Partial<User>) => {
  const currentUser = db.getRow("users", userId);

  if (!currentUser) {
    console.warn(`User not found: ${userId}.`);
    return;
  }

  db.setRow("users", userId, {
    ...currentUser,
    ...updates,
  });
};

type CreateHistoryItemProps = {
  value: number;
  loanId: string;
  type: "payment" | "loan";
};

export const createHistoryItem = ({ loanId, value, type }: CreateHistoryItemProps) => {
  const historyId = generateId("history");
  const createdAt = new Date();

  db.setRow("history", historyId, {
    type,
    loanId,
    value: Number(value),
    createdAt: createdAt.toISOString(),
  });

  return {
    type,
    createdAt,
    id: historyId,
    value: Number(value),
  } as HistoryItem;
};

type UpdateLoanTotalDebitProps = { loanId: string; newTotal: number };

export const updateLoanTotalDebit = ({ loanId, newTotal }: UpdateLoanTotalDebitProps) => {
  const currentLoan = db.getRow("loans", loanId);

  if (!currentLoan) {
    console.warn(`Empréstimo com ID ${loanId} não encontrado.`);
    return;
  }

  const loanUpdated = {
    totalDebit: newTotal,
    userId: currentLoan.userId,
    createdAt: currentLoan.createdAt,
    updatedAt: new Date().toISOString(),
    deadline: currentLoan.deadline ?? "",
  };

  db.setRow("loans", loanId, loanUpdated);

  return loanUpdated;
};

type CreateUserLoanProps = {
  name: string;
  phone: string;
  value: number;
  deadline: string;
};

export const createUserLoan = ({ name, phone, value, deadline }: CreateUserLoanProps) => {
  const userId = generateId("user");
  const loanId = generateId("loan");
  const historyId = generateId("history");

  const now = new Date().toISOString();

  db.setRow("users", userId, {
    name,
    phone,
    avatar: "",
  });

  // Criar o empréstimo
  db.setRow("loans", loanId, {
    userId,
    totalDebit: value,
    createdAt: now,
    updatedAt: now,
    deadline,
  });

  // Criar o history inicial
  db.setRow("history", historyId, {
    loanId,
    value,
    type: "loan",
    createdAt: now,
  });

  return { userId, loanId, historyId };
};

export const generateId = (tag: "user" | "loan" | "history") => {
  return `${tag}-${Date.now()}`;
};
