import type { ILearnedHissatsu } from "@character/character.types";
import type Hissatsu from "./hissatsu.entity";
import type { IHissatsuData, IHissatsuFormData } from "./hissatsu.types";

interface IHissatsuService {
  findAll(): Promise<Hissatsu[]>;
  findById(id: string): Promise<Hissatsu | null>;
  findLearnedHissatsus(learnedHissatsus: ILearnedHissatsu[]): Promise<Hissatsu[]>;
  create(hissatsu: IHissatsuFormData): Promise<string>;
  createMultiple(hissatsu: IHissatsuData[]): Promise<string[]>;
  update(id: string, hissatsu: IHissatsuFormData): Promise<boolean>;
}

export default IHissatsuService;
