import { render } from "@testing-library/react-native";

import { NewLoanFooter } from "../NewLoanFooter";

describe("NewLoanFooter", () => {
  it("Checking that renders with default props", () => {
    const { getByText, getByTestId } = render(<NewLoanFooter />);

    expect(getByText("")).toBeTruthy();
    expect(getByTestId("new-loan-footer")).toBeTruthy();
  });

  it("Checking that renders with custom image and title", () => {
    const customImage = require("@/assets/images/burn.png");
    const customTitle = "Footer Title";

    const { getByText, getByTestId } = render(
      <NewLoanFooter image={customImage} title={customTitle} />
    );

    expect(getByText(customTitle)).toBeTruthy();
    expect(getByTestId("new-loan-footer")).toBeTruthy();
  });
});
