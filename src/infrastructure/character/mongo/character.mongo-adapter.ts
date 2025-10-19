import type ICharacterAdapter from "@character/character.adapter";
import type { ICharacterDocument } from "./character.mongo-model";
import Character from "@character/entities/character.entity";
import type { ICharacter, ICharacterData } from "@character/character.types";

export default class MongoCharacterAdapter implements ICharacterAdapter {
  toEntity(data: ICharacterDocument): Character {
    return new Character({
      id: data?._id.toString(),
      firstName: data.firstName,
      lastName: data.lastName,
      names: {
        west: {
          firstName: data.names.west.firstName,
          lastName: data.names.west.lastName,
        },
        vo: {
          firstName: data.names.vo.firstName,
          lastName: data.names.vo.lastName,
        },
      },
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

  updateToDatabase(character: Partial<ICharacterData>): Partial<ICharacterDocument> {
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
    return learnedHissatsus.map((e) => ({ id: e.hissatsuId ? e.hissatsuId.toString() : "", learnLevel: e.learnLevel }));
  }

  private learnedHissatsusToDatabase(
    learnedHissatsus: ICharacter["learnedHissatsus"],
  ): ICharacterDocument["learnedHissatsus"] {
    return learnedHissatsus.map((e) => ({ learnLevel: e.learnLevel, hissatsuId: e.id }));
  }
}
