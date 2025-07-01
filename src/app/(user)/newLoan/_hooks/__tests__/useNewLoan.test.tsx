import { addDays } from "date-fns";
import { router } from "expo-router";
import { act, fireEvent, renderRouter, screen, waitFor } from "expo-router/testing-library";
import { useColorScheme } from "nativewind";
import { Button, Text, View } from "react-native";

import { LoanForm } from "../../_components";
import { useNewLoan } from "../useNewLoan";

jest.mock("nativewind", () => ({
  useColorScheme: jest.fn(),
}));

describe("useNewLoan", () => {
  function Wapper() {
    const { handleSubmit, color, handleBack, control, errors } = useNewLoan();

    return (
      <View testID="wapper-new-loan">
        <Text>{color}</Text>
        <LoanForm control={control} errors={errors} />
        <Button title="Back" onPress={handleBack} />
        <Button title="Send" onPress={handleSubmit} />
      </View>
    );
  }

  it("Checking that renders correctly", () => {
    (useColorScheme as jest.Mock).mockImplementation(() => ({ colorScheme: "light" }));

    renderRouter({ index: Wapper });

    expect(screen.getByText("#3e3e46")).toBeTruthy();
    expect(screen.getByTestId("wapper-new-loan")).toBeTruthy();
  });

  it("Checking that renders correctly with dark theme", () => {
    (useColorScheme as jest.Mock).mockImplementation(() => ({ colorScheme: "dark" }));

    renderRouter({ index: Wapper });

    expect(screen.getByText("#e9e9ea")).toBeTruthy();
    expect(screen.getByTestId("wapper-new-loan")).toBeTruthy();
  });

  it("Checking that the back button works", async () => {
    (useColorScheme as jest.Mock).mockImplementation(() => ({ colorScheme: "light" }));

    const { getByText } = renderRouter(
      {
        index: () => <Text>HOME</Text>,
        "(user)/newLoan": Wapper,
      },
      { initialUrl: "/" }
    );

    act(() => {
      router.push("/(user)/newLoan");
    });

    const backButton = getByText("Back");
    fireEvent.press(backButton);

    await waitFor(() => {
      expect(screen).toHavePathname("/");
      expect(screen.getByText("HOME")).toBeTruthy();
    });
  });

  it("Checking that onSubmit function works", async () => {
    (useColorScheme as jest.Mock).mockImplementation(() => ({ colorScheme: "light" }));

    renderRouter(
      {
        index: () => <Text>HOME</Text>,
        "(user)/newLoan": Wapper,
      },
      { initialUrl: "/" }
    );

    await act(async () => {
      router.push("/(user)/newLoan");
    });

    await waitFor(() => {
      expect(screen.getByTestId("wapper-new-loan")).toBeTruthy();
    });

    await act(async () => {
      fireEvent.changeText(screen.getByText("Nome do Devedor"), "User Test");
      fireEvent.changeText(screen.getByText("Telefone do Devedor"), "(79) 99999-9999");
      fireEvent.changeText(screen.getByTestId("loan-form-total-debit"), "123");
      fireEvent.changeText(
        screen.getByTestId("loan-form-deadline"),
        addDays(new Date(), 10).toLocaleDateString("pt-BR")
      );

      fireEvent.press(screen.getByText("Send"));
    });

    await waitFor(() => {
      expect(screen).toHavePathname("/");
      expect(screen.getByText("HOME")).toBeTruthy();
    });
  });

  it("Checking that onSubmit function works when deadline was not passed", async () => {
    (useColorScheme as jest.Mock).mockImplementation(() => ({ colorScheme: "light" }));

    renderRouter(
      {
        index: () => <Text>HOME</Text>,
        "(user)/newLoan": Wapper,
      },
      { initialUrl: "/" }
    );

    await act(async () => {
      router.push("/(user)/newLoan");
    });

    await waitFor(() => {
      expect(screen.getByTestId("wapper-new-loan")).toBeTruthy();
    });

    await act(async () => {
      fireEvent.changeText(screen.getByText("Nome do Devedor"), "User Test");
      fireEvent.changeText(screen.getByText("Telefone do Devedor"), "(79) 99999-9999");
      fireEvent.changeText(screen.getByTestId("loan-form-total-debit"), "123");

      fireEvent.press(screen.getByText("Send"));
    });

    await waitFor(() => {
      expect(screen).toHavePathname("/");
      expect(screen.getByText("HOME")).toBeTruthy();
    });
  });
});
