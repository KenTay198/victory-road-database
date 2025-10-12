import DomainError from "@domain/shared/domainError/domainError";
import type ICharacterService from "@character/character.service";
import type { ICharacterData, ICharacterFormData } from "@character/character.types";
import z from "zod";
import { characterElements, positions } from "@character/character.variables";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import EnsureHissatsusExist from "@hissatsu/usecases/EnsureHissatsusExists";

export default class CreateCharacter {
  private characterService: ICharacterService;
  private hissatsuService: IHissatsuService;

  constructor(services: { characterService: ICharacterService; hissatsuService: IHissatsuService }) {
    this.characterService = services.characterService;
    this.hissatsuService = services.hissatsuService;
  }

  async execute(characterData: ICharacterFormData): Promise<string> {
    try {
      characterData.learnedHissatsus = await new EnsureHissatsusExist(this.hissatsuService).execute(
        characterData.learnedHissatsus,
      );
      const data = CreateCharacterData.parse(characterData);
      return await this.characterService.create(data);
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}

export const CreateCharacterData = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().optional(),
  names: z.object({
    west: z.object({
      firstName: z.string().trim().min(1),
      lastName: z.string().trim().optional(),
    }),
    vo: z.object({
      firstName: z.string().trim().min(1),
      lastName: z.string().trim().optional(),
    }),
  }),
  defaultPosition: z.enum(positions),
  element: z.enum(characterElements),
  imageUrl: z.union([z.literal(""), z.url("errors.character.imageUrlInvalid")]).optional(),
  //#region Statistics
  statistics: z.object({
    kick: z
      .number()
      .min(0, "components.character.newCharacterForm.errors.statMinValue")
      .max(999, "components.character.newCharacterForm.errors.statMaxValue"),
    control: z
      .number()
      .min(0, "components.character.newCharacterForm.errors.statMinValue")
      .max(999, "components.character.newCharacterForm.errors.statMaxValue"),
    pressure: z
      .number()
      .min(0, "components.character.newCharacterForm.errors.statMinValue")
      .max(999, "components.character.newCharacterForm.errors.statMaxValue"),
    physical: z
      .number()
      .min(0, "components.character.newCharacterForm.errors.statMinValue")
      .max(999, "components.character.newCharacterForm.errors.statMaxValue"),
    agility: z
      .number()
      .min(0, "components.character.newCharacterForm.errors.statMinValue")
      .max(999, "components.character.newCharacterForm.errors.statMaxValue"),
    intelligence: z
      .number()
      .min(0, "components.character.newCharacterForm.errors.statMinValue")
      .max(999, "components.character.newCharacterForm.errors.statMaxValue"),
    technique: z
      .number()
      .min(0, "components.character.newCharacterForm.errors.statMinValue")
      .max(999, "components.character.newCharacterForm.errors.statMaxValue"),
  }),
  learnedHissatsus: z.array(
    z.object({
      id: z.string().trim().min(1),
      learnLevel: z.number().min(1, "errors.character.levelMin").max(99, "errors.character.levelMax"),
    }),
  ),
}) satisfies z.ZodType<ICharacterData>;
