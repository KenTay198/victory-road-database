import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubCharacterService from "@infrastructure/character/stub/character.stub-service";
import StubMetaService from "@infrastructure/meta/stub/meta.stub-service";
import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";
import Character from "@character/entities/character.entity";
import Hissatsu from "@hissatsu/hissatsu.entity";
import CreateCharacter from "@character/usecases/CreateCharacter";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import type ICharacterService from "@character/character.service";
import FakeCharacter from "../../../entities/character/character.fake";
import FakeHissatsu from "../../../entities/hissatsus/hissatsu.fake";
import { ICreateLearnedHissatsu } from "@hissatsu/hissatsu.types";

describe("CreateCharacter", () => {
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
    it("should create and return an id", async () => {
      // arrange
      const character = new FakeCharacter();
      // act
      const id = await new CreateCharacter({ characterService, hissatsuService }).execute(character.toJSON());
      // assert
      expect(id).toBeTruthy();
    });

    it("should create hissatsus not already created", async () => {
      // arrange
      const character = new FakeCharacter();
      const characterData = character.toJSON();
      const hissatsu: ICreateLearnedHissatsu = { ...new FakeHissatsu().toJSON(), learnLevel: 1, create: true };
      delete hissatsu.id;
      (characterData.learnedHissatsus as ICreateLearnedHissatsu[]) = [hissatsu];
      const createMultipleHissatsusSpy = vi.spyOn(hissatsuService, "createMultiple");
      // act
      const id = await new CreateCharacter({ characterService, hissatsuService }).execute(characterData);
      // assert
      expect(id).toBeTruthy();
      expect(createMultipleHissatsusSpy).toHaveBeenCalledOnce();
    });

    it("should call character service create with validated data", async () => {
      // arrange
      const characterData = new FakeCharacter().toJSON();
      const createSpy = vi.spyOn(characterService, "create").mockResolvedValue("new-id");
      // act
      await new CreateCharacter({ characterService, hissatsuService }).execute(characterData);
      // assert
      expect(createSpy).toHaveBeenCalledOnce();
      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: characterData.firstName,
          element: characterData.element,
          defaultPosition: characterData.defaultPosition,
        }),
      );
    });
  });

  describe("Input validation", () => {
    it("should throw error for missing firstName", async () => {
      // arrange
      const invalidData = { ...new FakeCharacter().toJSON(), firstName: "" };
      const useCase = new CreateCharacter({ characterService, hissatsuService });
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for invalid statistics values", async () => {
      // arrange
      const invalidData = {
        ...new FakeCharacter().toJSON(),
        statistics: { ...new FakeCharacter().toJSON().statistics, kick: -1 },
      };
      const useCase = new CreateCharacter({ characterService, hissatsuService });
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for statistics values above max", async () => {
      // arrange
      const invalidData = {
        ...new FakeCharacter().toJSON(),
        statistics: { ...new FakeCharacter().toJSON().statistics, kick: 1000 },
      };
      const useCase = new CreateCharacter({ characterService, hissatsuService });
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for invalid imageUrl", async () => {
      // arrange
      const invalidData = { ...new FakeCharacter().toJSON(), imageUrl: "not-a-url" };
      const useCase = new CreateCharacter({ characterService, hissatsuService });
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for invalid hissatsu learnLevel", async () => {
      // arrange
      const invalidData = {
        ...new FakeCharacter().toJSON(),
        learnedHissatsus: [{ id: "hissatsu1", learnLevel: 0 }],
      };
      const useCase = new CreateCharacter({ characterService, hissatsuService });
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });
  });

  describe("Edge cases", () => {
    it("should handle character with no hissatsus", async () => {
      // arrange
      const characterData = { ...new FakeCharacter().toJSON(), learnedHissatsus: [] };
      // act
      const id = await new CreateCharacter({ characterService, hissatsuService }).execute(characterData);
      // assert
      expect(id).toBeTruthy();
    });

    it("should handle optional fields correctly", async () => {
      // arrange
      const characterData = { ...new FakeCharacter().toJSON(), lastName: undefined, imageUrl: "" };
      // act
      const id = await new CreateCharacter({ characterService, hissatsuService }).execute(characterData);
      // assert
      expect(id).toBeTruthy();
    });

    it("should accept valid imageUrl", async () => {
      // arrange
      const characterData = { ...new FakeCharacter().toJSON(), imageUrl: "https://example.com/image.jpg" };
      // act
      const id = await new CreateCharacter({ characterService, hissatsuService }).execute(characterData);
      // assert
      expect(id).toBeTruthy();
    });
  });

  describe("Error handling", () => {
    it("should throw error when character service fails", async () => {
      vi.spyOn(characterService, "create").mockRejectedValue(new Error("Database error"));
      const useCase = new CreateCharacter({ characterService, hissatsuService });

      await expect(useCase.execute(new FakeCharacter().toJSON())).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Database error" }),
      );
    });

    it("should throw error when hissatsu service fails", async () => {
      // arrange
      const character = new FakeCharacter();
      const characterData = character.toJSON();
      const hissatsu: ICreateLearnedHissatsu = { ...new FakeHissatsu().toJSON(), learnLevel: 1, create: true };
      delete hissatsu.id;
      (characterData.learnedHissatsus as ICreateLearnedHissatsu[]) = [hissatsu];
      vi.spyOn(hissatsuService, "createMultiple").mockRejectedValue(new Error("Hissatsu creation failed"));
      const useCase = new CreateCharacter({ characterService, hissatsuService });
      // act & assert
      await expect(useCase.execute(characterData)).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Hissatsu creation failed" }),
      );
    });
  });
});
