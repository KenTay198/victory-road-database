import type { Element } from "@domain/shared/types";
import type {
  HissatsuCharacteristic,
  HissatsuLocale,
  HissatsuNames,
  HissatsuType,
  IHissatsu,
} from "@hissatsu/hissatsu.types";

export default class Hissatsu implements IHissatsu {
  id: string;
  name: string;
  names: HissatsuNames;
  element: Element;
  type: HissatsuType;
  power: number;
  cost: number;
  characteristic?: HissatsuCharacteristic;
  learnLevel?: number;

  constructor(data: IHissatsu) {
    this.id = data.id;
    this.name = data.name;
    this.element = data.element;
    this.type = data.type;
    this.characteristic = data.characteristic;
    this.names = data.names;
    this.power = data.power;
    this.cost = data.cost;
  }

  //#region
  setLocalizedName(locale: HissatsuLocale): void {
    if (this.names?.[locale]) {
      this.name = this.names[locale];
    }
  }
  //#endregion

  //#region Utils
  toJSON(): IHissatsu {
    return {
      id: this.id,
      name: this.name,
      names: this.names,
      element: this.element,
      type: this.type,
      characteristic: this.characteristic,
      power: this.power,
      cost: this.cost,
      learnLevel: this.learnLevel,
    };
  }

  static fromJSON(data: IHissatsu): Hissatsu {
    const hissatsu = new Hissatsu({
      id: data.id,
      name: data.name,
      names: data.names,
      element: data.element,
      type: data.type,
      characteristic: data.characteristic,
      power: data.power,
      cost: data.cost,
    });
    hissatsu.learnLevel = data.learnLevel;
    return hissatsu;
  }
  //#endregion
}
