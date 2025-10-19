import CreateHissatsus from "@hissatsu/usecases/CreateHissatsus";
import type { ICreateLearnedHissatsu, IHissatsuData } from "@hissatsu/hissatsu.types";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import type { ILearnedHissatsu } from "@character/character.types";

export default class EnsureHissatsusExist {
  constructor(private hissatsuService: IHissatsuService) {}

  async execute(learnedHissatsus: Partial<ICreateLearnedHissatsu>[]): Promise<ILearnedHissatsu[]> {
    const HissatsuMap = new Map<number, IHissatsuData>();

    for (let i = 0; i < learnedHissatsus.length; i++) {
      const h = learnedHissatsus[i];
      if (!h.id || h.create) {
        HissatsuMap.set(i, h as IHissatsuData);
      }
      delete h.create;
    }

    if (HissatsuMap.size > 0) {
      const ids = await new CreateHissatsus(this.hissatsuService).execute(Array.from(HissatsuMap.values()));

      for (const [index] of HissatsuMap) {
        const old = learnedHissatsus[index];
        learnedHissatsus[index] = { id: ids.shift(), learnLevel: old.learnLevel } as ILearnedHissatsu;
      }
    }

    return learnedHissatsus as ILearnedHissatsu[];
  }
}
