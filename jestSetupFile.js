require("react-native-reanimated").setUpTests();

jest.mock("./src/lib/dicebear/generateAvatar", () => ({
  generateAvatar: jest.fn(() => "<svg>Fake</svg>"),
}));

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
