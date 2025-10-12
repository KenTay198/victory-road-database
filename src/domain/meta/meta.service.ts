import type Meta from "./meta.entity";
import type Character from "@character/entities/character.entity";

interface IMetaService {
  get(): Promise<Meta | null>;
  calculate(characters: Character[]): Promise<Meta | null>;
}

export default IMetaService;
