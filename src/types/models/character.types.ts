import IHissatsu from "./hissatsu.types";
import { Element, IDocument, Position } from "../types";

export type Archetype =
  | "striker"
  | "forward"
  | "long-shooter"
  | "attacking-midfielder"
  | "central-midfielder"
  | "defensive-midfielder"
  | "defender"
  | "wall-defender"
  | "goalkeeper"
  | "none";

export interface IStatistics {
  kick: number;
  control: number;
  pressure: number;
  physical: number;
  agility: number;
  intelligence: number;
  technique: number;
}

export interface ICompleteStatistics extends IStatistics {
  total: number;
  "total-att": number;
  "shoot-att": number;
  "focus-att": number;
  "scramble-att": number;
  "total-def": number;
  "wall-def": number;
  "focus-def": number;
  "scramble-def": number;
  gk: number;
}

export interface ICharacterHissatsu {
  hissatsuId: string | IHissatsu;
  learnLevel: number;
}

export interface ICharacterNames {
  dub: {
    firstName: string;
    lastName?: string;
  };
  og: {
    firstName: string;
    lastName?: string;
  };
}

export interface ICharacterData {
  firstName: string;
  lastName?: string;
  names: ICharacterNames;
  statistics: IStatistics;
  hissatsus: ICharacterHissatsu[];
  element: Element;
  defaultPosition: Position;
  imageUrl?: string;
}

export type ICharacter = ICharacterData & IDocument;

export interface ICompleteCharacter extends ICharacter {
  statistics: ICompleteStatistics;
  archetypes: Archetype[];
  name: string;
}
