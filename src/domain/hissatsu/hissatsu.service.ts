import type Hissatsu from "./hissatsu.entity";
import type { IHissatsuCreateData } from "./hissatsu.types";
import type Character from "@character/entities/character.entity";

interface IHissatsuService {
  findAll(): Promise<Hissatsu[]>;
  findById(id: string): Promise<Hissatsu | null>;
  findByCharacter(character: Character): Promise<Hissatsu[]>;
  create(hissatsuData: IHissatsuCreateData): Promise<string>;
}

export default IHissatsuService;
