import type IHissatsuAdapter from "@hissatsu/hissatsu.adapter";
import type { IHissatsuDocument } from "./hissatsu.mongo-model";
import Hissatsu from "@hissatsu/hissatsu.entity";

export default class MongoHissatsuAdapter implements IHissatsuAdapter {
  toEntity(data: IHissatsuDocument): Hissatsu {
    return new Hissatsu({
      id: data._id?.toString(),
      name: data.name,
      names: {
        en: data.names.en,
        jp: data.names.jp,
        fr: data.names.fr,
      },
      type: data.type,
      element: data.element,
      power: data.power,
      cost: data.cost,
      characteristic: data.characteristic,
      learnLevel: data.learnLevel,
    });
  }
}
