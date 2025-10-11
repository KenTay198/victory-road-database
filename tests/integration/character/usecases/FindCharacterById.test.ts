import FindCharacterById from "@character/usecases/FindCharacterById";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubCharacterService from "@infrastructure/character/stub/character.stub-service";
import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";
import StubMetaService from "@infrastructure/meta/stub/meta.stub-service";
import Character from "@character/entities/character.entity";
import Meta from "@meta/meta.entity";

describe("FindCharacterById", () => {
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
    it("should return a character when ID exists", async () => {
      // act
      const character = await new FindCharacterById({ characterService }).execute("1");
      // assert
      expect(character).toBeTruthy();
      expect(character).toBeInstanceOf(Character);
      expect(character?.id).toBe("1");
    });

    it("should return character with archetypes when meta service is provided", async () => {
      // arrange
      const meta = new Meta({ initialized: true });
      const getMetaSpy = vi.spyOn(metaService, "get").mockResolvedValue(meta);
      // act
      const character = await new FindCharacterById({ characterService, metaService }).execute("1");
      // assert
      expect(character).toBeTruthy();
      expect(character?.id).toBe("1");
      expect(character?.archetypes).toBeDefined();
      expect(getMetaSpy).toHaveBeenCalledOnce();
      expect(Array.isArray(character?.archetypes)).toBe(true);
      expect(character?.archetypes?.length).toBeGreaterThan(0);
    });

    it("should return character with hissatsus when hissatsu service is provided", async () => {
      // arrange
      const findLearnedHissatsusSpy = vi.spyOn(hissatsuService, "findLearnedHissatsus");
      // act
      const character = await new FindCharacterById({ characterService, hissatsuService }).execute("1");
      // assert
      expect(character).toBeTruthy();
      expect(character?.id).toBe("1");
      expect(character?.hissatsus).toBeDefined();
      expect(findLearnedHissatsusSpy).toHaveBeenCalledOnce();
      expect(Array.isArray(character?.hissatsus)).toBe(true);
      expect(character?.hissatsus?.length).toBe(character?.learnedHissatsus.length);
    });

    it("should return character with both meta and hissatsus when both services provided", async () => {
      // arrange
      const meta = new Meta({ initialized: true });
      const getMetaSpy = vi.spyOn(metaService, "get").mockResolvedValue(meta);
      const findLearnedHissatsusSpy = vi.spyOn(hissatsuService, "findLearnedHissatsus");
      // act
      const character = await new FindCharacterById({ characterService, metaService, hissatsuService }).execute("1");
      // assert
      expect(character).toBeTruthy();
      expect(getMetaSpy).toHaveBeenCalledOnce();
      expect(findLearnedHissatsusSpy).toHaveBeenCalledOnce();
      expect(character?.archetypes).toBeDefined();
      expect(character?.hissatsus).toBeDefined();
    });
  });

  describe("Not found cases", () => {
    it("should return null when character does not exist", async () => {
      const character = await new FindCharacterById({ characterService }).execute("999");
      expect(character).toBe(null);
    });

    it("should return null for invalid ID format", async () => {
      const character = await new FindCharacterById({ characterService }).execute("");
      expect(character).toBe(null);
    });
  });

  describe("Input validation", () => {
    it.each([
      { id: "1", description: "valid numeric ID" },
      { id: "abc123", description: "valid alphanumeric ID" },
      { id: "507f1f77bcf86cd799439011", description: "valid MongoDB ObjectId" },
    ])("should handle $description correctly", async ({ id }) => {
      const character = await new FindCharacterById({ characterService }).execute(id);
      expect(() => character).not.toThrow();
    });
  });

  describe("Error handling", () => {
    it("should throw error when character service fails", async () => {
      vi.spyOn(characterService, "findById").mockRejectedValue(new Error("Database connection failed"));

      const useCase = new FindCharacterById({ characterService });

      await expect(useCase.execute("1")).rejects.toThrow("Database connection failed");
    });

    it("should throw error when meta service fails", async () => {
      vi.spyOn(metaService, "get").mockRejectedValue(new Error("Meta service down"));

      const useCase = new FindCharacterById({ characterService, metaService });

      await expect(useCase.execute("1")).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Meta service down" }),
      );
    });

    it("should throw error when hissatsu service fails", async () => {
      vi.spyOn(hissatsuService, "findLearnedHissatsus").mockRejectedValue(new Error("Hissatsu service down"));

      const useCase = new FindCharacterById({ characterService, hissatsuService });

      await expect(useCase.execute("1")).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Hissatsu service down" }),
      );
    });
  });

  describe("Edge cases", () => {
    it("should handle null ID gracefully", async () => {
      const character = await new FindCharacterById({ characterService }).execute(null as any);
      expect(character).toBe(null);
    });

    it("should handle undefined ID gracefully", async () => {
      const character = await new FindCharacterById({ characterService }).execute(undefined as any);
      expect(character).toBe(null);
    });

    it("should handle character with no learned hissatsus", async () => {
      vi.spyOn(characterService, "findById").mockResolvedValue(
        new Character({
          id: "1",
          firstName: "Test",
          lastName: "Character",
          element: "fire",
          defaultPosition: "forward",
          statistics: {
            kick: 50,
            control: 50,
            pressure: 50,
            physical: 50,
            agility: 50,
            intelligence: 50,
            technique: 50,
          },
          learnedHissatsus: [],
        } as any),
      );

      const character = await new FindCharacterById({ characterService, hissatsuService }).execute("1");

      expect(character).toBeTruthy();
      expect(character?.hissatsus).toEqual([]);
    });
  });
});
