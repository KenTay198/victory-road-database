import DomainError from "@domain/shared/domainError/domainError";
import type Character from "@character/entities/character.entity";
import type ICharacterService from "@character/character.service";
import type IMetaService from "@meta/meta.service";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import FindAllHissatsus from "@hissatsu/usecases/FindAllHissatsus";
import GetMeta from "@meta/usecases/GetMeta";
import Hissatsu from "@hissatsu/hissatsu.entity";

export default class FindAllCharacters {
  private characterService: ICharacterService;
  private metaService?: IMetaService;
  private hissatsuService?: IHissatsuService;

  constructor(services: {
    characterService: ICharacterService;
    metaService?: IMetaService;
    hissatsuService?: IHissatsuService;
  }) {
    this.characterService = services.characterService;
    this.metaService = services.metaService;
    this.hissatsuService = services.hissatsuService;
  }

  async execute(): Promise<Character[]> {
    try {
      const meta = this.metaService ? await new GetMeta(this.metaService).execute() : null;
      const hissatsus = this.hissatsuService ? await new FindAllHissatsus(this.hissatsuService).execute() : [];
      const characters = (await this.characterService.findAll()).map((c) => {
        if (meta) {
          c.setMeta(meta);
          c.archetypes = c.getArchetypes();
        }
        if (hissatsus.length > 0) {
          c.hissatsus = hissatsus
            .filter((h) => c.learnedHissatsus.some((lh) => lh.id === h.id))
            .map((h) => {
              const hissatsu = h.toJSON();
              hissatsu.learnLevel = c.learnedHissatsus.find((lh) => lh.id === h.id)?.learnLevel;
              return Hissatsu.fromJSON(hissatsu);
            })
            .sort((a, b) => (a.learnLevel || 0) - (b.learnLevel || 0));
        }
        return c;
      });
      return characters;
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}
