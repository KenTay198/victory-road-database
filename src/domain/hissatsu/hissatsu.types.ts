import type { ILearnedHissatsu } from "@character/character.types";
import type { Element, Names } from "@domain/shared/types";

export interface IHissatsu extends IHissatsuData {
  id: string;
}

export interface IHissatsuData {
  name: string;
  names: HissatsuNames;
  element: Element;
  type: HissatsuType;
  power: number;
  cost: number;
  characteristic?: HissatsuCharacteristic;
  learnLevel?: number;
}

export type HissatsuTypeAndCharacteristic = Partial<Record<HissatsuType | HissatsuCharacteristic, boolean>>;

export type HissatsuLocale = "fr" | "en" | "jp";
export interface HissatsuNames extends Names {
  fr: string;
  en: string;
  jp: string;
}
export type HissatsuType = "kick" | "dribble" | "defense" | "keep";
export type HissatsuCharacteristic = "long" | "block";

export type IDefaultHissatsuFindParams = {
  locale?: HissatsuLocale;
};

export interface ICreateLearnedHissatsu extends Partial<ILearnedHissatsu>, Partial<IHissatsuData> {
  learnLevel: number;
  create?: boolean;
}

export interface IHissatsuFormData extends Omit<Partial<IHissatsuData>, "names"> {
  names?: Partial<HissatsuNames>;
}
