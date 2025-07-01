import { renderRouter, screen } from "expo-router/testing-library";

import NewLoan from "../index";

describe("newLoan", () => {
  it("Checking that renders correctly", () => {
    renderRouter({ index: NewLoan });

    expect(screen.getByText("Novo Empréstimo")).toBeTruthy();
    expect(screen.getByText("Nome do Devedor")).toBeTruthy();
    expect(screen.getByText("Telefone do Devedor")).toBeTruthy();
    expect(screen.getByText("Valor do Empréstimo")).toBeTruthy();
    expect(screen.getByText("Vencimento")).toBeTruthy();
  });
});
