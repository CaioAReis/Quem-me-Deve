import { render } from "@testing-library/react-native";

import { LoadingScreen } from "../LoadingScreen";

describe("LoadingScreen", () => {
  it("Checking if logo image is displayed", () => {
    const { getByTestId } = render(<LoadingScreen />);

    expect(getByTestId("logo-loading").type).toBe("Image");
  });

  it("Checking if indicator loading is displayed", () => {
    const { getByTestId } = render(<LoadingScreen />);

    expect(getByTestId("indicator-loading")).toBeTruthy();
  });
});
