import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubCharacterService from "@infrastructure/character/stub/character.stub-service";
import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";
import CreateCharacters from "@character/usecases/CreateCharacters";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import type ICharacterService from "@character/character.service";
import FakeCharacter from "../../../entities/character/character.fake";
import FakeHissatsu from "../../../entities/hissatsus/hissatsu.fake";
import type { ICreateLearnedHissatsu } from "@hissatsu/hissatsu.types";

describe("CreateCharacters", () => {
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
    it("should create multiple characters and return their ids", async () => {
      // arrange
      const character1 = new FakeCharacter();
      const character2 = new FakeCharacter();
      const charactersData = [character1.toJSON(), character2.toJSON()];
      
      const createMultipleSpy = vi.spyOn(characterService, "createMultiple").mockResolvedValue(["id1", "id2"]);

      // act
      const ids = await new CreateCharacters({ characterService, hissatsuService }).execute(charactersData);

      // assert
      expect(ids).toEqual(["id1", "id2"]);
      expect(createMultipleSpy).toHaveBeenCalledOnce();
    });

    it("should handle empty array", async () => {
      // arrange
      const charactersData: any[] = [];
      const createMultipleSpy = vi.spyOn(characterService, "createMultiple").mockResolvedValue([]);

      // act
      const ids = await new CreateCharacters({ characterService, hissatsuService }).execute(charactersData);

      // assert
      expect(ids).toEqual([]);
      expect(createMultipleSpy).toHaveBeenCalledWith([]);
    });

    it("should ensure hissatsus exist for all characters in a single batch", async () => {
      // arrange
      const fakeHissatsu1 = new FakeHissatsu();
      const fakeHissatsu2 = new FakeHissatsu();
      const fakeHissatsu3 = new FakeHissatsu();

      const character1 = new FakeCharacter();
      const character2 = new FakeCharacter();
      
      const charactersData = [character1.toJSON(), character2.toJSON()];
      
      // Add new hissatsus to characters
      const newHissatsu1: ICreateLearnedHissatsu = { ...fakeHissatsu1.toJSON(), learnLevel: 1, create: true };
      const newHissatsu2: ICreateLearnedHissatsu = { ...fakeHissatsu2.toJSON(), learnLevel: 2, create: true };
      const newHissatsu3: ICreateLearnedHissatsu = { ...fakeHissatsu3.toJSON(), learnLevel: 3, create: true };
      
      delete newHissatsu1.id;
      delete newHissatsu2.id;
      delete newHissatsu3.id;

      (charactersData[0].learnedHissatsus as ICreateLearnedHissatsu[]) = [newHissatsu1, newHissatsu2];
      (charactersData[1].learnedHissatsus as ICreateLearnedHissatsu[]) = [newHissatsu3];

      const createMultipleHissatsusSpy = vi.spyOn(hissatsuService, "createMultiple").mockResolvedValue(["hiss-id1", "hiss-id2", "hiss-id3"]);
      const createMultipleCharactersSpy = vi.spyOn(characterService, "createMultiple").mockResolvedValue(["char-id1", "char-id2"]);

      // act
      const ids = await new CreateCharacters({ characterService, hissatsuService }).execute(charactersData);

      // assert
      expect(ids).toEqual(["char-id1", "char-id2"]);
      
      // Verify hissatsus were created in batch
      expect(createMultipleHissatsusSpy).toHaveBeenCalledOnce();
      expect(createMultipleHissatsusSpy).toHaveBeenCalledWith([
        expect.objectContaining({ name: fakeHissatsu1.name }),
        expect.objectContaining({ name: fakeHissatsu2.name }),
        expect.objectContaining({ name: fakeHissatsu3.name }),
      ]);

      // Verify characters were created with resolved hissatsu IDs
      expect(createMultipleCharactersSpy).toHaveBeenCalledOnce();
      const createCall = createMultipleCharactersSpy.mock.calls[0][0];
      expect(createCall[0].learnedHissatsus).toEqual([
        { id: "hiss-id1", learnLevel: 1 },
        { id: "hiss-id2", learnLevel: 2 },
      ]);
      expect(createCall[1].learnedHissatsus).toEqual([
        { id: "hiss-id3", learnLevel: 3 },
      ]);
    });

    it("should handle mix of existing and new hissatsus across characters", async () => {
      // arrange
      const fakeHissatsu = new FakeHissatsu();
      const character1 = new FakeCharacter();
      const character2 = new FakeCharacter();
      
      const charactersData = [character1.toJSON(), character2.toJSON()];
      
      // Character 1: existing hissatsu + new hissatsu
      const existingHissatsu: ICreateLearnedHissatsu = { id: "existing-id", learnLevel: 1 };
      const newHissatsu: ICreateLearnedHissatsu = { ...fakeHissatsu.toJSON(), learnLevel: 2, create: true };
      delete newHissatsu.id;
      
      // Character 2: only existing hissatsus
      const existingHissatsu2: ICreateLearnedHissatsu = { id: "existing-id2", learnLevel: 3 };

      (charactersData[0].learnedHissatsus as ICreateLearnedHissatsu[]) = [existingHissatsu, newHissatsu];
      (charactersData[1].learnedHissatsus as ICreateLearnedHissatsu[]) = [existingHissatsu2];

      const createMultipleHissatsusSpy = vi.spyOn(hissatsuService, "createMultiple").mockResolvedValue(["new-hiss-id"]);
      const createMultipleCharactersSpy = vi.spyOn(characterService, "createMultiple").mockResolvedValue(["char-id1", "char-id2"]);

      // act
      const ids = await new CreateCharacters({ characterService, hissatsuService }).execute(charactersData);

      // assert
      expect(ids).toEqual(["char-id1", "char-id2"]);
      
      // Only one new hissatsu should be created
      expect(createMultipleHissatsusSpy).toHaveBeenCalledOnce();
      expect(createMultipleHissatsusSpy).toHaveBeenCalledWith([
        expect.objectContaining({ name: fakeHissatsu.name }),
      ]);

      // Verify final character data
      const createCall = createMultipleCharactersSpy.mock.calls[0][0];
      expect(createCall[0].learnedHissatsus).toEqual([
        { id: "existing-id", learnLevel: 1 },
        { id: "new-hiss-id", learnLevel: 2 },
      ]);
      expect(createCall[1].learnedHissatsus).toEqual([
        { id: "existing-id2", learnLevel: 3 },
      ]);
    });

    it("should validate all character data before creation", async () => {
      // arrange
      const character1 = new FakeCharacter();
      const character2 = new FakeCharacter();
      const charactersData = [character1.toJSON(), character2.toJSON()];

      const createMultipleSpy = vi.spyOn(characterService, "createMultiple").mockResolvedValue(["id1", "id2"]);

      // act
      await new CreateCharacters({ characterService, hissatsuService }).execute(charactersData);

      // assert
      expect(createMultipleSpy).toHaveBeenCalledWith([
        expect.objectContaining({
          firstName: character1.firstName,
          element: character1.element,
          defaultPosition: character1.defaultPosition,
        }),
        expect.objectContaining({
          firstName: character2.firstName,
          element: character2.element,
          defaultPosition: character2.defaultPosition,
        }),
      ]);
    });
  });

  describe("Error handling", () => {
    it("should propagate validation errors", async () => {
      // arrange
      const invalidCharacter = {
        firstName: "", // Invalid: empty string
        lastName: "Test",
        names: {
          west: { firstName: "Test", lastName: "West" },
          vo: { firstName: "Test", lastName: "VO" },
        },
        defaultPosition: "GK",
        element: "Fire",
        statistics: {
          kick: 100,
          control: 100,
          pressure: 100,
          physical: 100,
          agility: 100,
          intelligence: 100,
          technique: 100,
        },
        learnedHissatsus: [],
      };

      // act & assert
      await expect(
        new CreateCharacters({ characterService, hissatsuService }).execute([invalidCharacter as any])
      ).rejects.toThrow();
    });

    it("should propagate hissatsu creation errors", async () => {
      // arrange
      const fakeHissatsu = new FakeHissatsu();
      const character = new FakeCharacter();
      const charactersData = [character.toJSON()];
      
      const newHissatsu: ICreateLearnedHissatsu = { ...fakeHissatsu.toJSON(), learnLevel: 1, create: true };
      delete newHissatsu.id;
      (charactersData[0].learnedHissatsus as ICreateLearnedHissatsu[]) = [newHissatsu];

      vi.spyOn(hissatsuService, "createMultiple").mockRejectedValue(new Error("Hissatsu creation failed"));

      // act & assert
      await expect(
        new CreateCharacters({ characterService, hissatsuService }).execute(charactersData)
      ).rejects.toThrow("Hissatsu creation failed");
    });

    it("should propagate character creation errors", async () => {
      // arrange
      const character = new FakeCharacter();
      const charactersData = [character.toJSON()];

      vi.spyOn(characterService, "createMultiple").mockRejectedValue(new Error("Character creation failed"));

      // act & assert
      await expect(
        new CreateCharacters({ characterService, hissatsuService }).execute(charactersData)
      ).rejects.toThrow("Character creation failed");
    });
  });
});