require("react-native-reanimated").setUpTests();

jest.mock("@dicebear/core", () => ({
  createAvatar: jest.fn(() => ({
    toString: () => "<svg>Mock</svg>",
  })),
}));

jest.mock("@dicebear/collection", () => ({
  thumbs: {},
}));

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
