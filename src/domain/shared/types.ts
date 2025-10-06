import type { CharacterElement } from "@character/character.types";

export type Names<T = string> = {
  west?: T;
  vo?: T;
  fr?: T;
  en?: T;
  jp?: T;
};

export type Element = CharacterElement | "void";
