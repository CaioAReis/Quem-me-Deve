import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import { renderRouter } from "expo-router/testing-library";
import { Button, Text } from "react-native";

import { useLoanDetail } from "../useLoanDetail";

jest.mock("@/services/services", () => ({
  getLoanDetails: jest.fn((id: string) => ({
    id: "loan1",
    user: { id: "user1", name: "name", phone: "79999999999" },
    totalDebit: 9000,
    history: [
      { type: "loan", value: 10000 },
      { type: "payment", value: 1000 },
    ],
    deadline: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
}));

function Wrapper() {
  const { handleGoBack, loanDetails, onUserUpdate, totalDebit, totalPayment } = useLoanDetail();

  const user = { id: "user1", name: "User name 1" };

  return (
    <>
      <Text>Loan: {loanDetails?.id}</Text>
      <Text>Total debit: {totalDebit}</Text>
      <Text>Total payment: {totalPayment}</Text>
      <Text>User name: {loanDetails?.user?.name}</Text>
      <Button title="Back" onPress={handleGoBack} testID="btn-back" />
      <Button title="Update User" onPress={() => onUserUpdate(user)} testID="btn-update-user" />
    </>
  );
}

describe("useLoanDetail", () => {
  it("Checking that renders correctly", () => {
    const { getByTestId } = render(<Wrapper />);

    expect(getByTestId("btn-back")).toBeTruthy();
    expect(getByTestId("btn-update-user")).toBeTruthy();
  });

  it("Checking the back button", async () => {
    renderRouter(
      {
        "(user)/loanDetail/[id]": () => <Wrapper />,
        index: () => <Text>HOME</Text>,
      },
      { initialUrl: "/" }
    );

    await act(async () => {
      router.push("/(user)/loanDetail/loan1");
    });

    const backButton = screen.getByTestId("btn-back");
    fireEvent.press(backButton);

    await waitFor(() => {
      expect(screen).toHavePathname("/");
      expect(screen.getByText("HOME")).toBeTruthy();
    });
  });

  it("Checking the update user button", async () => {
    const { getByText, getByTestId } = render(<Wrapper />);

    const updateButton = getByTestId("btn-update-user");

    await act(async () => {
      fireEvent.press(updateButton);
    });

    await waitFor(() => {
      expect(getByText("User name: User name 1")).toBeTruthy();
    });
  });

  it("Checking that values are correctly", async () => {
    const { getByText } = render(<Wrapper />);

    expect(getByText("Total debit: 10000")).toBeTruthy();
    expect(getByText("Total payment: 1000")).toBeTruthy();
  });
});
