import DomainError from "@domain/shared/domainError/domainError";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import type { IHissatsuData, IHissatsuFormData } from "@hissatsu/hissatsu.types";
import type z from "zod";
import { CreateHissatsuData } from "./CreateHissatsu";

export default class UpdateHissatsu {
  constructor(private hissatsuService: IHissatsuService) {}

  async execute(id: string, hissatsuData: IHissatsuFormData): Promise<boolean> {
    try {
      const data = UpdateHissatsuData.parse(hissatsuData);
      return await this.hissatsuService.update(id, data);
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}

const UpdateHissatsuData = CreateHissatsuData.partial() satisfies z.ZodType<Partial<IHissatsuData>>;
