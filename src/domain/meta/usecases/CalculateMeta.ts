import type Meta from "@meta/meta.entity";
import type IMetaService from "@meta/meta.service";
import type ICharacterService from "@character/character.service";
import DomainError from "@domain/shared/domainError/domainError";

export default class CalculateMeta {
  private metaService: IMetaService;
  private characterService: ICharacterService;

  constructor({ metaService, characterService }: { metaService: IMetaService; characterService: ICharacterService }) {
    this.metaService = metaService;
    this.characterService = characterService;
  }

  async execute(): Promise<Meta> {
    try {
      const characters = await this.characterService.findAll();
      return await this.metaService.calculate(characters);
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}
