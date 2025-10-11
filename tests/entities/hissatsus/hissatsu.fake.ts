import Hissatsu from "@hissatsu/hissatsu.entity";
import type { IHissatsuData } from "@hissatsu/hissatsu.types";

export default class FakeHissatsu extends Hissatsu {
  constructor({ name, type, characteristic, names }: Partial<IHissatsuData> = {}) {
    super({
      id: "name",
      name: name || "Fake",
      element: "earth",
      names: names || { fr: "Nom", en: "Name", jp: "Name" },
      type: type || "kick",
      characteristic: characteristic,
      cost: 10,
      power: 100,
    });
  }
}
