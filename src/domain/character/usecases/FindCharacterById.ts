import DomainError from "@domain/shared/domainError/domainError";
import type Character from "@character/entities/character.entity";
import type ICharacterService from "@character/character.service";
import type IMetaService from "@meta/meta.service";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import FindLearnedHissatsus from "@hissatsu/usecases/FindLearnedHissatsus";
import GetMeta from "@meta/usecases/GetMeta";

export default class FindCharacterById {
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

  async execute(id: string): Promise<Character | null> {
    try {
      const character = await this.characterService.findById(id);

      if (character) {
        const hissatsus = this.hissatsuService
          ? await new FindLearnedHissatsus(this.hissatsuService, character.learnedHissatsus).execute()
          : [];
        if (hissatsus.length > 0) {
          character.hissatsus = hissatsus.map((h) => {
            h.learnLevel = character.learnedHissatsus.find((lh) => lh.id === h.id)?.learnLevel;
            return h;
          });
        }

        const meta = this.metaService ? await new GetMeta(this.metaService).execute() : null;
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
