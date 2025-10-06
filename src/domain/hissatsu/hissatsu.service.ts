import type { ILearnedHissatsu } from "@character/character.types";
import type Hissatsu from "./hissatsu.entity";

interface IHissatsuService {
  findAll(): Promise<Hissatsu[]>;
  findLearnedHissatsus(learnedHissatsus: ILearnedHissatsu[]): Promise<Hissatsu[]>;
}

export default IHissatsuService;
