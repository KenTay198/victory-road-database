import { Element, IDocument } from "./types";

export const hissatsuTypes = ["kick", "dribble", "defense", "keep"];
export const hissatsuCharacteristics = ["long", "block"];

export type HissatsuType = "kick" | "dribble" | "defense" | "keep";
export type HissatsuCharacteristic = "long" | "block";

interface IHissatsu extends IDocument {
  name: string;
  type: HissatsuType;
  element: Element | "void";
  characteristic?: HissatsuCharacteristic;
}

export default IHissatsu;
