import { render } from "@testing-library/react-native";

import { LoanCard } from "../LoanCard";

import { useSessionStore } from "@/store/session";

describe("LoanCard", () => {
  it("Checking that rendering works", () => {
    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ hiddenValues: false })
    );

    const { getByText } = render(
      <LoanCard
        debit={4000}
        href="../loan/1"
        loanBalance={100}
        userName="User Name"
        since={new Date("2025-01-20T00:00:00")}
      />
    );

    expect(getByText("User Name")).toBeTruthy();
    expect(getByText("Desde 20/01/2025")).toBeTruthy();
    expect(getByText("40%")).toBeTruthy();
    expect(getByText("R$ 40,00")).toBeTruthy();
  });

  it("Checking when hidden values", () => {
    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ hiddenValues: true })
    );

    const { getByTestId } = render(
      <LoanCard
        debit={4000}
        href="../loan/1"
        loanBalance={100}
        userName="User Name"
        since={new Date("2025-02-30T00:00:00")}
      />
    );

    expect(getByTestId("hidden")).toBeTruthy();
  });

  it("Checking when invalid date is passed", () => {
    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ hiddenValues: true })
    );

    const { getByText } = render(
      <LoanCard
        debit={4000}
        href="../loan/1"
        loanBalance={100}
        userName="User Name"
        since={new Date("18319237918273971")}
      />
    );

    expect(getByText("Desde Não disponível")).toBeTruthy();
  });
});
