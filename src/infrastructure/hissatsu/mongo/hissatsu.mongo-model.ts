import type { IHissatsuData } from "@hissatsu/hissatsu.types";
import { hissatsuTypes, hissatsuCharacteristics } from "@hissatsu/hissatsu.variables";
import { elements } from "@domain/shared/variables";
import mongoose, { type ObjectId } from "mongoose";

export interface IHissatsuDocument extends IHissatsuData, mongoose.Document<ObjectId> {}

const HissatsuNamesSchema = new mongoose.Schema(
  {
    fr: { type: String, required: true },
    en: { type: String, required: true },
    jp: { type: String, required: true },
  },
  { _id: false },
);

const HissatsuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    names: { type: HissatsuNamesSchema, required: true },
    type: {
      type: String,
      required: true,
      enum: hissatsuTypes,
    },
    element: {
      type: String,
      required: true,
      enum: elements,
    },
    power: { type: Number, required: true },
    cost: { type: Number, required: true },
    characteristic: {
      type: String,
      enum: hissatsuCharacteristics,
    },
    learnLevel: { type: Number },
  },
  { timestamps: true },
);

const HissatsuModel = mongoose.model<IHissatsuDocument>("Hissatsu", HissatsuSchema);

export default HissatsuModel;
