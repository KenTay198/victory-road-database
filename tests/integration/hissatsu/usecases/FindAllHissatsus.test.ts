import FindAllHissatsus from "@hissatsu/usecases/FindAllHissatsus";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";
import Hissatsu from "@hissatsu/hissatsu.entity";

describe("FindAllHissatsus", () => {
  let hissatsuService: StubHissatsuService;

  beforeEach(() => {
    hissatsuService = new StubHissatsuService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful execution", () => {
    it("should return all hissatsus", async () => {
      // act
      const hissatsus = await new FindAllHissatsus(hissatsuService).execute();
      // assert
      expect(Array.isArray(hissatsus)).toBe(true);
      expect(hissatsus.length).toBeGreaterThan(0);
      expect(hissatsus[0]).toBeInstanceOf(Hissatsu);
    });

    it("should call hissatsu service findAll", async () => {
      // arrange
      const findAllSpy = vi.spyOn(hissatsuService, "findAll");
      // act
      await new FindAllHissatsus(hissatsuService).execute();
      // assert
      expect(findAllSpy).toHaveBeenCalledOnce();
    });
  });

  describe("Edge cases", () => {
    it("should handle empty hissatsu list", async () => {
      // arrange
      vi.spyOn(hissatsuService, "findAll").mockResolvedValue([]);
      // act
      const hissatsus = await new FindAllHissatsus(hissatsuService).execute();
      // assert
      expect(hissatsus).toEqual([]);
    });
  });

  describe("Error handling", () => {
    it("should throw error when hissatsu service fails", async () => {
      // arrange
      vi.spyOn(hissatsuService, "findAll").mockRejectedValue(new Error("Database connection failed"));
      const useCase = new FindAllHissatsus(hissatsuService);
      // act & assert
      await expect(useCase.execute()).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Database connection failed" }),
      );
    });
  });
});
