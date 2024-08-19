import { ICharacter } from "./character.types";
import { IDocument } from "./types";

export interface IRoster extends IDocument {
  name: string;
  owner: string;
  characters: (string | ICharacter)[];
}
