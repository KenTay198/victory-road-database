import FindLearnedHissatsus from "@hissatsu/usecases/FindLearnedHissatsus";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";
import Hissatsu from "@hissatsu/hissatsu.entity";
import FakeHissatsu from "../../../entities/hissatsus/hissatsu.fake";
import type { ILearnedHissatsu } from "@character/character.types";

describe("FindLearnedHissatsus", () => {
  let hissatsuService: StubHissatsuService;

  beforeEach(() => {
    hissatsuService = new StubHissatsuService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful execution", () => {
    it("should return learned hissatsus", async () => {
      // arrange
      const learnedHissatsus: ILearnedHissatsu[] = [
        { id: "hissatsu1", learnLevel: 1 },
        { id: "hissatsu2", learnLevel: 5 },
      ];
      const mockHissatsus = [
        new FakeHissatsu({ id: "hissatsu1", name: "Fire Tornado" }),
        new FakeHissatsu({ id: "hissatsu2", name: "Ice Shot" }),
      ];
      vi.spyOn(hissatsuService, "findLearnedHissatsus").mockResolvedValue(mockHissatsus);
      // act
      const hissatsus = await new FindLearnedHissatsus(hissatsuService, learnedHissatsus).execute();
      // assert
      expect(Array.isArray(hissatsus)).toBe(true);
      expect(hissatsus.length).toBeGreaterThan(0);
      expect(hissatsus[0]).toBeInstanceOf(Hissatsu);
    });

    it("should call hissatsu service findLearnedHissatsus with correct parameters", async () => {
      // arrange
      const learnedHissatsus: ILearnedHissatsu[] = [
        { id: "hissatsu1", learnLevel: 1 },
        { id: "hissatsu2", learnLevel: 5 },
      ];
      const findLearnedHissatsusSpy = vi.spyOn(hissatsuService, "findLearnedHissatsus");
      // act
      await new FindLearnedHissatsus(hissatsuService, learnedHissatsus).execute();
      // assert
      expect(findLearnedHissatsusSpy).toHaveBeenCalledOnce();
      expect(findLearnedHissatsusSpy).toHaveBeenCalledWith(learnedHissatsus);
    });

    it("should return hissatsus with correct IDs", async () => {
      // arrange
      const learnedHissatsus: ILearnedHissatsu[] = [
        { id: "hissatsu1", learnLevel: 1 },
        { id: "hissatsu2", learnLevel: 5 },
      ];
      const mockHissatsus = [
        new FakeHissatsu({ id: "hissatsu1", name: "Fire Tornado" }),
        new FakeHissatsu({ id: "hissatsu2", name: "Ice Shot" }),
      ];
      vi.spyOn(hissatsuService, "findLearnedHissatsus").mockResolvedValue(mockHissatsus);
      // act
      const hissatsus = await new FindLearnedHissatsus(hissatsuService, learnedHissatsus).execute();
      // assert
      const hissatsuIds = hissatsus.map((h) => h.id);
      expect(hissatsuIds).toContain("hissatsu1");
      expect(hissatsuIds).toContain("hissatsu2");
    });
  });

  describe("Edge cases", () => {
    it("should handle empty learned hissatsus list", async () => {
      // arrange
      const learnedHissatsus: ILearnedHissatsu[] = [];
      vi.spyOn(hissatsuService, "findLearnedHissatsus").mockResolvedValue([]);
      // act
      const hissatsus = await new FindLearnedHissatsus(hissatsuService, learnedHissatsus).execute();
      // assert
      expect(hissatsus).toEqual([]);
    });

    it("should handle single learned hissatsu", async () => {
      // arrange
      const learnedHissatsus: ILearnedHissatsu[] = [{ id: "hissatsu1", learnLevel: 1 }];
      const mockHissatsus = [new FakeHissatsu({ id: "hissatsu1", name: "Fire Tornado" })];
      vi.spyOn(hissatsuService, "findLearnedHissatsus").mockResolvedValue(mockHissatsus);
      // act
      const hissatsus = await new FindLearnedHissatsus(hissatsuService, learnedHissatsus).execute();
      // assert
      expect(hissatsus.length).toBe(1);
      expect(hissatsus[0].id).toBe("hissatsu1");
    });

    it("should handle different learn levels", async () => {
      // arrange
      const learnedHissatsus: ILearnedHissatsu[] = [
        { id: "hissatsu1", learnLevel: 1 },
        { id: "hissatsu2", learnLevel: 99 },
      ];
      const mockHissatsus = [
        new FakeHissatsu({ id: "hissatsu1", name: "Fire Tornado" }),
        new FakeHissatsu({ id: "hissatsu2", name: "Ice Shot" }),
      ];
      vi.spyOn(hissatsuService, "findLearnedHissatsus").mockResolvedValue(mockHissatsus);
      // act
      const hissatsus = await new FindLearnedHissatsus(hissatsuService, learnedHissatsus).execute();
      // assert
      expect(hissatsus.length).toBeGreaterThan(0);
      expect(hissatsus).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: "hissatsu1" }),
          expect.objectContaining({ id: "hissatsu2" }),
        ]),
      );
    });
  });

  describe("Error handling", () => {
    it("should throw error when hissatsu service fails", async () => {
      // arrange
      const learnedHissatsus: ILearnedHissatsu[] = [{ id: "hissatsu1", learnLevel: 1 }];
      vi.spyOn(hissatsuService, "findLearnedHissatsus").mockRejectedValue(new Error("Database connection failed"));
      const useCase = new FindLearnedHissatsus(hissatsuService, learnedHissatsus);
      // act & assert
      await expect(useCase.execute()).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Database connection failed" }),
      );
    });

    it("should throw error when hissatsu not found", async () => {
      // arrange
      const learnedHissatsus: ILearnedHissatsu[] = [{ id: "nonexistent", learnLevel: 1 }];
      vi.spyOn(hissatsuService, "findLearnedHissatsus").mockRejectedValue(new Error("Hissatsu not found"));
      const useCase = new FindLearnedHissatsus(hissatsuService, learnedHissatsus);
      // act & assert
      await expect(useCase.execute()).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Hissatsu not found" }),
      );
    });
  });
});
