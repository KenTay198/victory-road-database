import FindAllCharacters from "@character/usecases/FindAllCharacters";
import { describe, expect, it, vi } from "vitest";
import StubCharacterService from "@infrastructure/character/stub/character.stub-service";

describe("FindAllCharacters", () => {
  const service = new StubCharacterService();
  const findAllCharacters = new FindAllCharacters(service);

  it(`should return all characters`, async () => {
    const characters = await findAllCharacters.execute();
    expect(characters).toBeTruthy();
    expect(characters.length).toBe(3);
  });
});
