import { IRoster } from "@/types/roster.types";
import { Schema, model, models } from "mongoose";

const RosterSchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    characters: {
      type: [Schema.Types.ObjectId],
      ref: "Character",
      required: true,
      validate: {
        validator: function (v: string[]) {
          return v.length <= 16;
        },
        message: (props: any) =>
          `You can only add up to 16 characters. You provided ${props.value.length}.`,
      },
    },
  },
  { timestamps: true }
);

if (models.Roster) delete models.Roster;

const Roster = model<IRoster>("Roster", RosterSchema);

export default Roster;
