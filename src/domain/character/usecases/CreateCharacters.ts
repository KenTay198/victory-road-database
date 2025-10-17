import DomainError from "@domain/shared/domainError/domainError";
import type ICharacterService from "@character/character.service";
import type { ICharacterFormData } from "@character/character.types";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import EnsureHissatsusExistsForMany from "@hissatsu/usecases/EnsureHissatsusExistsForMany";
import { CreateCharacterData } from "./CreateCharacter";

export default class CreateCharacters {
  private characterService: ICharacterService;
  private hissatsuService: IHissatsuService;

  constructor(services: { characterService: ICharacterService; hissatsuService: IHissatsuService }) {
    this.characterService = services.characterService;
    this.hissatsuService = services.hissatsuService;
  }

  async execute(characterDatas: ICharacterFormData[]): Promise<string[]> {
    try {
      const allLearnedHissatsus = characterDatas.map((char) => char.learnedHissatsus);
      const processedHissatsusMap = await new EnsureHissatsusExistsForMany(this.hissatsuService).execute(
        allLearnedHissatsus,
      );
      for (let i = 0; i < characterDatas.length; i++) {
        const processedHissatsus = processedHissatsusMap.get(i);
        if (processedHissatsus) {
          characterDatas[i].learnedHissatsus = processedHissatsus;
        }
      }

      const validatedDatas = characterDatas.map((data) => CreateCharacterData.parse(data));
      return await this.characterService.createMultiple(validatedDatas);
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}
