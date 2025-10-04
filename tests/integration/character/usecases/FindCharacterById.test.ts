import FindCharacterById from "@character/usecases/FindCharacterById";
import { describe, expect, it } from "vitest";
import StubCharacterService from "@infrastructure/character/stub/character.stub-service";

describe("FindCharacterById", () => {
  const service = new StubCharacterService();
  const findCharacterById = new FindCharacterById(service);

  it.each([
    { id: "1", exists: true },
    { id: "99", exists: false },
  ])(`should return a character with id=$id if it exists`, async ({ id, exists }) => {
    const character = await findCharacterById.execute(id);
    if (exists) {
      expect(character).toBeTruthy();
      expect(character?.id).toBe(id);
    } else {
      expect(character).toBe(null);
    }
  });
});
