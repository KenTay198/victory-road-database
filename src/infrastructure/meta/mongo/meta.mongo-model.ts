import type { IAdvancedStatistics, IStatistics } from "@character/character.types";
import type { IMeta } from "@meta/meta.types";
import mongoose, { type ObjectId } from "mongoose";

export interface IMetaDocument extends IMeta {
  _id: ObjectId | string;
  lastUpdatedAt: Date;
}

const StatisticsSchema = new mongoose.Schema<IStatistics>(
  {
    kick: { type: Number, required: true },
    control: { type: Number, required: true },
    pressure: { type: Number, required: true },
    physical: { type: Number, required: true },
    agility: { type: Number, required: true },
    intelligence: { type: Number, required: true },
    technique: { type: Number, required: true },
  },
  { _id: false },
);

const AdvancedStatisticsSchema = new mongoose.Schema<IAdvancedStatistics>(
  {
    shoot: { type: Number, required: true },
    focusAtt: { type: Number, required: true },
    scrambleAtt: { type: Number, required: true },
    faceoffAtt: { type: Number, required: true },
    totalAtt: { type: Number, required: true },
    wall: { type: Number, required: true },
    focusDef: { type: Number, required: true },
    scrambleDef: { type: Number, required: true },
    faceoffDef: { type: Number, required: true },
    totalDef: { type: Number, required: true },
    gk: { type: Number, required: true },
  },
  { _id: false },
);

const StatRangeSchema = new mongoose.Schema(
  {
    min: { type: StatisticsSchema, required: true },
    mean: { type: StatisticsSchema, required: true },
    max: { type: StatisticsSchema, required: true },
  },
  { _id: false },
);

const AdvancedStatRangeSchema = new mongoose.Schema(
  {
    min: { type: AdvancedStatisticsSchema, required: true },
    mean: { type: AdvancedStatisticsSchema, required: true },
    max: { type: AdvancedStatisticsSchema, required: true },
  },
  { _id: false },
);

const MetaSchema = new mongoose.Schema(
  {
    statRange: { type: StatRangeSchema, required: true },
    advancedStatRange: { type: AdvancedStatRangeSchema, required: true },
    initialized: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const MetaModel = mongoose.model<IMetaDocument>("Meta", MetaSchema);

export default MetaModel;
