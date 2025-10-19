import Character from "@character/entities/character.entity";
import type ICharacterRepository from "@character/character.repository";
import type { ICharacterData } from "@character/character.types";

export default class StubCharacterRepository implements ICharacterRepository {
  private idCounter = 1;
  private characters: Character[] = [];

  constructor() {
    this.characters = [
      new Character({
        id: String(this.idCounter++),
        firstName: "Mark",
        lastName: "Evans",
        names: {
          west: { firstName: "Mark", lastName: "Evans" },
          vo: { firstName: "Mamoru", lastName: "Endou" },
        },
        element: "earth",
        defaultPosition: "goalkeeper",
        learnedHissatsus: [
          { id: "1", learnLevel: 1 },
          { id: "2", learnLevel: 22 },
        ],
        statistics: {
          kick: 92,
          control: 126,
          pressure: 102,
          physical: 122,
          agility: 168,
          intelligence: 118,
          technique: 72,
        },
        imageUrl: "/images/characters/mark_evans.jpg",
      }),
      new Character({
        id: String(this.idCounter++),
        firstName: "Riccardo",
        lastName: "Di Rigo",
        names: {
          west: { firstName: "Riccardo", lastName: "Di Rigo" },
          vo: { firstName: "Takuto", lastName: "Shindou" },
        },
        element: "forest",
        defaultPosition: "midfielder",
        learnedHissatsus: [
          { id: "7", learnLevel: 1 },
          { id: "8", learnLevel: 11 },
        ],
        statistics: {
          kick: 116,
          control: 126,
          pressure: 112,
          physical: 88,
          agility: 104,
          intelligence: 118,
          technique: 140,
        },
        imageUrl: "/images/characters/riccardo_di_rigo.jpg",
      }),
      new Character({
        id: String(this.idCounter++),
        firstName: "Victor",
        lastName: "Blade",
        names: {
          west: { firstName: "Victor", lastName: "Blade" },
          vo: { firstName: "Kyousuke", lastName: "Tsurugi" },
        },
        element: "fire",
        defaultPosition: "forward",
        learnedHissatsus: [
          { id: "5", learnLevel: 1 },
          { id: "6", learnLevel: 21 },
        ],
        statistics: {
          kick: 180,
          control: 130,
          pressure: 76,
          physical: 106,
          agility: 98,
          intelligence: 94,
          technique: 116,
        },
        imageUrl: "/images/characters/victor_blade.jpg",
      }),
      new Character({
        id: String(this.idCounter++),
        firstName: "Goldie",
        lastName: "Lemmon",
        names: {
          west: { firstName: "Goldie", lastName: "Lemmon" },
          vo: { firstName: "Kinako", lastName: "Nanobana" },
        },
        element: "fire",
        defaultPosition: "defender",
        learnedHissatsus: [
          { id: "11", learnLevel: 1 },
          { id: "12", learnLevel: 17 },
        ],
        statistics: {
          kick: 124,
          control: 114,
          pressure: 130,
          physical: 106,
          agility: 112,
          intelligence: 112,
          technique: 104,
        },
        imageUrl: "/images/characters/goldie_lemmon.jpg",
      }),
      new Character({
        id: String(this.idCounter++),
        firstName: "Bailong",
        lastName: "",
        names: {
          west: { firstName: "Bailong", lastName: "" },
          vo: { firstName: "Hakuryuu", lastName: "" },
        },
        element: "wind",
        defaultPosition: "forward",
        learnedHissatsus: [
          { id: "9", learnLevel: 1 },
          { id: "10", learnLevel: 20 },
        ],
        statistics: {
          kick: 184,
          control: 148,
          pressure: 74,
          physical: 62,
          agility: 96,
          intelligence: 108,
          technique: 128,
        },
        imageUrl: "/images/characters/bailong.jpg",
      }),
      new Character({
        id: String(this.idCounter++),
        firstName: "Arion",
        lastName: "Sherwind",
        names: {
          west: { firstName: "Arion", lastName: "Sherwind" },
          vo: { firstName: "Tenma", lastName: "Matsukaze" },
        },
        element: "wind",
        defaultPosition: "midfielder",
        learnedHissatsus: [
          { id: "3", learnLevel: 1 },
          { id: "4", learnLevel: 14 },
        ],
        statistics: {
          kick: 122,
          control: 102,
          pressure: 108,
          physical: 88,
          agility: 110,
          intelligence: 102,
          technique: 170,
        },
        imageUrl: "/images/characters/arion_sherwind.jpg",
      }),
      new Character({
        id: String(this.idCounter++),
        firstName: "Nathan",
        lastName: "Swift",
        names: {
          west: { firstName: "Nathan", lastName: "Swift" },
          vo: { firstName: "Ichirouta", lastName: "Kazemaru" },
        },
        element: "wind",
        defaultPosition: "defender",
        learnedHissatsus: [
          { id: "13", learnLevel: 1 },
          { id: "14", learnLevel: 13 },
        ],
        statistics: {
          kick: 82,
          control: 98,
          pressure: 150,
          physical: 110,
          agility: 90,
          intelligence: 114,
          technique: 118,
        },
        imageUrl: "/images/characters/nathan_swift.jpg",
      }),
    ];
  }

  async findAll(): Promise<Character[]> {
    return this.characters;
  }

  async findById(id: string): Promise<Character | null> {
    const character = this.characters.find((c) => c.id === id);
    return character || null;
  }

  async create(data: ICharacterData): Promise<string> {
    const newCharacter = new Character({ id: String(this.idCounter++), ...data });
    this.characters.push(newCharacter);
    return newCharacter.id;
  }

  async createMultiple(characters: ICharacterData[]): Promise<string[]> {
    return Promise.all(characters.map((character) => this.create(character)));
  }

  async updateById(id: string, character: Partial<ICharacterData>): Promise<boolean> {
    const exists = this.characters.some((c) => c.id === id);
    if (!exists) {
      return false;
    }
    this.characters = this.characters.map((c) => (c.id === id ? new Character({ ...c, ...character, id: c.id }) : c));
    return true;
  }
}
