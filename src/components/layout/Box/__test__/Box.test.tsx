import { render } from "@testing-library/react-native";

import { Text } from "../../Text";
import { Box } from "../Box";

describe("Box", () => {
  it("Checking that content has rendered correctly", () => {
    const { getByText } = render(
      <Box>
        <Text>Text rendered</Text>
      </Box>
    );

    expect(getByText("Text rendered")).toBeTruthy();
  });

  it("Checking when generics props is passed", () => {
    const { getByTestId } = render(<Box testID="box-content" />);

    expect(getByTestId("box-content")).toBeTruthy();
  });

  it("Checking when className is passed", () => {
    const { getByTestId } = render(<Box className="bg-red-500" testID="box-content" />);

    const element = getByTestId("box-content");
    expect(element.props.className).toContain("bg-red-500");
  });
});
