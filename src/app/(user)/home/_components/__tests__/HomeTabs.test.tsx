import { render } from "@testing-library/react-native";

import { HomeTabs } from "../HomeTabs";

describe("HomeTabs", () => {
  it("Checking that renders correctly with pending tab selected", () => {
    const { getByText } = render(
      <HomeTabs
        title="Test Title"
        currentTab="pending"
        onChangeToPaid={jest.fn()}
        onChangeToPending={jest.fn()}
      />
    );

    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Pendente")).toBeTruthy();
    expect(getByText("Pagos")).toBeTruthy();
  });

  it("Checking that renders correctly with paid tab selected", () => {
    const { getByText } = render(
      <HomeTabs
        title="Test Title"
        currentTab="paid"
        onChangeToPaid={jest.fn()}
        onChangeToPending={jest.fn()}
      />
    );

    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Pendente")).toBeTruthy();
    expect(getByText("Pagos")).toBeTruthy();
  });
});
