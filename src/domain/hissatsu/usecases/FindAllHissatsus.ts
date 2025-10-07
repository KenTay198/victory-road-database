import DomainError from "@domain/shared/domainError/domainError";
import type Hissatsu from "@hissatsu/hissatsu.entity";
import type IHissatsuService from "@hissatsu/hissatsu.service";

export default class FindAllHissatsus {
  constructor(private hissatsuService: IHissatsuService) {}

  async execute(): Promise<Hissatsu[]> {
    try {
      const hissatsus = await this.hissatsuService.findAll();
      return hissatsus;
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}
