import DomainError from "@domain/domainError";
import type Character from "@character/entities/character.entity";
import type ICharacterService from "@character/character.service";
import type IMetaService from "@meta/meta.service";
import type IHissatsuService from "@hissatsu/hissatsu.service";

export default class FindAllCharacters {
  constructor(
    private characterService: ICharacterService,
    private metaService: IMetaService,
    private hissatsuService: IHissatsuService,
  ) {}

  async execute(): Promise<Character[]> {
    try {
      const meta = await this.metaService.get();
      const hissatsus = await this.hissatsuService.findAll();
      const characters = (await this.characterService.findAll()).map((c) => {
        c.setMeta(meta);
        c.archetypes = c.getArchetypes();
        c.hissatsus = hissatsus.filter((h) => c.learnedHissatsus.some((lh) => lh.id === h.id));
        return c;
      });
      return characters;
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}
