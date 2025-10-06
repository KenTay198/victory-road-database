import type Hissatsu from "./hissatsu.entity";
import type { ILearnedHissatsu } from "@character/character.types";

interface IHissatsuRepository {
  findAll: () => Promise<Hissatsu[]>;
  findLearnedHissatsus: (character: ILearnedHissatsu[]) => Promise<Hissatsu[]>;
}

export default IHissatsuRepository;
