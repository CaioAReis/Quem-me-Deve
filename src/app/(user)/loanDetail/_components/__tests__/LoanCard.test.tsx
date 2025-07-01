import { render } from "@testing-library/react-native";

import { LoanCard } from "../LoanCard";

import { HistoryItem } from "@/@types";

describe("LoanCard", () => {
  const history = {
    id: "1",
    type: "loan",
    value: 40000,
    createdAt: new Date(),
  } as HistoryItem;

  it("Checking that renders correctly with loan type", () => {
    const { getByText } = render(<LoanCard loan={history} />);

    expect(getByText("- R$ 400,00")).toBeTruthy();
    expect(getByText("Você Emprestou")).toBeTruthy();
  });

  it("Checking that renders correctly with payment type", () => {
    const { getByText } = render(<LoanCard loan={{ ...history, type: "payment" }} />);

    expect(getByText("+ R$ 400,00")).toBeTruthy();
    expect(getByText("Você Recebeu")).toBeTruthy();
  });
});
