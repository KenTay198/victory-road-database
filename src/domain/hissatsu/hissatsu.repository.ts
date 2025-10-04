import type Character from "@character/entities/character.entity";
import type Hissatsu from "./hissatsu.entity";
import type { IHissatsuCreateData } from "./hissatsu.types";

interface IHissatsuRepository {
  findAll: () => Promise<Hissatsu[]>;
  findById: (id: string) => Promise<Hissatsu | null>;
  findByCharacter: (character: Character) => Promise<Hissatsu[]>;
  create: (hissatsu: IHissatsuCreateData) => Promise<string>;
}

export default IHissatsuRepository;
