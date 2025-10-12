import type IHissatsuAdapter from "@hissatsu/hissatsu.adapter";
import type { IHissatsuDocument } from "./hissatsu.mongo-model";
import Hissatsu from "@hissatsu/hissatsu.entity";

export default class MongoHissatsuAdapter implements IHissatsuAdapter {
  toEntity(data: IHissatsuDocument): Hissatsu {
    return new Hissatsu({
      id: data._id.toString(),
      name: data.name,
      names: data.names,
      type: data.type,
      element: data.element,
      power: data.power,
      cost: data.cost,
      characteristic: data.characteristic,
      learnLevel: data.learnLevel,
    });
  }
}
