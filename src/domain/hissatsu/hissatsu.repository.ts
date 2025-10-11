import type Hissatsu from "./hissatsu.entity";
import type { ILearnedHissatsu } from "@character/character.types";
import type { IHissatsuData } from "./hissatsu.types";

interface IHissatsuRepository {
  findAll: () => Promise<Hissatsu[]>;
  findLearnedHissatsus: (character: ILearnedHissatsu[]) => Promise<Hissatsu[]>;
  createMultiple: (hissatsu: IHissatsuData[]) => Promise<string[]>;
}

export default IHissatsuRepository;
