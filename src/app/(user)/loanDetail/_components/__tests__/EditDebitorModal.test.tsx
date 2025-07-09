import { act, fireEvent, render, waitFor } from "@testing-library/react-native";

import { EditDebitorModal } from "../EditDebitorModal";

describe("EditDebitorModal", () => {
  const user = {
    name: "User Name",
    phone: "79999999999",
  };

  it("Checking that renders correctly", () => {
    const { getByText } = render(
      <EditDebitorModal onCloseModal={jest.fn()} onUserUpdate={jest.fn()} user={user} />
    );

    expect(getByText("Nome")).toBeTruthy();
    expect(getByText("Telefone")).toBeTruthy();
    expect(getByText("Anote tudo certinho.")).toBeTruthy();
  });

  it("Checking that renders errors correctly", async () => {
    const { getByText, getByTestId } = render(
      <EditDebitorModal onCloseModal={jest.fn()} onUserUpdate={jest.fn()} user={user} />
    );

    await act(async () => {
      fireEvent.changeText(getByTestId("name"), "");
      fireEvent.changeText(getByTestId("phone"), "");
    });

    await act(async () => {
      fireEvent.press(getByText("Salvar Alterações"));
    });

    await waitFor(() => {
      expect(getByText("Preencha com o nome do Devedor")).toBeTruthy();
      expect(getByText("Preencha com o telefone do Devedor")).toBeTruthy();
    });
  });
});
