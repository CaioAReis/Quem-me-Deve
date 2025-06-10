import { render } from "@testing-library/react-native";

import { Avatar } from "../Avatar";

describe("Avatar", () => {
  test("Avatar base is rendering", () => {
    render(<Avatar name="User Name" />);
  });
});
