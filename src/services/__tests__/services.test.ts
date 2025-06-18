import {
  updateUser,
  generateId,
  createUserLoan,
  getLoanDetails,
  createHistoryItem,
  updateLoanTotalDebit,
  getLoansWithUsersAndHistory,
} from "../services";

import { db } from "@/store/db";

describe("Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getLoansWithUsersAndHistory", () => {
    it("Checking if returns correctly", () => {
      const loans = getLoansWithUsersAndHistory();

      expect(loans).toEqual(
        expect.arrayContaining([
          {
            user: { id: "user1", name: "User Name One", phone: "79999999999" },
            id: "loan1",
            history: [],
            totalDebit: 40000,
            deadline: new Date("2026-05-02T00:00:00.000Z"),
            updatedAt: new Date("2025-05-02T00:00:00.000Z"),
            createdAt: new Date("2025-05-02T00:00:00.000Z"),
          },
          {
            user: { id: "user2", name: "User Name Two", phone: "79999999999" },
            id: "loan2",
            history: [],
            totalDebit: 40000,
            deadline: new Date("2026-05-02T00:00:00.000Z"),
            updatedAt: new Date("2025-05-02T00:00:00.000Z"),
            createdAt: new Date("2025-05-02T00:00:00.000Z"),
          },
        ])
      );
    });
  });

  describe("getLoanDetails", () => {
    it("Checking with valid ID", () => {
      const loan = getLoanDetails("loan1");

      expect(loan).toMatchObject({
        user: { name: "User Name One", phone: "79999999999", id: "user1" },
        id: "loan1",
        totalDebit: 40000,
        history: [
          {
            id: "history1",
            type: "loan",
            value: 20000,
            createdAt: new Date("2025-05-02T00:00:00.000Z"),
          },
          {
            id: "history2",
            type: "loan",
            value: 20000,
            createdAt: new Date("2025-05-02T00:00:00.000Z"),
          },
        ],
        deadline: new Date("2026-05-02T00:00:00.000Z"),
        createdAt: new Date("2025-05-02T00:00:00.000Z"),
        updatedAt: new Date("2025-05-02T00:00:00.000Z"),
      });
    });

    it("Checking with invalid ID", () => {
      const loan = getLoanDetails("loan11");

      expect(loan).toBeFalsy();
    });
  });

  describe("generateId", () => {
    it("Checking that user ID is correctly", () => {
      const userID = generateId("user");

      expect(userID).toContain("user");
    });

    it("Checking that history ID is correctly", () => {
      const historyID = generateId("history");

      expect(historyID).toContain("history");
    });

    it("Checking that loan ID is correctly", () => {
      const loanID = generateId("loan");

      expect(loanID).toContain("loan");
    });
  });

  describe("createUserLoan", () => {
    it("Checking if create a new loan to user", () => {
      const result = createUserLoan({
        value: 3000,
        name: "User Name",
        phone: "79999999999",
        deadline: "2026-05-02T00:00:00.000Z",
      });

      expect(result.userId).toContain("user");
      expect(result.loanId).toContain("loan");
      expect(result.historyId).toContain("history");
    });
  });

  describe("updateUser", () => {
    it("Checking that db.setRow is called to update user data", () => {
      const updates = {
        name: "User One Updated",
        phone: "79999999999",
      };

      updateUser("user1", updates);

      expect(db.setRow).toHaveBeenCalled();
    });

    it("Checking that db.setRow is not called to update user data", () => {
      const updates = {
        name: "User One Updated",
        phone: "79999999999",
      };

      updateUser("user11", updates);

      expect(db.setRow).not.toHaveBeenCalled();
    });
  });

  describe("createHistoryItem", () => {
    describe("Valid loanId", () => {
      it("Checking that created a payment", () => {
        const history = createHistoryItem({ loanId: "loan1", type: "payment", value: 40000 });

        expect(history).toBeTruthy();
        expect(history).toHaveProperty("id");
        expect(history).toHaveProperty("createdAt");
      });

      it("Checking that created a loan", () => {
        const history = createHistoryItem({ loanId: "loan1", type: "loan", value: 40000 });

        expect(history).toBeTruthy();
        expect(history).toHaveProperty("id");
        expect(history).toHaveProperty("createdAt");
      });
    });

    describe("Invalid loanId", () => {
      it("Checking that loan has not been created", () => {
        const history = createHistoryItem({ loanId: "loan11", type: "loan", value: 40000 });

        expect(history).toBeFalsy();
      });

      it("Checking that payment has not been created", () => {
        const history = createHistoryItem({ loanId: "loan11", type: "payment", value: 40000 });

        expect(history).toBeFalsy();
      });
    });
  });

  describe("updateLoanTotalDebit", () => {
    describe("Valid loanId", () => {
      it("Checking that total debit was updated", () => {
        const loan = updateLoanTotalDebit({ loanId: "loan1", newTotal: 40000 });

        expect(loan).toBeTruthy();
        expect(loan).toHaveProperty("totalDebit");
        expect(loan?.totalDebit).toBe(40000);
      });
    });

    describe("Invalid loanId", () => {
      it("Checking that total debit was not updated", () => {
        const loan = updateLoanTotalDebit({ loanId: "loan11", newTotal: 40000 });

        expect(loan).toBeFalsy();
      });
    });
  });
});
