import NumericHelpers from "@utils/helpers/numeric.helpers";
import { describe, expect, it } from "vitest";

describe("NumericHelpers", () => {
  describe("calculateStatsDescriptions", () => {
    it.each([
      { data: [1, 2, 3, 4, 5], expected: { mean: 3, highMean: 9 / 2, lowMean: 3 / 2 } },
      { data: [1, 3, 5, 7, 9], expected: { mean: 5, highMean: 16 / 2, lowMean: 4 / 2 } },
    ])("should calculate mean, high mean and low mean correctly", ({ data, expected }) => {
      const result = NumericHelpers.calculateStatsDescriptions(data);
      expect(result.mean).toBe(expected.mean);
      expect(result.highMean).toBe(expected.highMean);
      expect(result.lowMean).toBe(expected.lowMean);
    });
  });
});
