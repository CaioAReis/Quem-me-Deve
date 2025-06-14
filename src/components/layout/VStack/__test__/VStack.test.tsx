import { render } from "@testing-library/react-native";

import { Text } from "../../Text";
import { VStack } from "../VStack";

describe("HStack", () => {
  it("Checking that content has rendered correctly", () => {
    const { getByText } = render(
      <VStack>
        <Text>Content</Text>
      </VStack>
    );

    expect(getByText("Content")).toBeTruthy();
  });

  it("Checking when generics props is passed", () => {
    const { getByTestId } = render(<VStack testID="content" />);

    expect(getByTestId("content")).toBeTruthy();
  });

  it("Checking when className is passed", () => {
    const { getByTestId } = render(<VStack className="bg-red-500" testID="content" />);

    const element = getByTestId("content");
    expect(element.props.className).toContain("bg-red-500");
  });

  it("Checking if content is vertical", () => {
    const { getByTestId } = render(<VStack testID="content" />);

    const element = getByTestId("content");
    expect(element.props.className).toContain("flex-col");
  });
});
