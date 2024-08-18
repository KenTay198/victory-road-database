import IHissatsu from "./hissatsu.types";
import { Element, IDocument } from "./types";

export type Position = "goalkeeper" | "forward" | "defender" | "midfielder";
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

export interface ICharacter extends IDocument {
  firstName: string;
  lastName?: string;
  statistics: IStatistics;
  hissatsus: ICharacterHissatsu[];
  element: Element;
  defaultPosition: Position;
}

export interface ICompleteCharacter extends ICharacter {
  statistics: ICompleteStatistics;
  archetypes: Archetype[];
}

export interface IPostCharacter
  extends Omit<
    Partial<ICharacter>,
    "hissatsus" | "statistics" | "element" | "defaultPosition"
  > {
  hissatsus?: Partial<ICharacterHissatsu>[];
  statistics?: Partial<IStatistics>;
  element?: string;
  defaultPosition?: string;
}
