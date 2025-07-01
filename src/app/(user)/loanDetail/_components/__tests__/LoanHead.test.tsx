import { fireEvent, render, waitFor } from "@testing-library/react-native";

import { LoanHead } from "../LoanHead";

import { useSessionStore } from "@/store/session";

describe("LoanHead", () => {
  const user = {
    name: "User Name",
    phone: "79999999999",
  };

  it("Checking that renders correctly", () => {
    const { getByText } = render(
      <LoanHead user={user} totalDebit={10000} onGoBack={jest.fn()} onUserUpdate={jest.fn()} />
    );

    expect(getByText("UN")).toBeTruthy();
    expect(getByText("User Name")).toBeTruthy();
    expect(getByText("(79) 99999-9999")).toBeTruthy();
    expect(getByText("Dívida total")).toBeTruthy();
    expect(getByText("R$ 100,00")).toBeTruthy();
  });

  it("Checking that back button works", () => {
    const onGoBack = jest.fn();
    const { getByTestId } = render(
      <LoanHead user={user} totalDebit={10000} onGoBack={onGoBack} onUserUpdate={jest.fn()} />
    );

    fireEvent.press(getByTestId("back"));

    expect(onGoBack).toHaveBeenCalled();
  });

  it("Checking that Modal to edit user opened", () => {
    const openEditUser = jest.fn();
    const { getByText, getByTestId } = render(
      <LoanHead user={user} totalDebit={10000} onGoBack={jest.fn()} onUserUpdate={openEditUser} />
    );

    fireEvent.press(getByTestId("edit-user"));

    waitFor(() => {
      expect(getByText("Editar Devedor")).toBeTruthy();
    });
  });

  it("Checking that hidden values", () => {
    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ hiddenValues: true })
    );

    const { getByTestId } = render(
      <LoanHead user={user} totalDebit={10000} onGoBack={jest.fn()} onUserUpdate={jest.fn()} />
    );

    expect(getByTestId("hidden-value")).toBeTruthy();
  });
});
