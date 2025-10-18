"use server";

import StubCharacterService from "@infrastructure/character/stub/character.stub-service";
import FindCharacterById from "@character/usecases/FindCharacterById";
import type { ICharacterFormData, IFindCharactersParams, IFullCharacter } from "@character/character.types";
import type ICharacterService from "@character/character.service";
import { getMetaServiceInstance } from "./meta.actions";
import { getHissatsuServiceInstance } from "./hissatsu.actions";
import FindAllCharacters from "@character/usecases/FindAllCharacters";
import MongoCharacterService from "@infrastructure/character/mongo/character.mongo-service";
import CreateCharacter from "@character/usecases/CreateCharacter";
import UpdateCharacter from "@character/usecases/UpdateCharacter";
import CreateCharacters from "@character/usecases/CreateCharacters";

declare global {
  var characterService: ICharacterService | undefined;
}

const defaultType = process.env.DEFAULT_ACTION_TYPE;

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

const defaultFindByIdParams: IFindCharactersParams = {
  withHissatsus: true,
  withMeta: true,
};
export async function findCharacterByIdAction(
  id: string,
  params?: IFindCharactersParams,
): Promise<IFullCharacter | null> {
  console.log("[Action - findCharacterById]");
  const parameters = { ...defaultFindByIdParams, ...params };
  try {
    const characterService = await getCharacterServiceInstance();
    const services: any = { characterService };
    if (parameters.withHissatsus === true) {
      services.hissatsuService = await getHissatsuServiceInstance();
    }
    if (parameters.withMeta === true) {
      services.metaService = await getMetaServiceInstance();
    }
    const character = await new FindCharacterById(services).execute(id);
    if (character) {
      if (parameters?.locale) {
        character.setLocalizedName(parameters.locale);
      }
      return character.toFullJSON();
    }
    return null;
  } catch (error) {
    console.error("[Action - findCharacterById] error:", error);
    return null;
  }
}

const defaultFindAllParams: IFindCharactersParams = {
  withHissatsus: true,
  withMeta: true,
};
export async function findAllCharactersAction(params?: IFindCharactersParams): Promise<IFullCharacter[]> {
  console.log("[Action - findAllCharacters]");
  const parameters = { ...defaultFindAllParams, ...params };
  try {
    const characterService = await getCharacterServiceInstance();
    const services: any = { characterService };
    if (parameters.withHissatsus === true) {
      services.hissatsuService = await getHissatsuServiceInstance();
    }
    if (parameters.withMeta === true) {
      services.metaService = await getMetaServiceInstance();
    }
    const characters = await new FindAllCharacters(services).execute();
    if (characters && characters.length > 0) {
      return characters.map((c) => {
        if (parameters?.locale) {
          c.setLocalizedName(parameters.locale);
        }
        return c.toFullJSON();
      });
    }
  } catch (error) {
    console.error("[Action - findAllCharacters] error:", error);
  }
  return [];
}

export async function createCharacterAction(characterData: ICharacterFormData): Promise<string> {
  console.log("[Action - createCharacter]");
  const characterService = await getCharacterServiceInstance();
  const hissatsuService = await getHissatsuServiceInstance();
  return await new CreateCharacter({ characterService, hissatsuService }).execute(characterData);
}

export async function createCharactersAction(charactersData: ICharacterFormData[]): Promise<string[]> {
  console.log("[Action - createCharacters]");
  try {
    const characterService = await getCharacterServiceInstance();
    const hissatsuService = await getHissatsuServiceInstance();
    return await new CreateCharacters({ characterService, hissatsuService }).execute(charactersData);
  } catch (error) {
    console.error("[Action - createCharacters] error:", error);
    throw error;
  }
}

export async function updateCharacterAction(id: string, characterData: ICharacterFormData): Promise<boolean> {
  console.log("[Action - updateCharacter]");
  const characterService = await getCharacterServiceInstance();
  const hissatsuService = await getHissatsuServiceInstance();
  return await new UpdateCharacter({ characterService, hissatsuService }).execute(id, characterData);
}
