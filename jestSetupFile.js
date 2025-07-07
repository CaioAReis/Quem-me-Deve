require("react-native-reanimated").setUpTests();

jest.mock("@dicebear/core", () => ({
  createAvatar: jest.fn(() => ({
    toString: () => "<svg>Mock</svg>",
  })),
}));

jest.mock("@dicebear/collection", () => ({
  thumbs: {},
}));

jest.mock("@/store/db", () => ({
  db: {
    getRow: jest.fn((table, id) => {
      let data;

      if (table === "users") {
        data = {
          user1: { name: "User Name One", phone: "79999999999" },
          user2: { name: "User Name Two", phone: "79999999999" },
        };
      }

      if (table === "loans") {
        data = {
          loan1: {
            userId: "user1",
            totalDebit: 40000,
            deadline: "2026-05-02",
            updatedAt: "2025-05-02",
            createdAt: "2025-05-02",
          },

          loan2: {
            userId: "user2",
            totalDebit: 40000,
            deadline: "2026-05-02",
            updatedAt: "2025-05-02",
            createdAt: "2025-05-02",
          },
        };
      }

      if (table === "history") {
        data = {
          history1: {
            value: 20000,
            type: "loan",
            loanId: "loan1",
            createdAt: "2025-05-02",
          },

          history2: {
            value: 20000,
            type: "loan",
            loanId: "loan1",
            createdAt: "2025-05-02",
          },

          history3: {
            value: 20000,
            type: "loan",
            loanId: "loan2",
            createdAt: "2025-05-02",
          },

          history4: {
            value: 20000,
            type: "loan",
            loanId: "loan2",
            createdAt: "2025-05-02",
          },
        };
      }

      if (data[id]) return { ...data[id], id };
      else return null;
    }),

    getTable: jest.fn((table) => {
      let data;

      if (table === "users") {
        data = {
          user1: { name: "User Name One", phone: "79999999999" },
          user2: { name: "User Name Two", phone: "79999999999" },
        };
      }

      if (table === "loans") {
        data = {
          loan1: {
            userId: "user1",
            totalDebit: 40000,
            deadline: "2026-05-02",
            updatedAt: "2025-05-02",
            createdAt: "2025-05-02",
          },

          loan2: {
            userId: "user2",
            totalDebit: 40000,
            deadline: "2026-05-02",
            updatedAt: "2025-05-02",
            createdAt: "2025-05-02",
          },
        };
      }

      if (table === "history") {
        data = {
          history1: {
            value: 20000,
            type: "loan",
            loanId: "loan1",
            createdAt: "2025-05-02",
          },

          history2: {
            value: 20000,
            type: "loan",
            loanId: "loan1",
            createdAt: "2025-05-02",
          },

          history3: {
            value: 20000,
            type: "loan",
            loanId: "loan2",
            createdAt: "2025-05-02",
          },

          history4: {
            value: 20000,
            type: "loan",
            loanId: "loan2",
            createdAt: "2025-05-02",
          },
        };
      }

      return data;
    }),

    setRow: jest.fn(),
  },
  loadStore: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("./global.css", () => ({}));

jest.mock("expo-font", () => ({
  useFonts: jest.fn(),
}));

jest.mock("@/store/session", () => ({
  useSessionStore: jest.fn(),
}));

jest.mock("@expo/vector-icons", () => ({
  FontAwesome: () => null,
}));
