import type Hissatsu from "./hissatsu.entity";

export default interface IHissatsuAdapter {
  toEntity(data: any): Hissatsu;
}
