import DomainError from "@domain/shared/domainError";
import type { ILearnedHissatsu } from "@character/character.types";
import type Hissatsu from "@hissatsu/hissatsu.entity";
import type IHissatsuService from "@hissatsu/hissatsu.service";

export default class FindLearnedHissatsus {
  constructor(
    private hissatsuService: IHissatsuService,
    private learnedHissatsus: ILearnedHissatsu[],
  ) {}

  async execute(): Promise<Hissatsu[]> {
    try {
      const hissatsus = await this.hissatsuService.findLearnedHissatsus(this.learnedHissatsus);
      return hissatsus;
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}
