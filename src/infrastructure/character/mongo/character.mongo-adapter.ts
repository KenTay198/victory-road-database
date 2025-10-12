import type ICharacterAdapter from "@character/character.adapter";
import type { ICharacterDocument } from "./character.mongo-model";
import Character from "@character/entities/character.entity";
import type { ICharacter, ICharacterData } from "@character/character.types";

export default class MongoCharacterAdapter implements ICharacterAdapter {
  toEntity(data: ICharacterDocument): Character {
    return new Character({
      id: data._id.toString(),
      firstName: data.firstName,
      lastName: data.lastName,
      names: data.names,
      element: data.element,
      defaultPosition: data.defaultPosition,
      learnedHissatsus: this.learnedHissatsusToEntity(data.learnedHissatsus),
      statistics: data.statistics,
      imageUrl: data.imageUrl,
    });
  }

  createToDatabase(character: ICharacterData): Omit<ICharacterDocument, "_id"> {
    return {
      firstName: character.firstName,
      lastName: character.lastName,
      names: character.names,
      element: character.element,
      defaultPosition: character.defaultPosition,
      learnedHissatsus: this.learnedHissatsusToDatabase(character.learnedHissatsus),
      statistics: character.statistics,
      imageUrl: character.imageUrl,
    };
  }

  updateToDatabase(character: Partial<ICharacter>): Partial<ICharacterDocument> {
    const json = character instanceof Character ? character.toJSON() : character;
    return {
      firstName: json.firstName,
      lastName: json.lastName,
      names: json.names,
      element: json.element,
      defaultPosition: json.defaultPosition,
      learnedHissatsus: json.learnedHissatsus ? this.learnedHissatsusToDatabase(json.learnedHissatsus) : [],
      statistics: json.statistics,
      imageUrl: json.imageUrl,
    };
  }

  private learnedHissatsusToEntity(
    learnedHissatsus: ICharacterDocument["learnedHissatsus"],
  ): ICharacter["learnedHissatsus"] {
    return learnedHissatsus.map(({ hissatsuId, ...e }) => ({ ...e, id: hissatsuId ? hissatsuId.toString() : "" }));
  }

  private learnedHissatsusToDatabase(
    learnedHissatsus: ICharacter["learnedHissatsus"],
  ): ICharacterDocument["learnedHissatsus"] {
    return learnedHissatsus.map(({ id, ...e }) => ({ ...e, hissatsuId: id }));
  }
}
