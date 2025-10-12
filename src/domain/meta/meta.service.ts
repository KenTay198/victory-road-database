import type Meta from "./meta.entity";
import type Character from "@character/entities/character.entity";

interface IMetaService {
  get(): Promise<Meta>;
  calculate(characters: Character[]): Promise<Meta>;
}

export default IMetaService;
