import { render } from "@testing-library/react-native";

import { Text } from "../../Text";
import { HStack } from "../HStack";

describe("HStack", () => {
  it("Checking that content has rendered correctly", () => {
    const { getByText } = render(
      <HStack>
        <Text>Content</Text>
      </HStack>
    );

    expect(getByText("Content")).toBeTruthy();
  });

  it("Checking when generics props is passed", () => {
    const { getByTestId } = render(<HStack testID="content" />);

    expect(getByTestId("content")).toBeTruthy();
  });

  it("Checking when className is passed", () => {
    const { getByTestId } = render(<HStack className="bg-red-500" testID="content" />);

    const element = getByTestId("content");
    expect(element.props.className).toContain("bg-red-500");
  });

  it("Checking if content is horizontal", () => {
    const { getByTestId } = render(<HStack testID="content" />);

    const element = getByTestId("content");
    expect(element.props.className).toContain("flex-row");
  });
});
