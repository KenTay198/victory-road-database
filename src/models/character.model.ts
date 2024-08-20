import { elements, positions } from "@utils/variables";
import { Schema, model, models } from "mongoose";

const StatisticsSchema = new Schema(
  {
    kick: { type: Number, default: 0 },
    control: { type: Number, default: 0 },
    pressure: { type: Number, default: 0 },
    physical: { type: Number, default: 0 },
    agility: { type: Number, default: 0 },
    intelligence: { type: Number, default: 0 },
    technique: { type: Number, default: 0 },
  },
  { _id: false }
);

const CharacterHissatsuSchema = new Schema(
  {
    hissatsuId: {
      type: Schema.Types.ObjectId,
      ref: "Hissatsu",
      required: true,
    },
    learnLevel: { type: Number, default: 1 },
  },
  { _id: false }
);

const CharacterSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    element: {
      type: String,
      enum: elements.filter((e) => e !== "void"),
      required: true,
    },
    defaultPosition: { type: String, enum: positions, required: true },
    statistics: { type: StatisticsSchema, default: {} },
    hissatsus: { type: [CharacterHissatsuSchema], default: [] },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

if (models.Character) delete models.Character;

const Character = model("Character", CharacterSchema);

export default Character;
