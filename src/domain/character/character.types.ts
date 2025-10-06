import type { Names } from "@domain/shared/types";
import type { IHissatsu } from "@hissatsu/hissatsu.types";
import type { IMeta } from "@meta/meta.types";

export interface IFullCharacter extends ICharacter {
  meta?: IMeta;
  hissatsus: IHissatsu[];
}

export interface ICharacter extends ICharacterCreateData {
  id: string;
  fullName: string;
  statistics: IStatistics;
  archetypes: CharacterArchetype[];
}

export interface ICharacterCreateData {
  firstName: string;
  lastName?: string;
  names?: CharacterNames;
  element: CharacterElement;
  defaultPosition: Position;
  learnedHissatsus: ILearnedHissatsu[];
  statistics: Omit<IStatistics, "total">;
  imageUrl?: string;
}

export type Position = "goalkeeper" | "forward" | "defender" | "midfielder";

export interface IStatistics {
  kick: number;
  control: number;
  pressure: number;
  physical: number;
  agility: number;
  intelligence: number;
  technique: number;
  total: number;
}

export interface IAdvancedStatistics {
  totalAtt: number;
  faceoffAtt: number;
  shoot: number;
  focusAtt: number;
  scrambleAtt: number;
  totalDef: number;
  wall: number;
  faceoffDef: number;
  focusDef: number;
  scrambleDef: number;
  gk: number;
}

export interface ILearnedHissatsu {
  id: string;
  learnLevel: number;
}

export type CharacterLocale = "fr" | "vo";
export interface CharacterNames extends Names<{ firstName: string; lastName?: string }> {
  fr: { firstName: string; lastName?: string };
  vo: { firstName: string; lastName?: string };
}
export type CharacterElement = "forest" | "earth" | "fire" | "wind";
export type CharacterArchetype =
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
