import FindCharacterById from "@character/usecases/FindCharacterById";
import { describe, expect, it } from "vitest";
import StubCharacterService from "@infrastructure/character/stub/character.stub-service";
import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";
import StubMetaService from "@infrastructure/meta/stub/meta.stub-service";

describe("FindCharacterById", () => {
  it.each([
    { id: "1", exists: true },
    { id: "99", exists: false },
  ])(`should return a character with id=$id if it exists`, async ({ id, exists }) => {
    const characterService = new StubCharacterService();
    const findCharacterById = new FindCharacterById({
      characterService,
    });
    const character = await findCharacterById.execute(id);
    if (exists) {
      expect(character).toBeTruthy();
      expect(character?.id).toBe(id);
    } else {
      expect(character).toBe(null);
    }
  });

  it("should fill archetypes if meta service is provided", async () => {
    const characterService = new StubCharacterService();
    const metaService = new StubMetaService();
    const findCharacterById = new FindCharacterById({
      characterService,
      metaService,
    });
    const character = await findCharacterById.execute("1");
    expect(character).toBeTruthy();
    expect(character?.id).toBe("1");
    expect(character?.archetypes).toBeTruthy();
    expect(character?.archetypes?.length).toBeGreaterThan(0);
  });

  it("should fill hissatsus if hissatsu service is provided", async () => {
    const characterService = new StubCharacterService();
    const hissatsuService = new StubHissatsuService();
    const findCharacterById = new FindCharacterById({
      characterService,
      hissatsuService,
    });
    const character = await findCharacterById.execute("1");
    expect(character).toBeTruthy();
    expect(character?.id).toBe("1");
    expect(character?.hissatsus).toBeTruthy();
    expect(character?.hissatsus?.length).toBe(character?.learnedHissatsus.length);
  });
});
