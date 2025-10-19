import { describe, it, expect } from "vitest";
import Statistics from "@character/entities/statistics.entity";

describe("Statistics Entity", () => {
  const statistics = new Statistics({
    kick: 5,
    control: 5,
    pressure: 5,
    physical: 5,
    agility: 5,
    intelligence: 5,
    technique: 5,
  });

  describe("initialize", () => {
    it("should initialize all properties to a given value", () => {
      const stats = Statistics.initialize(7);
      expect(stats.kick).toBe(7);
      expect(stats.control).toBe(7);
      expect(stats.pressure).toBe(7);
      expect(stats.physical).toBe(7);
      expect(stats.agility).toBe(7);
      expect(stats.intelligence).toBe(7);
      expect(stats.technique).toBe(7);
      expect(stats.total).toBe(49);
    });
  });

  describe("getTotalStats", () => {
    it("should calculate correct total stats", () => {
      expect(statistics.getTotalStats()).toBe(35);
    });
  });

  describe("getAdvancedStatistics", () => {
    it("should calculate correct advanced stats", () => {
      const advancedStats = statistics.getAdvancedStatistics();
      expect(advancedStats.shoot).toEqual(10);
      expect(advancedStats.focusAtt).toEqual(10);
      expect(advancedStats.scrambleAtt).toEqual(10);
      expect(advancedStats.faceoffAtt).toEqual(20);
      expect(advancedStats.totalAtt).toEqual(30);
      expect(advancedStats.wall).toEqual(10);
      expect(advancedStats.focusDef).toEqual(10);
      expect(advancedStats.scrambleDef).toEqual(10);
      expect(advancedStats.faceoffDef).toEqual(20);
      expect(advancedStats.totalDef).toEqual(30);
      expect(advancedStats.gk).toEqual(10);
    });
  });

  describe("add", () => {
    it("should calculate the sum of every property between two instances", () => {
      const otherStats = Statistics.initialize(10);
      const result = statistics.add(otherStats);
      expect(result.kick).toBe(15);
      expect(result.control).toBe(15);
      expect(result.pressure).toBe(15);
      expect(result.physical).toBe(15);
      expect(result.agility).toBe(15);
      expect(result.intelligence).toBe(15);
      expect(result.technique).toBe(15);
      expect(result.total).toBe(15 * 7);
    });
  });

  describe("mean", () => {
    it("should calculate the mean of every property between two instances", () => {
      const otherStats = Statistics.initialize(10);
      const result = statistics.mean(otherStats);
      expect(result.kick).toBe(7.5);
      expect(result.control).toBe(7.5);
      expect(result.pressure).toBe(7.5);
      expect(result.physical).toBe(7.5);
      expect(result.agility).toBe(7.5);
      expect(result.intelligence).toBe(7.5);
      expect(result.technique).toBe(7.5);
      expect(result.total).toBe(7.5 * 7);
    });
  });

  describe("multiply", () => {
    it("should calculate the product of every property multiplied by a given factor", () => {
      const result = statistics.multiply(2);
      expect(result.kick).toBe(10);
      expect(result.control).toBe(10);
      expect(result.pressure).toBe(10);
      expect(result.physical).toBe(10);
      expect(result.agility).toBe(10);
      expect(result.intelligence).toBe(10);
      expect(result.technique).toBe(10);
      expect(result.total).toBe(10 * 7);
    });
  });
});
