import type IMetaAdapter from "@meta/meta.adapter";
import type { IMetaDocument } from "./meta.mongo-model";
import Meta from "@meta/meta.entity";

export default class MongoMetaAdapter implements IMetaAdapter {
  toEntity(data: IMetaDocument): Meta {
    return new Meta({
      statRange: data.statRange,
      advancedStatRange: data.advancedStatRange,
      initialized: data.initialized,
      lastUpdatedAt: data.lastUpdatedAt,
    });
  }
}
