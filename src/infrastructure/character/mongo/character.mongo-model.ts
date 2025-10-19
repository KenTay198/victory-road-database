import type { CharacterNames, ICharacterData } from "@character/character.types";
import { positions } from "@character/character.variables";
import mongoose, { type ObjectId } from "mongoose";

export interface ICharacterDocument extends Omit<ICharacterData, "learnedHissatsus"> {
  _id: ObjectId | string;
  learnedHissatsus: { hissatsuId: ObjectId | string; learnLevel: number }[];
}

const LearnedHissatsuSchema = new mongoose.Schema(
  {
    hissatsuId: { type: mongoose.Schema.Types.ObjectId, ref: "Hissatsu", required: true },
    learnLevel: { type: Number, required: true },
  },
  { _id: false },
);

const CharacterNamesSchema = new mongoose.Schema<CharacterNames>(
  {
    west: {
      firstName: { type: String, required: true },
      lastName: { type: String },
    },
    vo: {
      firstName: { type: String, required: true },
      lastName: { type: String },
    },
  },
  { _id: false },
);

const CharacterSchema = new mongoose.Schema<ICharacterDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    names: CharacterNamesSchema,
    element: { type: String, required: true },
    defaultPosition: { type: String, enum: positions, required: true },
    learnedHissatsus: [LearnedHissatsuSchema],
    statistics: {
      kick: { type: Number, required: true },
      control: { type: Number, required: true },
      pressure: { type: Number, required: true },
      physical: { type: Number, required: true },
      agility: { type: Number, required: true },
      intelligence: { type: Number, required: true },
      technique: { type: Number, required: true },
    },
    imageUrl: { type: String },
  },
  { timestamps: true },
);

if (process.env.NODE_ENV === "development" && mongoose.models.Character) {
  mongoose.deleteModel("Character");
}

const CharacterModel = mongoose.model("Character", CharacterSchema);

export default CharacterModel;
