import Character from "@character/entities/character.entity";
import type { ICharacterData } from "@character/character.types";

export default class FakeCharacter extends Character {
  constructor({ firstName, lastName, statistics, names }: Partial<ICharacterData> = {}) {
    super({
      id: "name",
      firstName: firstName || "First",
      lastName: lastName || "Last",
      names: names || { west: { firstName: "Nom", lastName: "Prénom" }, vo: { firstName: "First", lastName: "Last" } },
      element: "earth",
      defaultPosition: "goalkeeper",
      statistics: statistics || {
        kick: 100,
        control: 100,
        pressure: 100,
        physical: 100,
        agility: 100,
        intelligence: 100,
        technique: 100,
      },
      learnedHissatsus: [
        { id: "hissatsu1", learnLevel: 1 },
        { id: "hissatsu2", learnLevel: 5 },
      ],
    });
  }
}
