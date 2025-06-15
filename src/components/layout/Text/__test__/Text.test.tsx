import { render } from "@testing-library/react-native";

import { Text } from "../Text";

describe("Text", () => {
  it("Checking if the text is rendered correctly", () => {
    const { getByText } = render(<Text>Exemple Content</Text>);

    expect(getByText("Exemple Content")).toBeTruthy();
  });

  it("Checking when className is passed", () => {
    const { getByTestId } = render(
      <Text className="text-red-500" testID="content">
        Exemple Content
      </Text>
    );

    const element = getByTestId("content");
    expect(element.props.className).toContain("text-red-500");
  });

  it("should apply correct class for variant H1", () => {
    const { getByText } = render(<Text variant="H1">Heading</Text>);
    const text = getByText("Heading");

    expect(text.props.className).toContain("text-4xl");
    expect(text.props.className).toContain("font-poppinsMedium");
  });

  it("should apply correct class for variant H2", () => {
    const { getByText } = render(<Text variant="H2">Heading</Text>);
    const text = getByText("Heading");

    expect(text.props.className).toContain("text-3xl");
    expect(text.props.className).toContain("font-poppinsMedium");
  });

  it("should apply correct class for variant H3", () => {
    const { getByText } = render(<Text variant="H3">Heading</Text>);
    const text = getByText("Heading");

    expect(text.props.className).toContain("text-2xl");
    expect(text.props.className).toContain("font-poppinsMedium");
  });

  it("should apply correct class for variant H4", () => {
    const { getByText } = render(<Text variant="H4">Heading</Text>);
    const text = getByText("Heading");

    expect(text.props.className).toContain("text-xl");
    expect(text.props.className).toContain("font-poppinsMedium");
  });

  it("should apply correct class for variant H5", () => {
    const { getByText } = render(<Text variant="H5">Heading</Text>);
    const text = getByText("Heading");

    expect(text.props.className).toContain("text-lg");
    expect(text.props.className).toContain("font-poppinsMedium");
  });

  it("should apply correct class for variant H6", () => {
    const { getByText } = render(<Text variant="H6">Heading</Text>);
    const text = getByText("Heading");

    expect(text.props.className).toContain("text-base");
    expect(text.props.className).toContain("font-poppinsMedium");
  });
});
