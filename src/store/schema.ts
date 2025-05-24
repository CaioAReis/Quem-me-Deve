export type UserScheme = {
  name: string;
  phone: string;
  avatar?: string;
};

export type HistoryItemScheme = {
  value: number;
  createdAt: string;
  type: "payment" | "loan";
};

export type LoanScheme = {
  userId: string;
  totalDebit: number;
  createdAt: string;
  updatedAt: string;
  deadline?: string;
};

export const schema = {
  users: {
    name: { type: "string" },
    phone: { type: "string" },
    avatar: { type: "string" },
  },

  loans: {
    userId: { type: "string" },
    totalDebit: { type: "number" },
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
    deadline: { type: "string" },
  },

  history: {
    loanId: { type: "string" },
    value: { type: "number" },
    type: { type: "string" },
    createdAt: { type: "string" },
  },
};
