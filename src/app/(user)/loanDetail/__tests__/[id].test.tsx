import { screen } from "@testing-library/react-native";
import { renderRouter } from "expo-router/testing-library";

import LoanDetail from "../[id]";

jest.mock("@/services/services", () => ({
  getLoanDetails: jest.fn((id: string) => ({
    id,
    user: { id: "user1", name: "User One", phone: "79999999999" },
    totalDebit: 9000,
    history: [
      { id: "history1", type: "loan", value: 10000 },
      { id: "history2", type: "payment", value: 1000 },
    ],
    deadline: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
}));

describe("LoanDetail", () => {
  it("Checking that renders correctly", () => {
    renderRouter({
      index: () => <LoanDetail />,
    });

    expect(screen.getByText("User One")).toBeTruthy();
    expect(screen.getByText("(79) 99999-9999")).toBeTruthy();
    expect(screen.getByText("R$ 90,00")).toBeTruthy();
  });

  it("Checking the value received", () => {
    renderRouter({
      index: () => <LoanDetail />,
    });

    expect(screen.getByText("Você Recebeu")).toBeTruthy();
    expect(screen.getByText("+ R$ 10,00")).toBeTruthy();
  });

  it("Checking the value loanded", () => {
    renderRouter({
      index: () => <LoanDetail />,
    });

    expect(screen.getByText("Você Emprestou")).toBeTruthy();
    expect(screen.getByText("- R$ 100,00")).toBeTruthy();
  });
});
