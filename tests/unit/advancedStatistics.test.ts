import { describe, it, expect } from "vitest";
import AdvancedStatistics from "@character/entities/advancedStatistics.entity";

describe("AdvancedStatistics Entity", () => {
  const advancedStatistics = new AdvancedStatistics({
    shoot: 5,
    focusAtt: 5,
    scrambleAtt: 5,
    faceoffAtt: 10,
    totalAtt: 15,
    wall: 5,
    focusDef: 5,
    scrambleDef: 5,
    faceoffDef: 10,
    totalDef: 15,
    gk: 5,
  });

  describe("initialize", () => {
    it("should initialize all properties to a given value", () => {
      const stats = AdvancedStatistics.initialize(7);
      expect(stats.shoot).toBe(7);
      expect(stats.focusAtt).toBe(7);
      expect(stats.scrambleAtt).toBe(7);
      expect(stats.faceoffAtt).toBe(7 * 2);
      expect(stats.totalAtt).toBe(7 * 3);
      expect(stats.wall).toBe(7);
      expect(stats.focusDef).toBe(7);
      expect(stats.scrambleDef).toBe(7);
      expect(stats.faceoffDef).toBe(7 * 2);
      expect(stats.totalDef).toBe(7 * 3);
      expect(stats.gk).toBe(7);
    });
  });

  describe("add", () => {
    it("should calculate the sum of every property between two instances", () => {
      const otherStats = AdvancedStatistics.initialize(10);
      const sumStats = advancedStatistics.add(otherStats);
      expect(sumStats.shoot).toBe(15);
      expect(sumStats.focusAtt).toBe(15);
      expect(sumStats.scrambleAtt).toBe(15);
      expect(sumStats.faceoffAtt).toBe(15 * 2);
      expect(sumStats.totalAtt).toBe(15 * 3);
      expect(sumStats.wall).toBe(15);
      expect(sumStats.focusDef).toBe(15);
      expect(sumStats.scrambleDef).toBe(15);
      expect(sumStats.faceoffDef).toBe(15 * 2);
      expect(sumStats.totalDef).toBe(15 * 3);
      expect(sumStats.gk).toBe(15);
    });
  });

  describe("mean", () => {
    it("should calculate the mean of every property between two instances", () => {
      const otherStats = AdvancedStatistics.initialize(10);
      const meanStats = advancedStatistics.mean(otherStats);
      expect(meanStats.shoot).toBe(7.5);
      expect(meanStats.focusAtt).toBe(7.5);
      expect(meanStats.scrambleAtt).toBe(7.5);
      expect(meanStats.faceoffAtt).toBe(7.5 * 2);
      expect(meanStats.totalAtt).toBe(7.5 * 3);
      expect(meanStats.wall).toBe(7.5);
      expect(meanStats.focusDef).toBe(7.5);
      expect(meanStats.scrambleDef).toBe(7.5);
      expect(meanStats.faceoffDef).toBe(7.5 * 2);
      expect(meanStats.totalDef).toBe(7.5 * 3);
      expect(meanStats.gk).toBe(7.5);
    });
  });

  describe("multiply", () => {
    it("should calculate the product of every property multiplied by a given factor", () => {
      const productStats = advancedStatistics.multiply(2);
      expect(productStats.shoot).toBe(10);
      expect(productStats.focusAtt).toBe(10);
      expect(productStats.scrambleAtt).toBe(10);
      expect(productStats.faceoffAtt).toBe(10 * 2);
      expect(productStats.totalAtt).toBe(10 * 3);
      expect(productStats.wall).toBe(10);
      expect(productStats.focusDef).toBe(10);
      expect(productStats.scrambleDef).toBe(10);
      expect(productStats.faceoffDef).toBe(10 * 2);
      expect(productStats.totalDef).toBe(10 * 3);
      expect(productStats.gk).toBe(10);
    });
  });
});
