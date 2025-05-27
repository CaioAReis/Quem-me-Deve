import { HistoryItem, Loan, User } from "@/@types";
import { db } from "@/store/db";

export const getLoansWithUsersAndHistory = () => {
  const loans = db.getTable("loans");
  // const histories = db.getTable("history");

  const result = Object.entries(loans).map(([loanId, loan]) => {
    const userRow = db.getRow("users", String(loan.userId));
    // const loanHistory = Object.values(histories).filter((item) => item.loanId === loanId);

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
    id: userRow.id,
    name: userRow.name,
    phone: userRow.phone,
  } as User;

  return {
    user,
    id: loan.id,
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
    console.warn(`Usuário com ID ${userId} não encontrado.`);
    return;
  }

  db.setRow("users", userId, {
    ...currentUser,
    ...updates,
  });
};

export const createHistoryItem = ({
  loanId,
  value,
  type,
}: {
  loanId: string;
  value: string;
  type: "payment" | "loan";
}) => {
  const historyId = generateId("history"); // ou use seu próprio gerador de ID
  db.setRow("history", historyId, {
    loanId,
    value,
    type,
  });
};

export const updateLoanTotalDebit = (loanId: string, newTotal: number) => {
  const currentLoan = db.getRow("loans", loanId);
  if (!currentLoan) {
    console.warn(`Empréstimo com ID ${loanId} não encontrado.`);
    return;
  }

  db.setRow("loans", loanId, {
    ...currentLoan,
    totalDebit: newTotal,
    updatedAt: new Date().toISOString(), // Atualiza timestamp
  });
};

export const createUserLoan = (name: string, phone: string, value: string, deadline: string) => {
  const userId = generateId("user");
  const loanId = generateId("loan");
  const historyId = generateId("history");
  const now = new Date().toISOString();

  // Criar o usuário
  db.setRow("users", userId, {
    name,
    phone,
    avatar: "", // ou defina um avatar padrão
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
