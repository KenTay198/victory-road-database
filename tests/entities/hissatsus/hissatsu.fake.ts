import Hissatsu from "@hissatsu/hissatsu.entity";
import type { IHissatsu } from "@hissatsu/hissatsu.types";

export default class FakeHissatsu extends Hissatsu {
  constructor({ id, name, type, characteristic, names }: Partial<IHissatsu> = {}) {
    super({
      id: id || "id",
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
