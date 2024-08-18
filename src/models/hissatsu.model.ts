import { HissatsuCharacteristic, hissatsuTypes } from "@/types/hissatsu.types";
import { elements } from "@utils/variables";
import { Schema, model, models } from "mongoose";

const HissatsuSchema = new Schema(
  {
    name: { type: String, required: true },
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
    characteristic: {
      type: String,
      enum: HissatsuCharacteristic,
    },
  },
  { timestamps: true }
);

if (models.Hissatsu) delete models.Hissatsu;

const Hissatsu = model("Hissatsu", HissatsuSchema);

export default Hissatsu;
