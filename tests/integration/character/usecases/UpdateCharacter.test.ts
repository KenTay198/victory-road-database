import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubCharacterService from "@infrastructure/character/stub/character.stub-service";
import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";
import UpdateCharacter from "@character/usecases/UpdateCharacter";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import type ICharacterService from "@character/character.service";
import FakeCharacter from "../../../entities/character/character.fake";
import FakeHissatsu from "../../../entities/hissatsus/hissatsu.fake";
import { ICreateLearnedHissatsu } from "@hissatsu/hissatsu.types";

describe("UpdateCharacter", () => {
  let characterService: ICharacterService;
  let hissatsuService: IHissatsuService;

  beforeEach(() => {
    characterService = new StubCharacterService();
    hissatsuService = new StubHissatsuService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful execution", () => {
    it("should update character and return true", async () => {
      // arrange
      const characterData = new FakeCharacter().toJSON();
      const updateSpy = vi.spyOn(characterService, "updateById").mockResolvedValue(true);
      // act
      const result = await new UpdateCharacter({ characterService, hissatsuService }).execute("1", characterData);
      // assert
      expect(result).toBe(true);
      expect(updateSpy).toHaveBeenCalledOnce();
      expect(updateSpy).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({
          firstName: characterData.firstName,
          element: characterData.element,
        }),
      );
    });

    it("should update character with new hissatsus", async () => {
      // arrange
      const character = new FakeCharacter();
      const characterData = character.toJSON();
      const hissatsu: ICreateLearnedHissatsu = { ...new FakeHissatsu().toJSON(), learnLevel: 1, create: true };
      delete hissatsu.id;
      (characterData.learnedHissatsus as ICreateLearnedHissatsu[]) = [hissatsu];
      const createMultipleHissatsusSpy = vi.spyOn(hissatsuService, "createMultiple");
      // act
      const result = await new UpdateCharacter({ characterService, hissatsuService }).execute("1", characterData);
      // assert
      expect(result).toBe(true);
      expect(createMultipleHissatsusSpy).toHaveBeenCalledOnce();
    });

    it("should handle partial updates", async () => {
      // arrange
      const partialData = { firstName: "UpdatedName", learnedHissatsus: [] };
      const updateSpy = vi.spyOn(characterService, "updateById").mockResolvedValue(true);
      // act
      const result = await new UpdateCharacter({ characterService, hissatsuService }).execute("1", partialData as any);
      // assert
      expect(result).toBe(true);
      expect(updateSpy).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({
          firstName: "UpdatedName",
        }),
      );
    });
  });

  describe("Input validation", () => {
    it("should throw error for invalid statistics values", async () => {
      // arrange
      const invalidData = {
        statistics: { kick: -1, control: 50, pressure: 50, physical: 50, agility: 50, intelligence: 50, technique: 50 },
      };
      const useCase = new UpdateCharacter({ characterService, hissatsuService });
      // act & assert
      await expect(useCase.execute("1", invalidData as any)).rejects.toThrow();
    });

    it("should throw error for invalid imageUrl", async () => {
      // arrange
      const invalidData = { imageUrl: "not-a-url" };
      const useCase = new UpdateCharacter({ characterService, hissatsuService });
      // act & assert
      await expect(useCase.execute("1", invalidData as any)).rejects.toThrow();
    });

    it("should throw error for invalid hissatsu learnLevel", async () => {
      // arrange
      const invalidData = { learnedHissatsus: [{ id: "hissatsu1", learnLevel: 0 }] };
      const useCase = new UpdateCharacter({ characterService, hissatsuService });
      // act & assert
      await expect(useCase.execute("1", invalidData as any)).rejects.toThrow();
    });
  });

  describe("Edge cases", () => {
    it("should handle empty updates", async () => {
      // arrange
      const emptyData = { learnedHissatsus: [] };
      const updateSpy = vi.spyOn(characterService, "updateById").mockResolvedValue(true);
      // act
      const result = await new UpdateCharacter({ characterService, hissatsuService }).execute("1", emptyData as any);
      // assert
      expect(result).toBe(true);
      expect(updateSpy).toHaveBeenCalledWith("1", { learnedHissatsus: [] });
    });

    it("should handle character with no hissatsus", async () => {
      // arrange
      const characterData = { learnedHissatsus: [] };
      // act
      const result = await new UpdateCharacter({ characterService, hissatsuService }).execute(
        "1",
        characterData as any,
      );
      // assert
      expect(result).toBe(true);
    });

    it("should accept valid imageUrl", async () => {
      // arrange
      const characterData = { imageUrl: "https://example.com/image.jpg", learnedHissatsus: [] };
      // act
      const result = await new UpdateCharacter({ characterService, hissatsuService }).execute(
        "1",
        characterData as any,
      );
      // assert
      expect(result).toBe(true);
    });

    it("should accept empty imageUrl", async () => {
      // arrange
      const characterData = { imageUrl: "", learnedHissatsus: [] };
      // act
      const result = await new UpdateCharacter({ characterService, hissatsuService }).execute(
        "1",
        characterData as any,
      );
      // assert
      expect(result).toBe(true);
    });
  });

  describe("Error handling", () => {
    it("should throw error when character service fails", async () => {
      // arrange
      vi.spyOn(characterService, "updateById").mockRejectedValue(new Error("Database error"));
      const useCase = new UpdateCharacter({ characterService, hissatsuService });
      // act & assert
      await expect(useCase.execute("1", new FakeCharacter().toJSON())).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Database error" }),
      );
    });

    it("should throw error when hissatsu service fails", async () => {
      // arrange
      vi.spyOn(hissatsuService, "createMultiple").mockRejectedValue(new Error("Hissatsu creation failed"));
      const character = new FakeCharacter();
      const characterData = character.toJSON();
      const hissatsu: ICreateLearnedHissatsu = { ...new FakeHissatsu().toJSON(), learnLevel: 1, create: true };
      delete hissatsu.id;
      (characterData.learnedHissatsus as ICreateLearnedHissatsu[]) = [hissatsu];
      const useCase = new UpdateCharacter({ characterService, hissatsuService });
      // act & assert
      await expect(useCase.execute("1", characterData)).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Hissatsu creation failed" }),
      );
    });

    it("should return false when character not found", async () => {
      // arrange
      vi.spyOn(characterService, "updateById").mockResolvedValue(false);
      const useCase = new UpdateCharacter({ characterService, hissatsuService });
      // act
      const result = await useCase.execute("999", { firstName: "Test", learnedHissatsus: [] } as any);
      // assert
      expect(result).toBe(false);
    });
  });
});
