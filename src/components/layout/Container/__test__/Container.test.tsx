import { render } from "@testing-library/react-native";

import { Text } from "../../Text/Text";
import { Container } from "../Container";

describe("Container", () => {
  it("Checking that content has rendered correctly", () => {
    const { getByText } = render(
      <Container>
        <Text>Content</Text>
      </Container>
    );

    expect(getByText("Content")).toBeTruthy();
  });

  it("Checking when generics props is passed", () => {
    const { getByTestId } = render(<Container testID="content" />);

    expect(getByTestId("content")).toBeTruthy();
  });

  it("Checking when className is passed", () => {
    const { getByTestId } = render(<Container className="bg-red-500" testID="content" />);

    const element = getByTestId("content");
    expect(element.props.className).toContain("bg-red-500");
  });
});
