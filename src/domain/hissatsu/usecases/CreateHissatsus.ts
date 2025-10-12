import DomainError from "@domain/shared/domainError/domainError";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import type { IHissatsuData } from "@hissatsu/hissatsu.types";
import z from "zod";
import { elements } from "@domain/shared/variables";
import { hissatsuCharacteristics, hissatsuTypes } from "@hissatsu/hissatsu.variables";

export default class CreateHissatsus {
  constructor(private hissatsuService: IHissatsuService) {}

  async execute(hissatsusData: IHissatsuData[]): Promise<string[]> {
    try {
      const data = hissatsusData.map((h) => CreateHissatsuData.parse(h));
      return await this.hissatsuService.createMultiple(data);
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}

export const CreateHissatsuData = z.object({
  name: z.string().trim().min(1),
  names: z.object({
    fr: z.string().trim().min(1),
    en: z.string().trim().min(1),
    jp: z.string().trim().min(1),
  }),
  type: z.enum(hissatsuTypes),
  element: z.enum(elements),
  characteristic: z.enum(hissatsuCharacteristics).optional(),
  power: z.number().min(0).max(9999),
  cost: z.number().min(0).max(9999),
}) satisfies z.ZodType<IHissatsuData>;
