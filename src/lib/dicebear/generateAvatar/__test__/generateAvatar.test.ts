import { generateAvatar } from "../generateAvatar";

describe("dicebear", () => {
  describe("generateAvatar", () => {
    it("Checking that generate SVG correctly", () => {
      const svg = generateAvatar("User Name");

      expect(svg).toContain("<svg");
      expect(svg).toContain("</svg>");
    });
  });
});
