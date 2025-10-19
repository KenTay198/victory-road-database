import { describe, expect, it } from "vitest";
import FakeHissatsu from "../../entities/hissatsus/hissatsu.fake";
import Hissatsu from "@hissatsu/hissatsu.entity";

describe("Hissatsu Entity", () => {
  //#region Constructor
  describe("constructor", () => {
    it("should create a valid Hissatsu instance with only required properties", () => {
      // act
      const hissatsu = new FakeHissatsu();
      // assert
      expect(hissatsu.id).toBeDefined();
      expect(hissatsu.name).toBeDefined();
      expect(hissatsu.type).toBeDefined();
      expect(hissatsu.element).toBeDefined();
      expect(hissatsu.cost).toBeDefined();
      expect(hissatsu.power).toBeDefined();
      expect(hissatsu.names).toBeDefined();
    });

    it("should create a valid Hissatsu instance with optional properties", () => {
      // act
      const hissatsu = new FakeHissatsu();
      hissatsu.characteristic = "block";
      // assert
      expect(hissatsu.id).toBeDefined();
      expect(hissatsu.name).toBeDefined();
      expect(hissatsu.type).toBeDefined();
      expect(hissatsu.element).toBeDefined();
      expect(hissatsu.cost).toBeDefined();
      expect(hissatsu.power).toBeDefined();
      expect(hissatsu.names).toBeDefined();
      expect(hissatsu.characteristic).toBeDefined();
    });
  });
  //#endregion

  //#region Name
  describe("setLocalizedName", () => {
    const hissatsu = new FakeHissatsu({
      names: { fr: "FR", en: "EN", jp: "JP" },
    });

    it.each([
      { locale: "fr", expected: "FR" },
      { locale: "en", expected: "EN" },
      { locale: "jp", expected: "JP" },
    ])("should set the localized name correctly (locale:$locale)", ({ locale, expected }) => {
      // act
      hissatsu.setLocalizedName(locale as "fr" | "en" | "jp");
      // assert
      expect(hissatsu.name).toBe(expected);
    });
  });
  //#endregion

  //#region Parsing
  describe("toJSON", () => {
    it("should return correct IHissatsu object", () => {
      // arrange
      const hissatsu = new FakeHissatsu();
      hissatsu.characteristic = "block";
      // act
      const json = hissatsu.toJSON();
      // assert
      const expectedKeys = ["id", "name", "names", "element", "type", "characteristic", "power", "cost", "learnLevel"];
      expect(Object.keys(json).sort()).toEqual(expectedKeys.sort());
    });
  });

  describe("fromJSON", () => {
    it("should return correct Hissatsu instance", () => {
      // arrange
      const hissatsu = new FakeHissatsu();
      hissatsu.characteristic = "long";
      const hissatsuData = hissatsu.toJSON();
      // act
      const newHissatsu = Hissatsu.fromJSON(hissatsuData);
      // assert
      expect(newHissatsu).toBeInstanceOf(Hissatsu);
      expect(newHissatsu.id).toBe(hissatsuData.id);
      expect(newHissatsu.name).toBe(hissatsuData.name);
      expect(newHissatsu.type).toBe(hissatsuData.type);
      expect(newHissatsu.element).toBe(hissatsuData.element);
      expect(newHissatsu.characteristic).toBe(hissatsuData.characteristic);
      expect(newHissatsu.names).toBe(hissatsuData.names);
      expect(newHissatsu.power).toBe(hissatsuData.power);
      expect(newHissatsu.cost).toBe(hissatsuData.cost);
      expect(newHissatsu.learnLevel).toBe(hissatsuData.learnLevel);
    });
  });
  //#endregion
});
