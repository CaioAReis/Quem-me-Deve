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
