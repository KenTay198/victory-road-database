export type AppTemplate = "blue" | "darkBlue" | "yellow" | "darkYellow" | "fire" | "wind" | "earth" | "forest" | "void";

export type FormError = {
  field: string;
  message: string;
};

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
