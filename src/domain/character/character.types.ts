import type { Names } from "@domain/shared/types";
import type { ICreateLearnedHissatsu, IHissatsu } from "@hissatsu/hissatsu.types";
import type { IMeta } from "@meta/meta.types";

export interface IFullCharacter extends ICharacter {
  meta?: IMeta;
  hissatsus: IHissatsu[];
}

export interface ICharacter extends ICharacterData {
  id: string;
  fullName: string;
  statistics: IStatistics;
  archetypes: CharacterArchetype[];
}

export interface ICharacterData {
  firstName: string;
  lastName?: string;
  names: CharacterNames;
  element: CharacterElement;
  defaultPosition: Position;
  learnedHissatsus: ILearnedHissatsu[];
  statistics: Omit<IStatistics, "total">;
  imageUrl?: string;
}

export interface ICharacterFormData extends Omit<Partial<ICharacterData>, "names" | "learnedHissatsus" | "statistics"> {
  learnedHissatsus: Partial<ICreateLearnedHissatsu>[];
  names: Partial<CharacterNames>;
  statistics: Partial<IStatistics>;
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

export type CharacterLocale = "west" | "vo";
export interface CharacterNames extends Names<{ firstName: string; lastName?: string }> {
  west: { firstName: string; lastName?: string };
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

export type IDefaultFindCharacterParams = {
  locale?: CharacterLocale;
};

export type IFindCharactersParams = IDefaultFindCharacterParams & {
  withHissatsus?: boolean;
  withMeta?: boolean;
};
