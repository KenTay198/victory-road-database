import DomainError from "@domain/shared/domainError/domainError";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import type { IHissatsuFormData } from "@hissatsu/hissatsu.types";
import { CreateHissatsuData } from "./CreateHissatsus";

export default class CreateHissatsu {
  constructor(private hissatsuService: IHissatsuService) {}

  async execute(hissatsuData: IHissatsuFormData): Promise<string> {
    try {
      const validatedData = CreateHissatsuData.parse(hissatsuData);
      return await this.hissatsuService.create(validatedData);
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}

export { CreateHissatsuData };
