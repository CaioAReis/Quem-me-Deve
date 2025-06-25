import { render } from "@testing-library/react-native";

import { ListEmpty } from "../ListEmpty";

describe("ListEmpty", () => {
  it("Checking that render correctly", () => {
    const { getByText, getByTestId } = render(<ListEmpty />);

    expect(getByText("Sem dívidas registradas!")).toBeTruthy();
    expect(getByTestId("image-empty")).toBeTruthy();
  });
});
