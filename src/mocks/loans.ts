import { LoanScheme } from "@/store/schema";

export const loan1 = {
  userId: "user1",
  totalDebit: 30000,
  deadline: new Date("2025-04-01").toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as LoanScheme;

export const loan2 = {
  userId: "user2",
  totalDebit: 50000,
  deadline: new Date("2025-04-01").toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as LoanScheme;

export const loan3 = {
  userId: "user3",
  totalDebit: 10000,
  deadline: new Date("2025-04-01").toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as LoanScheme;

export const loan4 = {
  userId: "user4",
  totalDebit: 2000,
  deadline: new Date("2025-04-01").toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as LoanScheme;

export const loan5 = {
  userId: "user5",
  totalDebit: 50000,
  deadline: new Date("2025-04-01").toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as LoanScheme;

export const loans = {
  loan1,
  loan2,
  loan3,
  loan4,
  loan5,
};
