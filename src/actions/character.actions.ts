"use server";

import StubCharacterService from "@infrastructure/character/stub/character.stub-service";
import FindCharacterById from "@character/usecases/FindCharacterById";
import type { ICharacterFormData, IDefaultFindCharacterParams, IFullCharacter } from "@character/character.types";
import type ICharacterService from "@character/character.service";
import { getMetaServiceInstance } from "./meta.actions";
import { getHissatsuServiceInstance } from "./hissatsu.actions";
import FindAllCharacters from "@character/usecases/FindAllCharacters";
import MongoCharacterService from "@infrastructure/character/mongo/character.mongo-service";
import CreateCharacter from "@character/usecases/CreateCharacter";
import UpdateCharacter from "@character/usecases/UpdateCharacter";

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
    case "mongo":
      globalThis.characterService = new MongoCharacterService();
      break;
    default:
      throw new Error(`Unknown character service type: ${type}`);
  }

  return globalThis.characterService;
}

export async function findCharacterByIdAction(
  id: string,
  params?: IDefaultFindCharacterParams,
): Promise<IFullCharacter | null> {
  console.log("[Action] Character : findCharacterById");
  const characterService = await getCharacterServiceInstance();
  const metaService = await getMetaServiceInstance();
  const hissatsuService = await getHissatsuServiceInstance();
  const character = await new FindCharacterById({ characterService, metaService, hissatsuService }).execute(id);
  if (character) {
    if (params?.locale) {
      character.setLocalizedName(params?.locale);
    }
    return character.toFullJSON();
  }
  return null;
}

export async function findAllCharactersAction(params?: IDefaultFindCharacterParams): Promise<IFullCharacter[]> {
  console.log("[Action] Character : findAllCharacters");
  const characterService = await getCharacterServiceInstance();
  const metaService = await getMetaServiceInstance();
  const hissatsuService = await getHissatsuServiceInstance();
  const characters = await new FindAllCharacters({ characterService, metaService, hissatsuService }).execute();
  if (characters) {
    return characters.map((c) => {
      if (params?.locale) {
        c.setLocalizedName(params?.locale);
      }
      return c.toFullJSON();
    });
  }
  return [];
}

export async function createCharacterAction(characterData: ICharacterFormData): Promise<string> {
  console.log("[Action] Character : createCharacter");
  const characterService = await getCharacterServiceInstance();
  const hissatsuService = await getHissatsuServiceInstance();
  return await new CreateCharacter({ characterService, hissatsuService }).execute(characterData);
}

export async function updateCharacterAction(id: string, characterData: ICharacterFormData): Promise<boolean> {
  const characterService = await getCharacterServiceInstance();
  const hissatsuService = await getHissatsuServiceInstance();
  return await new UpdateCharacter({ characterService, hissatsuService }).execute(id, characterData);
}
