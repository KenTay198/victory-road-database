import type ICharacterAdapter from "@character/character.adapter";
import type { ICharacterDocument } from "./character.mongo-model";
import Character from "@character/entities/character.entity";
import type { ICharacterData } from "@character/character.types";

export default class MongoCharacterAdapter implements ICharacterAdapter {
  toEntity(data: ICharacterDocument): Character {
    return new Character({
      id: data._id.toString(),
      firstName: data.firstName,
      lastName: data.lastName,
      names: data.names,
      element: data.element,
      defaultPosition: data.defaultPosition,
      learnedHissatsus: data.learnedHissatsus.map(({ hissatsuId, learnLevel }) => ({
        id: hissatsuId ? hissatsuId.toString() : "",
        learnLevel,
      })),
      statistics: data.statistics,
      imageUrl: data.imageUrl,
    });
  }

  toDatabase(character: Character): Partial<ICharacterData> & { _id: string } {
    const json = character.toJSON();
    return {
      _id: json.id,
      firstName: json.firstName,
      lastName: json.lastName,
      names: json.names,
      element: json.element,
      defaultPosition: json.defaultPosition,
      learnedHissatsus: json.learnedHissatsus,
      statistics: json.statistics,
      imageUrl: json.imageUrl,
    };
  }
}
