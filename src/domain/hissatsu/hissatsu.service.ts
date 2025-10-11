import type { ILearnedHissatsu } from "@character/character.types";
import type Hissatsu from "./hissatsu.entity";
import type { IHissatsuData } from "./hissatsu.types";

interface IHissatsuService {
  findAll(): Promise<Hissatsu[]>;
  findLearnedHissatsus(learnedHissatsus: ILearnedHissatsu[]): Promise<Hissatsu[]>;
  createMultiple(hissatsu: IHissatsuData[]): Promise<string[]>;
}

export default IHissatsuService;
