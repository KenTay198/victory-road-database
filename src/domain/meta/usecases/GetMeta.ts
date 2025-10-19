import type Meta from "@meta/meta.entity";
import type IMetaService from "@meta/meta.service";
import DomainError from "@domain/shared/domainError/domainError";

export default class GetMeta {
  constructor(private metaService: IMetaService) {}

  async execute(): Promise<Meta> {
    try {
      return await this.metaService.get();
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}
