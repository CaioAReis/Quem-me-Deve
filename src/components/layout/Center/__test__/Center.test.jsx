import { render } from "@testing-library/react-native";

import { Text } from "../../Text/Text";
import { Center } from "../Center";

describe("Center", () => {
  it("Checking that content has rendered correctly", () => {
    const { getByText } = render(
      <Center>
        <Text>Content</Text>
      </Center>
    );

    expect(getByText("Content")).toBeTruthy();
  });

  it("Checking when generics props is passed", () => {
    const { getByTestId } = render(<Center testID="content" />);

    expect(getByTestId("content")).toBeTruthy();
  });

  it("Checking when className is passed", () => {
    const { getByTestId } = render(<Center className="bg-red-500" testID="content" />);

    const element = getByTestId("content");
    expect(element.props.className).toContain("bg-red-500");
  });

  it("Checking that content has centered", () => {
    const { getByTestId } = render(<Center testID="content" />);

    const element = getByTestId("content");
    expect(element.props.className).toContain("items-center");
    expect(element.props.className).toContain("justify-center");
  });
});
