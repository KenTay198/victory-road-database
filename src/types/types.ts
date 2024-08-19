export type RecursivePartial<T> = T extends object
  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends any[]
    ? T
    : { [P in keyof T]?: RecursivePartial<T[P]> }
  : T;

export interface IDocument {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Element = "forest" | "earth" | "fire" | "wind";

export interface ISort {
  key: string;
  order: "asc" | "desc";
}

export interface IPasswordRequirements {
  length?: boolean;
  upperLetter?: boolean;
  lowerLetter?: boolean;
  number?: boolean;
  specialChar?: boolean;
}
