import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";

import { Fab } from "../Fab";

import { Text } from "@/components/layout";

describe("Fab", () => {
  it("Checking that renders correctly", () => {
    const { getByTestId } = render(<Fab />);
    expect(getByTestId("fab-button")).toBeTruthy();
  });

  it("navigates to /newLoan when pressed", async () => {
    renderRouter(
      { index: () => <Fab />, "(user)/newLoan": () => <Text>New Loan</Text> },
      { initialUrl: "/" }
    );

    act(() => {
      fireEvent.press(screen.getByTestId("fab-button"));
    });

    await waitFor(() => {
      expect(screen).toHavePathname("/newLoan");
      expect(screen.getByText("New Loan")).toBeTruthy();
    });
    // expect(mockedNavigate).toHaveBeenCalledWith("/(user)/newLoan");
  });
});
