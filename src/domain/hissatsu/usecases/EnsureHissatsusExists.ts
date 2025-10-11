import CreateHissatsus from "@hissatsu/usecases/CreateHissatsus";
import type { ICreateLearnedHissatsu, IHissatsuData } from "@hissatsu/hissatsu.types";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import type { ILearnedHissatsu } from "@character/character.types";

export default class EnsureHissatsusExist {
  constructor(private hissatsuService: IHissatsuService) {}

  async execute(learnedHissatsus: Partial<ICreateLearnedHissatsu>[]): Promise<ILearnedHissatsu[]> {
    const newHissatsuMap = new Map<number, IHissatsuData>();

    for (let i = 0; i < learnedHissatsus.length; i++) {
      const h = learnedHissatsus[i];
      if (!h.id || h.create) {
        newHissatsuMap.set(i, h as IHissatsuData);
      } else {
        delete h.create;
      }
    }

    if (newHissatsuMap.size > 0) {
      const ids = await new CreateHissatsus(this.hissatsuService).execute(Array.from(newHissatsuMap.values()));

      for (const [index] of newHissatsuMap) {
        const old = learnedHissatsus[index];
        learnedHissatsus[index] = { id: ids.shift(), learnLevel: old.learnLevel } as ILearnedHissatsu;
      }
    }

    return learnedHissatsus as ILearnedHissatsu[];
  }
}
