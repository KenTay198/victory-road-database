import type { Element, Names } from "@domain/types";

export interface IHissatsu extends IHissatsuCreateData {
  id: string;
}

export interface IHissatsuCreateData {
  name: string;
  names: HissatsuNames;
  element: Element;
  type: HissatsuType;
  power: number;
  cost: number;
  characteristic?: HissatsuCharacteristic;
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
