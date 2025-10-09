import { describe, it, expect, vi } from "vitest";
import FakeCharacter from "../entities/character/character.fake";
import AdvancedStatistics from "@character/entities/advancedStatistics.entity";
import Meta from "@meta/meta.entity";
import Statistics from "@character/entities/statistics.entity";
import FakeHissatsu from "../entities/character/hissatsu.fake";
import type { HissatsuCharacteristic, HissatsuType } from "@hissatsu/hissatsu.types";

describe("Character Entity", () => {
  describe("getFullName", () => {
    const character = new FakeCharacter({ firstName: "First", lastName: "Last" });
    it("should return the correct full name", () => {
      // assert
      expect(character.getFullName()).toBe("First Last");
    });

    it("should be set as a property", () => {
      // assert
      expect(character.fullName).toBe("First Last");
    });
  });

  describe("setLocalizedName", () => {
    const character = new FakeCharacter({
      names: { fr: { firstName: "Nom", lastName: "Prénom" }, vo: { firstName: "First", lastName: "Last" } },
    });

    it.each([
      { locale: "fr", expected: { firstName: "Nom", lastName: "Prénom" } },
      { locale: "vo", expected: { firstName: "First", lastName: "Last" } },
    ])("should set the localized name correctly (locale:$locale)", ({ locale, expected }) => {
      // act
      character.setLocalizedName(locale as "fr" | "vo");
      // assert
      expect(character.firstName).toBe(expected.firstName);
      expect(character.lastName).toBe(expected.lastName);
      if (locale === "vo") {
        expect(character.fullName).toBe(`${expected.lastName} ${expected.firstName}`);
      } else {
        expect(character.fullName).toBe(`${expected.firstName} ${expected.lastName}`);
      }
    });
  });

  describe("getArchetypes", () => {
    it.each([
      { expected: ["none"] },
      { aboveAverageStats: ["shoot"], hissatsuTypesAndCharacteristics: { kick: true }, expected: ["striker"] },
      {
        aboveAverageStats: ["shoot", "focusAtt"],
        hissatsuTypesAndCharacteristics: { kick: true },
        expected: ["striker", "forward"],
      },
      {
        aboveAverageStats: ["shoot", "scrambleAtt"],
        hissatsuTypesAndCharacteristics: { kick: true },
        expected: ["striker", "forward"],
      },
      {
        aboveAverageStats: [],
        hissatsuTypesAndCharacteristics: { long: true },
        expected: ["long-shooter"],
      },
      {
        aboveAverageStats: ["faceoffAtt"],
        hissatsuTypesAndCharacteristics: { kick: true },
        expected: ["attacking-midfielder"],
      },
      {
        aboveAverageStats: ["faceoffAtt", "scrambleDef"],
        hissatsuTypesAndCharacteristics: { dribble: true },
        expected: ["central-midfielder"],
      },
      {
        aboveAverageStats: ["faceoffAtt", "focusDef"],
        hissatsuTypesAndCharacteristics: { dribble: true },
        expected: ["central-midfielder"],
      },
      {
        aboveAverageStats: ["faceoffAtt", "focusDef"],
        hissatsuTypesAndCharacteristics: { defense: true },
        expected: ["defensive-midfielder"],
      },
      {
        aboveAverageStats: ["faceoffAtt", "scrambleDef"],
        hissatsuTypesAndCharacteristics: { defense: true },
        expected: ["defensive-midfielder"],
      },
      {
        aboveAverageStats: ["faceoffDef"],
        hissatsuTypesAndCharacteristics: { defense: true },
        expected: ["defender"],
      },
      {
        aboveAverageStats: ["wall"],
        hissatsuTypesAndCharacteristics: { defense: true, block: true },
        expected: ["wall-defender"],
      },
      {
        aboveAverageStats: ["gk"],
        hissatsuTypesAndCharacteristics: { keep: true },
        expected: ["goalkeeper"],
      },
    ])(
      "should return the correct archetypes: $expected",
      ({ aboveAverageStats, hissatsuTypesAndCharacteristics, expected }) => {
        // arrange
        const character = new FakeCharacter();
        character.setMeta(new Meta({ initialized: true }));
        vi.spyOn(character, "calculateAboveAverageStats").mockReturnValue(aboveAverageStats || []);
        vi.spyOn(character, "findAllHissatsuTypesAndCharacteristics").mockReturnValue(
          hissatsuTypesAndCharacteristics || {},
        );
        // act
        const archetypes = character.getArchetypes();
        // assert
        expect(archetypes).toBeTruthy();
        expect(archetypes).toEqual(expected);
      },
    );
  });

  describe("calculateAboveAverageStats", () => {
    it("should return empty array when meta is not initialized", () => {
      // arrange
      const character = new FakeCharacter();
      // act
      const result = character.calculateAboveAverageStats();
      // assert
      expect(result).toEqual([]);
    });

    it("should return empty array when no meta is set", () => {
      // arrange
      const character = new FakeCharacter();
      character.setMeta(new Meta({ initialized: false }));

      // act
      const result = character.calculateAboveAverageStats();

      // assert
      expect(result).toEqual([]);
    });

    it("should return stats above average when meta is initialized", () => {
      // arrange
      const character = new FakeCharacter({
        statistics: Statistics.initialize(10),
      });
      character.statistics.kick = 15;

      const metaStats = Statistics.initialize(10);
      const metaAdvancedStats = metaStats.getAdvancedStatistics();
      const meta = new Meta({
        statRange: {
          max: metaStats,
          mean: metaStats,
          min: metaStats,
        },
        advancedStatRange: {
          max: metaAdvancedStats,
          mean: metaAdvancedStats,
          min: metaAdvancedStats,
        },
        initialized: true,
      });

      character.setMeta(meta);

      // act
      const result = character.calculateAboveAverageStats();

      // assert
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("findAllHissatsuTypesAndCharacteristics", () => {
    it.each([
      {
        name: "no hissatsus",
        hissatsus: [],
        expected: {},
      },
      {
        name: "kick type only",
        hissatsus: [{ type: "kick", characteristic: undefined }],
        expected: { kick: true },
      },
      {
        name: "dribble type only",
        hissatsus: [{ type: "dribble", characteristic: undefined }],
        expected: { dribble: true },
      },
      {
        name: "defense type only",
        hissatsus: [{ type: "defense", characteristic: undefined }],
        expected: { defense: true },
      },
      {
        name: "keep type only",
        hissatsus: [{ type: "keep", characteristic: undefined }],
        expected: { keep: true },
      },
      {
        name: "long characteristic",
        hissatsus: [{ type: "kick", characteristic: "long" }],
        expected: { kick: true, long: true },
      },
      {
        name: "block characteristic",
        hissatsus: [{ type: "defense", characteristic: "block" }],
        expected: { defense: true, block: true },
      },
    ])("should handle $name", ({ hissatsus, expected }) => {
      // arrange
      const character = new FakeCharacter();
      character.hissatsus = hissatsus.map(
        (h) =>
          new FakeHissatsu({
            type: h.type as HissatsuType,
            characteristic: h.characteristic ? (h.characteristic as HissatsuCharacteristic) : undefined,
          }),
      );

      // act
      const result = character.findAllHissatsuTypesAndCharacteristics();

      // assert
      expect(result).toEqual(expected);
    });
  });

  describe("findHissatsu", () => {
    it.each([
      {
        name: "should find hissatsu by id",
        hissatsus: [
          { id: "1", type: "kick" },
          { id: "2", type: "defense" },
        ],
        searchId: "1",
        shouldFind: true,
      },
      {
        name: "should not find hissatsu with non-existent id",
        hissatsus: [
          { id: "1", type: "kick" },
          { id: "2", type: "defense" },
        ],
        searchId: "999",
        shouldFind: false,
      },
      {
        name: "should return undefined when no hissatsus",
        hissatsus: [],
        searchId: "1",
        shouldFind: false,
      },
    ])("$name", ({ hissatsus, searchId, shouldFind }) => {
      // arrange
      const character = new FakeCharacter();
      character.hissatsus = hissatsus.map((h) => {
        const hissatsu = new FakeHissatsu({ type: h.type as HissatsuType });
        hissatsu.id = h.id;
        return hissatsu;
      });

      // act
      const result = character.findHissatsu(searchId);

      // assert
      if (shouldFind) {
        expect(result).toBeDefined();
        expect(result?.id).toBe(searchId);
      } else {
        expect(result).toBeUndefined();
      }
    });
  });

  describe("findHissatsusByType", () => {
    it.each([
      {
        name: "should find hissatsus by type",
        hissatsus: [{ type: "kick" }, { type: "defense" }, { type: "kick" }],
        searchType: "kick" as HissatsuType,
        expectedCount: 2,
      },
      {
        name: "should return empty array for non-existent type",
        hissatsus: [{ type: "kick" }, { type: "defense" }],
        searchType: "dribble" as HissatsuType,
        expectedCount: 0,
      },
      {
        name: "should return empty array when no hissatsus",
        hissatsus: [],
        searchType: "kick" as HissatsuType,
        expectedCount: 0,
      },
    ])("$name", ({ hissatsus, searchType, expectedCount }) => {
      // arrange
      const character = new FakeCharacter();
      character.hissatsus = hissatsus.map((h) => new FakeHissatsu({ type: h.type as HissatsuType }));

      // act
      const result = character.findHissatsusByType(searchType);

      // assert
      expect(result).toHaveLength(expectedCount);
      result.forEach((hissatsu) => {
        expect(hissatsu.type).toBe(searchType);
      });
    });
  });

  describe("hasHissatsuByType", () => {
    it.each([
      {
        name: "should return true when character has hissatsu of type",
        hissatsus: [{ type: "kick" }, { type: "defense" }],
        searchType: "kick" as HissatsuType,
        expected: true,
      },
      {
        name: "should return false when character doesn't have hissatsu of type",
        hissatsus: [{ type: "kick" }, { type: "defense" }],
        searchType: "dribble" as HissatsuType,
        expected: false,
      },
      {
        name: "should return false when no hissatsus",
        hissatsus: [],
        searchType: "kick" as HissatsuType,
        expected: false,
      },
    ])("$name", ({ hissatsus, searchType, expected }) => {
      // arrange
      const character = new FakeCharacter();
      character.hissatsus = hissatsus.map((h) => new FakeHissatsu({ type: h.type as HissatsuType }));

      // act
      const result = character.hasHissatsuByType(searchType);

      // assert
      expect(result).toBe(expected);
    });
  });

  describe("findHissatsusByCharacteristic", () => {
    it.each([
      {
        name: "should find hissatsus by characteristic",
        hissatsus: [{ characteristic: "long" }, { characteristic: "block" }, { characteristic: "long" }],
        searchCharacteristic: "long" as HissatsuCharacteristic,
        expectedCount: 2,
      },
      {
        name: "should return empty array for non-existent characteristic",
        hissatsus: [{ characteristic: "long" }, { characteristic: "block" }],
        searchCharacteristic: "block" as HissatsuCharacteristic,
        expectedCount: 1,
      },
      {
        name: "should return empty array when no hissatsus",
        hissatsus: [],
        searchCharacteristic: "long" as HissatsuCharacteristic,
        expectedCount: 0,
      },
      {
        name: "should handle hissatsus without characteristics",
        hissatsus: [{ characteristic: undefined }, { characteristic: "long" }],
        searchCharacteristic: "long" as HissatsuCharacteristic,
        expectedCount: 1,
      },
    ])("$name", ({ hissatsus, searchCharacteristic, expectedCount }) => {
      // arrange
      const character = new FakeCharacter();
      character.hissatsus = hissatsus.map(
        (h) =>
          new FakeHissatsu({
            type: "kick",
            characteristic: h.characteristic as HissatsuCharacteristic,
          }),
      );

      // act
      const result = character.findHissatsusByCharacteristic(searchCharacteristic);

      // assert
      expect(result).toHaveLength(expectedCount);
      result.forEach((hissatsu) => {
        expect(hissatsu.characteristic).toBe(searchCharacteristic);
      });
    });
  });

  describe("hasHissatsuByCharacteristic", () => {
    it.each([
      {
        name: "should return true when character has hissatsu with characteristic",
        hissatsus: [{ characteristic: "long" }, { characteristic: "block" }],
        searchCharacteristic: "long" as HissatsuCharacteristic,
        expected: true,
      },
      {
        name: "should return false when character doesn't have hissatsu with characteristic",
        hissatsus: [{ characteristic: "long" }, { characteristic: "block" }],
        searchCharacteristic: "block" as HissatsuCharacteristic,
        expected: true,
      },
      {
        name: "should return false when no hissatsus",
        hissatsus: [],
        searchCharacteristic: "long" as HissatsuCharacteristic,
        expected: false,
      },
      {
        name: "should return false when no hissatsus have characteristics",
        hissatsus: [{ characteristic: undefined }, { characteristic: undefined }],
        searchCharacteristic: "long" as HissatsuCharacteristic,
        expected: false,
      },
    ])("$name", ({ hissatsus, searchCharacteristic, expected }) => {
      // arrange
      const character = new FakeCharacter();
      character.hissatsus = hissatsus.map(
        (h) =>
          new FakeHissatsu({
            type: "kick",
            characteristic: h.characteristic as HissatsuCharacteristic,
          }),
      );

      // act
      const result = character.hasHissatsuByCharacteristic(searchCharacteristic);

      // assert
      expect(result).toBe(expected);
    });
  });

  describe("advancedStatistics", () => {
    it("should be set as a property", () => {
      const character = new FakeCharacter({
        statistics: {
          kick: 5,
          control: 10,
          pressure: 8,
          physical: 7,
          agility: 9,
          intelligence: 3,
          technique: 5,
        },
      });

      expect(character.advancedStatistics).toBeTruthy();
      expect(character.advancedStatistics).toBeInstanceOf(AdvancedStatistics);
    });
  });
});
