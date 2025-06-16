import { RegExValidate } from "../regex";

describe("RegExValidate", () => {
  describe("NAME", () => {
    it("Checking valid NAMEs", () => {
      expect(RegExValidate.NAME.test("João Silva")).toBeTruthy();
      expect(RegExValidate.NAME.test("Ana Maria de Souza")).toBeTruthy();
    });

    it("Checking invalid NAMEs", () => {
      expect(RegExValidate.NAME.test("João 123")).toBeFalsy();
      expect(RegExValidate.NAME.test("joão silva")).toBeFalsy();
    });
  });

  describe("CPF", () => {
    it("Checking validate CPF format", () => {
      expect(RegExValidate.CPF.test("123.456.789-00")).toBeTruthy();
    });

    it("Checking invalid CPF format", () => {
      expect(RegExValidate.CPF.test("12345678900")).toBeFalsy();
      expect(RegExValidate.CPF.test("123.456.789.00")).toBeFalsy();
    });
  });

  describe("EMAIL", () => {
    it("Checking validate EMAILs", () => {
      expect(RegExValidate.EMAIL.test("email@example.com")).toBeTruthy();
      expect(RegExValidate.EMAIL.test("joao.silva@example.com")).toBeTruthy();
    });

    it("Checking invalid EMAILs", () => {
      expect(RegExValidate.EMAIL.test("joao.silva.email.com")).toBeFalsy();
      expect(RegExValidate.EMAIL.test("email@.com")).toBeFalsy();
    });
  });

  describe("DATE", () => {
    it("Checking validate DATEs (dd/mm/yyyy)", () => {
      expect(RegExValidate.DATE.test("31/12/2024")).toBeTruthy();
      expect(RegExValidate.DATE.test("29/02/2024")).toBeTruthy();
    });

    it("Checking invalid DATEs", () => {
      expect(RegExValidate.DATE.test("31/04/2024")).toBeFalsy();
      expect(RegExValidate.DATE.test("29/02/2025")).toBeFalsy();
    });
  });

  describe("CEP", () => {
    it("Checking validate CEPs (99999-999)", () => {
      expect(RegExValidate.CEP.test("49000-000")).toBeTruthy();
    });

    it("Checking invalid CEPs", () => {
      expect(RegExValidate.CEP.test("49000000")).toBeFalsy();
    });
  });

  describe("PHONE", () => {
    it("Checking validate PHONEs ((99) 99999-9999)", () => {
      expect(RegExValidate.PHONE.test("(79) 99999-9999")).toBeTruthy();
    });

    it("Checking invalid PHONEs", () => {
      expect(RegExValidate.PHONE.test("7999999999")).toBeFalsy();
      expect(RegExValidate.PHONE.test("(79)99999-9999")).toBeFalsy();
    });
  });
});
