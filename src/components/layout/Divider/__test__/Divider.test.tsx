import { render } from "@testing-library/react-native";

import { Divider } from "../Divider";

describe("Divider", () => {
  it("Checking if was rendered", () => {
    const { getByTestId } = render(<Divider />);

    expect(getByTestId("divider")).toBeTruthy();
  });
});
