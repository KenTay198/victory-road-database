import EnsureHissatsusExist from "@hissatsu/usecases/EnsureHissatsusExists";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";
import FakeHissatsu from "../../../entities/hissatsus/hissatsu.fake";
import type { ICreateLearnedHissatsu } from "@hissatsu/hissatsu.types";

describe("EnsureHissatsusExist", () => {
  let hissatsuService: StubHissatsuService;

  beforeEach(() => {
    hissatsuService = new StubHissatsuService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful execution", () => {
    it("should return existing hissatsus without creating new ones", async () => {
      // arrange
      const existingHissatsus: ICreateLearnedHissatsu[] = [
        { id: "existing1", learnLevel: 1 },
        { id: "existing2", learnLevel: 5 },
      ];
      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple");
      // act
      const result = await new EnsureHissatsusExist(hissatsuService).execute(existingHissatsus);
      // assert
      expect(result).toEqual([
        { id: "existing1", learnLevel: 1 },
        { id: "existing2", learnLevel: 5 },
      ]);
      expect(createMultipleSpy).not.toHaveBeenCalled();
    });

    it("should create new hissatsus and return updated array", async () => {
      // arrange
      const hissatsusData: ICreateLearnedHissatsu[] = [
        { ...new FakeHissatsu().toJSON(), learnLevel: 1, create: true },
        { ...new FakeHissatsu({ name: "Second Hissatsu" }).toJSON(), learnLevel: 3, create: true },
      ];
      delete hissatsusData[0].id;
      delete hissatsusData[1].id;

      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple").mockResolvedValue(["new1", "new2"]);
      // act
      const result = await new EnsureHissatsusExist(hissatsuService).execute(hissatsusData);
      // assert
      expect(result).toEqual([
        { id: "new1", learnLevel: 1 },
        { id: "new2", learnLevel: 3 },
      ]);
      expect(createMultipleSpy).toHaveBeenCalledOnce();
      expect(createMultipleSpy).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ name: expect.any(String) }),
          expect.objectContaining({ name: "Second Hissatsu" }),
        ]),
      );
    });

    it("should handle mixed existing and new hissatsus", async () => {
      // arrange
      const mixedHissatsus: ICreateLearnedHissatsu[] = [
        { id: "existing1", learnLevel: 1 },
        { ...new FakeHissatsu().toJSON(), learnLevel: 2, create: true },
      ];
      delete mixedHissatsus[1].id;

      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple").mockResolvedValue(["new1"]);
      // act
      const result = await new EnsureHissatsusExist(hissatsuService).execute(mixedHissatsus);
      // assert
      expect(result).toEqual([
        { id: "existing1", learnLevel: 1 },
        { id: "new1", learnLevel: 2 },
      ]);
      expect(createMultipleSpy).toHaveBeenCalledOnce();
    });

    it("should clean create flag from existing hissatsus", async () => {
      // arrange
      const hissatsusData: ICreateLearnedHissatsu[] = [
        { id: "existing1", learnLevel: 1 },
        { id: "existing2", learnLevel: 3 },
      ];
      const hissatsusWithFlags: ICreateLearnedHissatsu[] = hissatsusData;
      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple");
      // act
      const result = await new EnsureHissatsusExist(hissatsuService).execute(hissatsusWithFlags);
      // assert
      expect(result).toEqual([
        { id: "existing1", learnLevel: 1 },
        { id: "existing2", learnLevel: 3 },
      ]);
      expect(createMultipleSpy).not.toHaveBeenCalled();
      for (const h of result) {
        expect(h).not.toHaveProperty("create");
      }
    });
  });

  describe("Edge cases", () => {
    it("should handle empty hissatsus array", async () => {
      // arrange
      const emptyHissatsus: ICreateLearnedHissatsu[] = [];
      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple");
      // act
      const result = await new EnsureHissatsusExist(hissatsuService).execute(emptyHissatsus);
      // assert
      expect(result).toEqual([]);
      expect(createMultipleSpy).not.toHaveBeenCalled();
    });

    it("should handle hissatsus without ID but without create flag", async () => {
      // arrange
      const hissatsusData: ICreateLearnedHissatsu[] = [
        { ...new FakeHissatsu().toJSON(), learnLevel: 1 }, // No ID, no create flag
      ];
      delete hissatsusData[0].id;

      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple").mockResolvedValue(["new1"]);
      // act
      const result = await new EnsureHissatsusExist(hissatsuService).execute(hissatsusData);
      // assert
      expect(result).toEqual([{ id: "new1", learnLevel: 1 }]);
      expect(createMultipleSpy).toHaveBeenCalledOnce();
    });

    it("should preserve order of hissatsus", async () => {
      // arrange
      const hissatsusData: ICreateLearnedHissatsu[] = [
        { id: "existing1", learnLevel: 1 },
        { ...new FakeHissatsu().toJSON(), learnLevel: 2, create: true },
        { id: "existing2", learnLevel: 3 },
        { ...new FakeHissatsu({ name: "Another" }).toJSON(), learnLevel: 4, create: true },
      ];
      delete hissatsusData[1].id;
      delete hissatsusData[3].id;

      vi.spyOn(hissatsuService, "createMultiple").mockResolvedValue(["new1", "new2"]);
      // act
      const result = await new EnsureHissatsusExist(hissatsuService).execute(hissatsusData);
      // assert
      expect(result).toEqual([
        { id: "existing1", learnLevel: 1 },
        { id: "new1", learnLevel: 2 },
        { id: "existing2", learnLevel: 3 },
        { id: "new2", learnLevel: 4 },
      ]);
    });
  });

  describe("Error handling", () => {
    it("should throw error when hissatsu creation fails", async () => {
      // arrange
      const hissatsusData: ICreateLearnedHissatsu[] = [{ ...new FakeHissatsu().toJSON(), learnLevel: 1, create: true }];
      delete hissatsusData[0].id;

      vi.spyOn(hissatsuService, "createMultiple").mockRejectedValue(new Error("Creation failed"));
      const useCase = new EnsureHissatsusExist(hissatsuService);
      // act & assert
      await expect(useCase.execute(hissatsusData)).rejects.toThrow("Creation failed");
    });
  });
});
