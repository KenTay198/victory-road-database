import type IMetaService from "@meta/meta.service";
import type Meta from "@meta/meta.entity";
import DomainError from "@domain/domainError";

export default class CalculateMeta {
  constructor(private metaService: IMetaService) {}

  async execute(): Promise<Meta> {
    try {
      return this.metaService.calculate();
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}
