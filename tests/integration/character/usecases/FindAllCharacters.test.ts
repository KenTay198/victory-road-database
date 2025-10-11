import FindAllCharacters from "@character/usecases/FindAllCharacters";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubCharacterService from "@infrastructure/character/stub/character.stub-service";
import StubMetaService from "@infrastructure/meta/stub/meta.stub-service";
import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";
import Meta from "@meta/meta.entity";
import Character from "@character/entities/character.entity";
import Hissatsu from "@hissatsu/hissatsu.entity";

describe("FindAllCharacters", () => {
  let characterService: StubCharacterService;
  let metaService: StubMetaService;
  let hissatsuService: StubHissatsuService;

  beforeEach(() => {
    characterService = new StubCharacterService();
    metaService = new StubMetaService();
    hissatsuService = new StubHissatsuService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful execution", () => {
    it("should return all characters", async () => {
      // act
      const characters = await new FindAllCharacters({ characterService }).execute();
      // assert
      expect(Array.isArray(characters)).toBe(true);
      expect(characters.length).toBeGreaterThan(0);
      expect(characters[0]).toBeInstanceOf(Character);
    });

    it("should return all characters with meta and archetypes", async () => {
      // arrange
      const meta = new Meta({ initialized: true });
      vi.spyOn(metaService, "get").mockResolvedValue(meta);
      // act
      const characters = await new FindAllCharacters({ characterService, metaService }).execute();
      // assert
      expect(Array.isArray(characters)).toBe(true);
      expect(characters.length).toBeGreaterThan(0);
      expect(characters[0].archetypes).toBeDefined();
      expect(Array.isArray(characters[0].archetypes)).toBe(true);
    });

    it("should return all characters with hissatsus", async () => {
      // act
      const characters = await new FindAllCharacters({ characterService, hissatsuService }).execute();
      // assert
      expect(Array.isArray(characters)).toBe(true);
      expect(characters.length).toBeGreaterThan(0);
      expect(characters[0].hissatsus).toBeDefined();
      expect(characters[0].hissatsus[0]).toBeInstanceOf(Hissatsu);
      expect(Array.isArray(characters[0].hissatsus)).toBe(true);
    });
  });

  describe("Edge cases", () => {
    it("should handle empty character list", async () => {
      // arrange
      vi.spyOn(characterService, "findAll").mockResolvedValue([]);
      // act
      const characters = await new FindAllCharacters({ characterService }).execute();
      // assert
      expect(characters).toEqual([]);
    });
  });

  describe("Error handling", () => {
    it("should throw error when character service fails", async () => {
      vi.spyOn(characterService, "findAll").mockRejectedValue(new Error("Database connection failed"));
      const useCase = new FindAllCharacters({ characterService });
      await expect(useCase.execute()).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Database connection failed" }),
      );
    });

    it("should throw error when meta service fails", async () => {
      vi.spyOn(metaService, "get").mockRejectedValue(new Error("Meta service down"));
      const useCase = new FindAllCharacters({ characterService, metaService });
      await expect(useCase.execute()).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Meta service down" }),
      );
    });

    it("should throw error when hissatsu service fails", async () => {
      vi.spyOn(hissatsuService, "findAll").mockRejectedValue(new Error("Hissatsu service down"));
      const useCase = new FindAllCharacters({ characterService, hissatsuService });
      await expect(useCase.execute()).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Hissatsu service down" }),
      );
    });
  });
});
