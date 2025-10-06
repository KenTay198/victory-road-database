import FindAllCharacters from "@character/usecases/FindAllCharacters";
import { describe, expect, it } from "vitest";
import StubCharacterService from "@infrastructure/character/stub/character.stub-service";
import StubMetaService from "@infrastructure/meta/stub/meta.stub-service";
import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";

describe("FindAllCharacters", () => {
  const characterService = new StubCharacterService();
  const metaService = new StubMetaService();
  const hissatsuService = new StubHissatsuService();
  const findAllCharacters = new FindAllCharacters({
    characterService,
    metaService,
    hissatsuService,
  });

  it(`should return all characters`, async () => {
    const characters = await findAllCharacters.execute();
    expect(characters).toBeTruthy();
    expect(characters.length).toBe(7);
  });
});
