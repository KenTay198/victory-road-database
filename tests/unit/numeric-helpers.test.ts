import NumericHelpers from "@utils/helpers/numeric.helpers";
import { describe, expect, it } from "vitest";

describe("NumericHelpers", () => {
  describe("calculateStatsDescriptions", () => {
    it.each([
      { data: [1, 2, 3, 4, 5], expectedMean: 3, expectedStdv: Math.sqrt(2) },
      { data: [5, 5, 5, 5, 5], expectedMean: 5, expectedStdv: 0 },
      { data: [1, 3, 5, 7, 9], expectedMean: 5, expectedStdv: Math.sqrt(8) },
    ])("should calculate mean and standard deviation correctly", ({ data, expectedMean, expectedStdv }) => {
      const result = NumericHelpers.calculateStatsDescriptions(data);
      expect(result.mean).toBe(expectedMean);
      expect(result.stdv).toBe(expectedStdv);
    });
  });
});
