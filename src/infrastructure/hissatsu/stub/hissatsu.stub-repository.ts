import Hissatsu from "@hissatsu/hissatsu.entity";
import type IHissatsuRepository from "@hissatsu/hissatsu.repository";
import type { IHissatsuCreateData } from "@hissatsu/hissatsu.types";
import type Character from "@character/entities/character.entity";

export default class StubHissatsuRepository implements IHissatsuRepository {
  private idCounter = 1;
  private hissatsus: Hissatsu[] = [];

  constructor() {
    this.hissatsus = [
      new Hissatsu({
        id: String(this.idCounter++),
        name: "God Hand",
        names: { fr: "Main Céleste", en: "God Hand", jp: "God Hand" },
        type: "keep",
        element: "earth",
        power: 225,
        cost: 70,
      }),
      new Hissatsu({
        id: String(this.idCounter++),
        name: "God Hand V",
        names: { fr: "Main Céleste V", en: "God Hand V", jp: "God Hand V" },
        type: "keep",
        element: "earth",
        power: 260,
        cost: 110,
      }),
      new Hissatsu({
        id: String(this.idCounter++),
        name: "Aggressive Beat",
        names: { fr: "Attaque Ventriculaire", en: "Aggressive Beat", jp: "Aggressive Beat" },
        type: "dribble",
        element: "fire",
        power: 230,
        cost: 70,
      }),
      new Hissatsu({
        id: String(this.idCounter++),
        name: "Spiral Draw",
        names: { fr: "Sprint Tourbillon", en: "Spiral Draw", jp: "Spiral Draw" },
        type: "defense",
        element: "wind",
        power: 225,
        cost: 70,
      }),
    ];
  }
  async findAll(): Promise<Hissatsu[]> {
    return this.hissatsus;
  }

  async findById(id: string): Promise<Hissatsu | null> {
    const hissatsu = this.hissatsus.find((c) => c.id === id);
    return hissatsu || null;
  }

  async findByCharacter(character: Character): Promise<Hissatsu[]> {
    const hissatsus: Hissatsu[] = [];
    for (const { id } of character.learnedHissatsus) {
      const hissatsu = this.hissatsus.find((h) => h.id === id);
      if (hissatsu) {
        hissatsus.push(hissatsu);
      }
    }
    return hissatsus;
  }

  async create(hissatsu: IHissatsuCreateData): Promise<string> {
    const id = String(this.idCounter++);
    const newHissatsu = new Hissatsu({ id, ...hissatsu });
    this.hissatsus.push(newHissatsu);
    return id;
  }
}
