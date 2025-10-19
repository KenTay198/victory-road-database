import CreateHissatsus from "@hissatsu/usecases/CreateHissatsus";
import type { ICreateLearnedHissatsu, IHissatsuData } from "@hissatsu/hissatsu.types";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import type { ILearnedHissatsu } from "@character/character.types";

interface HissatsuReference {
  characterIndex: number;
  hissatsuIndex: number;
  learnLevel: number;
}

export default class EnsureHissatsusExistsForMany {
  constructor(private hissatsuService: IHissatsuService) {}

  async execute(charactersHissatsus: Partial<ICreateLearnedHissatsu>[][]): Promise<Map<number, ILearnedHissatsu[]>> {
    const characterHissatsuMap = new Map<number, ILearnedHissatsu[]>();
    const newHissatsus: IHissatsuData[] = [];
    const hissatsuReferences: HissatsuReference[] = [];

    for (let charIndex = 0; charIndex < charactersHissatsus.length; charIndex++) {
      characterHissatsuMap.set(charIndex, []);
      const learnedHissatsus = charactersHissatsus[charIndex];

      for (let hissIndex = 0; hissIndex < learnedHissatsus.length; hissIndex++) {
        const h = learnedHissatsus[hissIndex];

        if (!h.id || h.create) {
          newHissatsus.push(h as IHissatsuData);
          hissatsuReferences.push({
            characterIndex: charIndex,
            hissatsuIndex: hissIndex,
            learnLevel: h.learnLevel || 1,
          });
        } else {
          delete h.create;
          const characterHissatsus = characterHissatsuMap.get(charIndex);
          if (characterHissatsus) {
            characterHissatsus.push({
              id: h.id as string,
              learnLevel: h.learnLevel || 1,
            } as ILearnedHissatsu);
          }
        }
      }
    }

    if (newHissatsus.length > 0) {
      const createdIds = await new CreateHissatsus(this.hissatsuService).execute(newHissatsus);

      for (let i = 0; i < hissatsuReferences.length; i++) {
        const ref = hissatsuReferences[i];
        const characterHissatsus = characterHissatsuMap.get(ref.characterIndex);

        if (characterHissatsus) {
          characterHissatsus[ref.hissatsuIndex] = {
            id: createdIds[i],
            learnLevel: ref.learnLevel,
          } as ILearnedHissatsu;
        }
      }
    }

    return characterHissatsuMap;
  }
}
