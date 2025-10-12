import CreateHissatsus from "@hissatsu/usecases/CreateHissatsus";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";
import FakeHissatsu from "../../../entities/hissatsus/hissatsu.fake";
import type { IHissatsuData } from "@hissatsu/hissatsu.types";

describe("CreateHissatsus", () => {
  let hissatsuService: StubHissatsuService;

  beforeEach(() => {
    hissatsuService = new StubHissatsuService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful execution", () => {
    it("should create hissatsus and return array of IDs", async () => {
      // arrange
      const hissatsuData = [new FakeHissatsu().toJSON()];
      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple").mockResolvedValue(["id1"]);
      // act
      const ids = await new CreateHissatsus(hissatsuService).execute(hissatsuData);
      // assert
      expect(Array.isArray(ids)).toBe(true);
      expect(ids.length).toBe(1);
      expect(ids[0]).toBe("id1");
      expect(createMultipleSpy).toHaveBeenCalledOnce();
    });

    it("should create multiple hissatsus", async () => {
      // arrange
      const hissatsusData = [new FakeHissatsu().toJSON(), new FakeHissatsu({ name: "Second Hissatsu" }).toJSON()];
      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple").mockResolvedValue(["id1", "id2"]);
      // act
      const ids = await new CreateHissatsus(hissatsuService).execute(hissatsusData);
      // assert
      expect(ids.length).toBe(2);
      expect(ids).toEqual(["id1", "id2"]);
      expect(createMultipleSpy).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ name: expect.any(String) }),
          expect.objectContaining({ name: "Second Hissatsu" }),
        ]),
      );
    });

    it("should call service with validated data", async () => {
      // arrange
      const hissatsuData = [new FakeHissatsu().toJSON()];
      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple").mockResolvedValue(["id1"]);
      // act
      await new CreateHissatsus(hissatsuService).execute(hissatsuData);
      // assert
      expect(createMultipleSpy).toHaveBeenCalledWith([
        expect.objectContaining({
          name: hissatsuData[0].name,
          element: hissatsuData[0].element,
          type: hissatsuData[0].type,
          power: hissatsuData[0].power,
          cost: hissatsuData[0].cost,
        }),
      ]);
    });
  });

  describe("Input validation", () => {
    it("should throw error for missing name", async () => {
      // arrange
      const invalidData = [{ ...new FakeHissatsu().toJSON(), name: "" }];
      const useCase = new CreateHissatsus(hissatsuService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for missing required locale names", async () => {
      // arrange
      const invalidData = [
        {
          ...new FakeHissatsu().toJSON(),
          names: { fr: "", en: "Test", jp: "テスト" },
        },
      ];
      const useCase = new CreateHissatsus(hissatsuService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for invalid power values", async () => {
      // arrange
      const invalidData = [{ ...new FakeHissatsu().toJSON(), power: -1 }];
      const useCase = new CreateHissatsus(hissatsuService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for power values above max", async () => {
      // arrange
      const invalidData = [{ ...new FakeHissatsu().toJSON(), power: 10000 }];
      const useCase = new CreateHissatsus(hissatsuService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for invalid cost values", async () => {
      // arrange
      const invalidData = [{ ...new FakeHissatsu().toJSON(), cost: -1 }];
      const useCase = new CreateHissatsus(hissatsuService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for cost values above max", async () => {
      // arrange
      const invalidData = [{ ...new FakeHissatsu().toJSON(), cost: 10000 }];
      const useCase = new CreateHissatsus(hissatsuService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for invalid element", async () => {
      // arrange
      const invalidData = [{ ...new FakeHissatsu().toJSON(), element: "invalid" as any }];
      const useCase = new CreateHissatsus(hissatsuService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for invalid type", async () => {
      // arrange
      const invalidData = [{ ...new FakeHissatsu().toJSON(), type: "invalid" as any }];
      const useCase = new CreateHissatsus(hissatsuService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });
  });

  describe("Edge cases", () => {
    it("should handle empty hissatsus array", async () => {
      // arrange
      const emptyData: IHissatsuData[] = [];
      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple").mockResolvedValue([]);
      // act
      const ids = await new CreateHissatsus(hissatsuService).execute(emptyData);
      // assert
      expect(ids).toEqual([]);
      expect(createMultipleSpy).toHaveBeenCalledWith([]);
    });

    it("should handle hissatsu without optional characteristic", async () => {
      // arrange
      const hissatsuData = [{ ...new FakeHissatsu().toJSON(), characteristic: undefined }];
      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple").mockResolvedValue(["id1"]);
      // act
      const ids = await new CreateHissatsus(hissatsuService).execute(hissatsuData);
      // assert
      expect(ids).toEqual(["id1"]);
      expect(createMultipleSpy).toHaveBeenCalledWith([
        expect.objectContaining({
          characteristic: undefined,
        }),
      ]);
    });

    it("should trim whitespace from names", async () => {
      // arrange
      const hissatsuData = [
        {
          ...new FakeHissatsu().toJSON(),
          name: "  Test  ",
          names: {
            fr: "  Français  ",
            en: "  English  ",
            jp: "  日本語  ",
          },
        },
      ];
      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple").mockResolvedValue(["id1"]);
      // act
      await new CreateHissatsus(hissatsuService).execute(hissatsuData);
      // assert
      expect(createMultipleSpy).toHaveBeenCalledWith([
        expect.objectContaining({
          name: "Test",
          names: {
            fr: "Français",
            en: "English",
            jp: "日本語",
          },
        }),
      ]);
    });
  });

  describe("Error handling", () => {
    it("should throw error when hissatsu service fails", async () => {
      // arrange
      const hissatsuData = [new FakeHissatsu().toJSON()];
      vi.spyOn(hissatsuService, "createMultiple").mockRejectedValue(new Error("Database error"));
      const useCase = new CreateHissatsus(hissatsuService);
      // act & assert
      await expect(useCase.execute(hissatsuData)).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Database error" }),
      );
    });
  });
});
