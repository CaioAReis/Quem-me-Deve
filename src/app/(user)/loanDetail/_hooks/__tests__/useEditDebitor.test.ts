import { act, renderHook } from "@testing-library/react-native";

import { useEditDebitForm } from "../useEditDebitor";

describe("useEditDebit", () => {
  const onCloseModal = jest.fn();
  const onUserUpdate = jest.fn();
  const user = { id: "user1", name: "User Name", phone: "79999999999" };

  it("Checking that renders correctly", async () => {
    const {
      result: {
        current: { handleSubmit },
      },
    } = renderHook(() => useEditDebitForm({ user, onCloseModal, onUserUpdate }));

    await act(async () => {
      handleSubmit();
    });

    expect(onUserUpdate).toHaveBeenCalled();
    expect(onCloseModal).toHaveBeenCalled();
  });
});
