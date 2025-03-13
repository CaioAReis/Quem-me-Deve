import { user1, user2, user3, user4, user5 } from "./users";

import { Loan } from "@/@types";

const loan1 = {
  user: user1,
  totalDebt: 30000,
  history: [{ value: 30000, createdAt: new Date(), type: "loan" }],
  deadline: new Date("2025-04-01"),
  createdAt: new Date(),
  updatedAt: new Date(),
} as Loan;

const loan2 = {
  user: user2,
  totalDebt: 50000,
  history: [
    { value: 25000, createdAt: new Date(), type: "loan" },
    { value: 25000, createdAt: new Date(), type: "loan" },
  ],
  deadline: new Date("2025-04-01"),
  createdAt: new Date(),
  updatedAt: new Date(),
} as Loan;

const loan3 = {
  user: user3,
  totalDebt: 10000,
  history: [
    { value: 10000, createdAt: new Date(), type: "loan" },
    { value: 20000, createdAt: new Date(), type: "payment" },
    { value: 10000, createdAt: new Date(), type: "loan" },
    { value: 10000, createdAt: new Date(), type: "loan" },
  ],
  deadline: new Date("2025-04-01"),
  createdAt: new Date(),
  updatedAt: new Date(),
} as Loan;

const loan4 = {
  user: user4,
  totalDebt: 2000,
  history: [
    { value: 8000, createdAt: new Date(), type: "payment" },
    { value: 10000, createdAt: new Date(), type: "loan" },
  ],
  deadline: new Date("2025-04-01"),
  createdAt: new Date(),
  updatedAt: new Date(),
} as Loan;

const loan5 = {
  user: user5,
  totalDebt: 30000,
  history: [
    { value: 30000, createdAt: new Date(), type: "payment" },
    { value: 20000, createdAt: new Date(), type: "payment" },
    { value: 10000, createdAt: new Date(), type: "payment" },
    { value: 50000, createdAt: new Date(), type: "loan" },
  ],
  deadline: new Date("2025-04-01"),
  createdAt: new Date(),
  updatedAt: new Date(),
} as Loan;

export { loan1, loan2, loan3, loan4, loan5 };
