import type Meta from "./meta.entity";

export default interface IMetaAdapter {
  toEntity(data: any): Meta;
}
