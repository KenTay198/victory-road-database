import { describe, it, expect } from "vitest";
import FakeCharacter from "../entities/character/character.fake";

describe("Character Entity", () => {
  describe("getFullName", () => {
    const character = new FakeCharacter({ firstName: "First", lastName: "Last" });
    it("should return the correct full name", () => {
      expect(character.getFullName()).toBe("First Last");
    });

    it("should be set as a property", () => {
      expect(character.fullName).toBe("First Last");
    });
  });

  describe("getTotalStats", () => {
    it("should calculate correct total stats", () => {
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

      expect(character.statistics.getTotalStats()).toBe(47);
    });
  });

  describe("getAdvancedStatistics", () => {
    it("should calculate correct advanced stats", () => {
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

      const advancedStats = character.statistics.getAdvancedStatistics();
      expect(advancedStats.shoot).toEqual(15);
      expect(advancedStats.focusAtt).toEqual(15);
      expect(advancedStats.scrambleAtt).toEqual(10);
      expect(advancedStats.wall).toEqual(15);
      expect(advancedStats.focusDef).toEqual(8);
      expect(advancedStats.scrambleDef).toEqual(11);
      expect(advancedStats.gk).toEqual(16);
      expect(advancedStats.totalAtt).toEqual(40);
      expect(advancedStats.totalDef).toEqual(34);
    });

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

      expect(character.advancedStatistics.shoot).toEqual(15);
      expect(character.advancedStatistics.focusAtt).toEqual(15);
      expect(character.advancedStatistics.scrambleAtt).toEqual(10);
      expect(character.advancedStatistics.wall).toEqual(15);
      expect(character.advancedStatistics.focusDef).toEqual(8);
      expect(character.advancedStatistics.scrambleDef).toEqual(11);
      expect(character.advancedStatistics.gk).toEqual(16);
      expect(character.advancedStatistics.totalAtt).toEqual(40);
      expect(character.advancedStatistics.totalDef).toEqual(34);
    });
  });
});
