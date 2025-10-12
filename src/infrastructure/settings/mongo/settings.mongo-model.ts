import type { ISettings } from "@settings/settings.types";
import { hissatsuLocales } from "@hissatsu/hissatsu.variables";
import mongoose, { type ObjectId } from "mongoose";
import { characterLocales } from "@character/character.variables";

export interface ISettingsDocument extends ISettings, mongoose.Document<ObjectId> {
  userId: string;
}

const SettingsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    hissatsuLocale: {
      type: String,
      required: true,
      enum: hissatsuLocales,
    },
    characterLocale: {
      type: String,
      required: true,
      enum: characterLocales,
    },
  },
  { timestamps: true },
);

if (process.env.NODE_ENV === "development" && mongoose.models.Settings) {
  mongoose.deleteModel("Settings");
}

const SettingsModel = mongoose.model<ISettingsDocument>("Settings", SettingsSchema);

export default SettingsModel;
