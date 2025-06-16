import { convertToCurrency, convertDateToBR, dateMask, phoneMask } from "../functions";

describe("functions", () => {
  describe("convertToCurrency", () => {
    it("Checking format number to BRL currency", () => {
      expect(convertToCurrency(1000)).toBe("R$ 1.000,00");
    });
  });

  describe("convertDateToBR", () => {
    it("Checking convert Date object to BR format", () => {
      const date = new Date(2024, 11, 31);
      expect(convertDateToBR(date)).toBe("31/12/2024");
    });
  });

  describe("dateMask", () => {
    it("Checking apply date mask correctly", () => {
      expect(dateMask("0204")).toBe("02/04");
      expect(dateMask("28072015")).toBe("28/07/2015");
    });
  });

  describe("phoneMask", () => {
    it("Checking format correctly", () => {
      expect(phoneMask("11999999999")).toBe("(11) 99999-9999");
      expect(phoneMask("+5511999999999")).toBe("(11) 99999-9999");
    });
  });
});
