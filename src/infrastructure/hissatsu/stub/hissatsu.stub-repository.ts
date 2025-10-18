import Hissatsu from "@hissatsu/hissatsu.entity";
import type IHissatsuRepository from "@hissatsu/hissatsu.repository";
import type { ILearnedHissatsu } from "@character/character.types";
import type { IHissatsuData, IHissatsuFormData } from "@hissatsu/hissatsu.types";

export default class StubHissatsuRepository implements IHissatsuRepository {
  private idCounter = 1;
  private hissatsus: Hissatsu[] = [];

  constructor() {
    this.hissatsus = [
      new Hissatsu({
        id: String(this.idCounter++), // 1
        name: "God Hand",
        names: { fr: "Main Céleste", en: "God Hand", jp: "God Hand" },
        type: "keep",
        element: "earth",
        power: 225,
        cost: 70,
      }),
      new Hissatsu({
        id: String(this.idCounter++), // 2
        name: "God Hand V",
        names: { fr: "Main Céleste V", en: "God Hand V", jp: "God Hand V" },
        type: "keep",
        element: "earth",
        power: 260,
        cost: 110,
      }),
      new Hissatsu({
        id: String(this.idCounter++), // 3
        name: "Aggressive Beat",
        names: { fr: "Attaque Ventriculaire", en: "Aggressive Beat", jp: "Aggressive Beat" },
        type: "dribble",
        element: "fire",
        power: 230,
        cost: 70,
      }),
      new Hissatsu({
        id: String(this.idCounter++), // 4
        name: "Spiral Draw",
        names: { fr: "Sprint Tourbillon", en: "Spiral Draw", jp: "Spiral Draw" },
        type: "defense",
        element: "wind",
        power: 225,
        cost: 70,
      }),
      new Hissatsu({
        id: String(this.idCounter++), // 5
        name: "Death Sword",
        names: { fr: "Lame des Ténèbres", en: "Doomsword Slash", jp: "Death Sword" },
        type: "kick",
        element: "fire",
        power: 220,
        cost: 60,
      }),
      new Hissatsu({
        id: String(this.idCounter++), // 6
        name: "Fire Tornado DD",
        names: { fr: "Fulgurante Double Tornade de Feu", en: "Fire Tornado DD", jp: "Fire Tornado DD" },
        type: "kick",
        element: "fire",
        power: 250,
        cost: 100,
      }),
      new Hissatsu({
        id: String(this.idCounter++), // 7
        name: "Presto Turn",
        names: { fr: "Passage Presto", en: "Presto Turn", jp: "Presto Turn" },
        type: "dribble",
        element: "forest",
        power: 230,
        cost: 70,
      }),
      new Hissatsu({
        id: String(this.idCounter++), // 8
        name: "Fortissimo",
        names: { fr: "Tir Fortissimo", en: "Fortissimo Foot", jp: "Fortissimo" },
        type: "kick",
        element: "forest",
        power: 220,
        cost: 60,
      }),
      new Hissatsu({
        id: String(this.idCounter++), // 9
        name: "Dragon Blaster",
        names: { fr: "Tourbillon du Dragon", en: "Dragon Drive", jp: "Dragon Blaster" },
        type: "kick",
        element: "wind",
        power: 250,
        cost: 120,
      }),
      new Hissatsu({
        id: String(this.idCounter++), // 10
        name: "Fuujin no Mai",
        names: { fr: "Danse d'Éole", en: "Wind God's Dance", jp: "Fuujin no Mai" },
        type: "dribble",
        element: "wind",
        power: 240,
        cost: 90,
      }),
      new Hissatsu({
        id: String(this.idCounter++), // 11
        name: "Mochimochi Kinako Mochi",
        names: { fr: "Pâte Gluante", en: "Goopy Gloopy Goo", jp: "Mochimochi Kinako Mochi" },
        type: "defense",
        element: "fire",
        characteristic: "block",
        power: 245,
        cost: 110,
      }),
      new Hissatsu({
        id: String(this.idCounter++), // 12
        name: "Sky Walk",
        names: { fr: "Danse de l'Air", en: "Dance on Air", jp: "Sky Walk" },
        type: "dribble",
        element: "earth",
        power: 255,
        cost: 110,
      }),
      new Hissatsu({
        id: String(this.idCounter++), // 13
        name: "Shippuu Dash",
        names: { fr: "Dribble Rafale", en: "Flurry Dash", jp: "Shippuu Dash" },
        type: "dribble",
        element: "wind",
        power: 230,
        cost: 70,
      }),
      new Hissatsu({
        id: String(this.idCounter++), // 14
        name: "Spinning Cut",
        names: { fr: "Scie Circulaire", en: "Spinning Cut", jp: "Spinning Cut" },
        type: "defense",
        element: "wind",
        characteristic: "block",
        power: 235,
        cost: 100,
      }),
    ];
  }
  async findAll(): Promise<Hissatsu[]> {
    return this.hissatsus;
  }

  async findById(id: string): Promise<Hissatsu | null> {
    return this.hissatsus.find((h) => h.id === id) || null;
  }

  async findLearnedHissatsus(learnedHissatsus: ILearnedHissatsu[]): Promise<Hissatsu[]> {
    const hissatsus: Hissatsu[] = [];
    for (const { id } of learnedHissatsus) {
      const hissatsu = this.hissatsus.find((h) => h.id === id);
      if (hissatsu) {
        hissatsus.push(hissatsu);
      }
    }
    return hissatsus;
  }

  async create(hissatsuData: IHissatsuFormData): Promise<string> {
    const id = String(this.idCounter++);
    const hissatsu = new Hissatsu({
      id,
      name: hissatsuData.name || "",
      names: {
        fr: hissatsuData.names?.fr || hissatsuData.name || "",
        en: hissatsuData.names?.en || hissatsuData.name || "",
        jp: hissatsuData.names?.jp || hissatsuData.name || "",
      },
      element: hissatsuData.element || "wind",
      type: hissatsuData.type || "kick",
      power: hissatsuData.power || 0,
      cost: hissatsuData.cost || 0,
      characteristic: hissatsuData.characteristic,
      learnLevel: hissatsuData.learnLevel,
    });
    this.hissatsus.push(hissatsu);
    return id;
  }

  async createMultiple(hissatsu: IHissatsuData[]): Promise<string[]> {
    const createdIds: string[] = [];
    for (const data of hissatsu) {
      const id = String(this.idCounter++);
      this.hissatsus.push(new Hissatsu({ id, ...data }));
      createdIds.push(id);
    }
    return createdIds;
  }

  async update(id: string, hissatsuData: IHissatsuFormData): Promise<boolean> {
    const index = this.hissatsus.findIndex((h) => h.id === id);
    if (index === -1) return false;

    const existingHissatsu = this.hissatsus[index];
    const updatedHissatsu = new Hissatsu({
      id,
      name: hissatsuData.name || existingHissatsu.name,
      names: {
        fr: hissatsuData.names?.fr || existingHissatsu.names.fr,
        en: hissatsuData.names?.en || existingHissatsu.names.en,
        jp: hissatsuData.names?.jp || existingHissatsu.names.jp,
      },
      element: hissatsuData.element || existingHissatsu.element,
      type: hissatsuData.type || existingHissatsu.type,
      power: hissatsuData.power ?? existingHissatsu.power,
      cost: hissatsuData.cost ?? existingHissatsu.cost,
      characteristic: hissatsuData.characteristic ?? existingHissatsu.characteristic,
      learnLevel: hissatsuData.learnLevel ?? existingHissatsu.learnLevel,
    });

    this.hissatsus[index] = updatedHissatsu;
    return true;
  }
}
