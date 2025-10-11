import DomainError from "@domain/shared/domainError/domainError";
import type ICharacterService from "@character/character.service";
import type { ICharacterData, ICharacterFormData } from "@character/character.types";
import type z from "zod";
import { CreateCharacterData } from "./CreateCharacter";
import EnsureHissatsusExist from "@hissatsu/usecases/EnsureHissatsusExists";
import type IHissatsuService from "@hissatsu/hissatsu.service";

export default class UpdateCharacter {
  private characterService: ICharacterService;
  private hissatsuService: IHissatsuService;

  constructor(services: { characterService: ICharacterService; hissatsuService: IHissatsuService }) {
    this.characterService = services.characterService;
    this.hissatsuService = services.hissatsuService;
  }

  async execute(id: string, characterData: ICharacterFormData): Promise<boolean> {
    try {
      characterData.learnedHissatsus = await new EnsureHissatsusExist(this.hissatsuService).execute(
        characterData.learnedHissatsus,
      );
      const data = UpdateCharacterData.parse(characterData);
      return await this.characterService.updateById(id, data);
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}

const UpdateCharacterData = CreateCharacterData.partial() satisfies z.ZodType<Partial<ICharacterData>>;
