"use server";

import StubCharacterService from "@infrastructure/character/stub/character.stub-service";
import FindCharacterById from "@character/usecases/FindCharacterById";
import type { IFullCharacter } from "@character/character.types";
import type ICharacterService from "@character/character.service";
import { getMetaServiceInstance } from "./meta.actions";
import { getHissatsuServiceInstance } from "./hissatsu.actions";
import FindAllCharacters from "@character/usecases/FindAllCharacters";

declare global {
  var characterService: ICharacterService | undefined;
}

const defaultType = process.env.NODE_ENV === "development" ? "stub" : "mongo";

export async function getCharacterServiceInstance(type = defaultType): Promise<ICharacterService> {
  if (globalThis.characterService) return globalThis.characterService;

  switch (type) {
    case "stub":
      globalThis.characterService = new StubCharacterService();
      break;
    default:
      throw new Error(`Unknown character service type: ${type}`);
  }

  return globalThis.characterService;
}

export async function findCharacterByIdAction(id: string): Promise<IFullCharacter | null> {
  const characterService = await getCharacterServiceInstance();
  const metaService = await getMetaServiceInstance();
  const hissatsuService = await getHissatsuServiceInstance();
  const character = await new FindCharacterById({ characterService, metaService, hissatsuService }).execute(id);
  if (character) {
    return character.toFullJSON();
  }
  return null;
}

export async function findAllCharactersAction(): Promise<IFullCharacter[]> {
  const characterService = await getCharacterServiceInstance();
  const metaService = await getMetaServiceInstance();
  const hissatsuService = await getHissatsuServiceInstance();
  const character = await new FindAllCharacters({ characterService, metaService, hissatsuService }).execute();
  if (character) {
    return character.map((c) => c.toFullJSON());
  }
  return [];
}
