import DomainError from "@domain/domainError";
import type Character from "@character/entities/character.entity";
import type ICharacterService from "@character/character.service";
import type IMetaService from "@meta/meta.service";
import type IHissatsuService from "@hissatsu/hissatsu.service";

export default class FindCharacterById {
  constructor(
    private characterService: ICharacterService,
    private metaService: IMetaService,
    private hissatsuService: IHissatsuService,
  ) {}

  async execute(id: string): Promise<Character | null> {
    try {
      const character = await this.characterService.findById(id);
      if (character) {
        const hissatsus = await this.hissatsuService.findByCharacter(character);
        character.hissatsus = hissatsus;
        const meta = await this.metaService.get();
        if (meta?.initialized) {
          character.setMeta(meta);
          character.archetypes = character.getArchetypes();
        }
      }
      return character;
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}
