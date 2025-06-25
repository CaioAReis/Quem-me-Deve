import { render } from "@testing-library/react-native";

import { HomeHeader } from "../HomeHeader";

import { useSessionStore } from "@/store/session";

describe("HomeHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Checking that renders correctly", () => {
    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        hiddenValues: false,
        session: { name: "User Name" },
      })
    );

    const { getByText } = render(<HomeHeader loanBalance={900} />);

    expect(getByText("User Name")).toBeTruthy();
    expect(getByText("R$ 900,00")).toBeTruthy();
  });

  it("Checking that hidden values", () => {
    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        hiddenValues: true,
        session: { name: "User Name" },
      })
    );

    const { getByTestId } = render(<HomeHeader loanBalance={900} />);

    expect(getByTestId("hidden")).toBeTruthy();
  });
});
