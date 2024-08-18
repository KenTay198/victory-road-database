import {
  Archetype,
  ICharacterHissatsu,
  ICompleteStatistics,
  IStatistics,
} from "@/types/character.types";
import { advancedStatisticsLabels, statisticsLabels } from "./variables";
import IHissatsu from "@/types/hissatsu.types";

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getTotalStats = (statistics: IStatistics | ICompleteStatistics) =>
  statisticsLabels.reduce(
    (acc, curr) => acc + statistics?.[curr as keyof IStatistics] || 0,
    0
  );

export const getAdvancedStats = (
  statistics: IStatistics
): ICompleteStatistics => {
  const completeStatistics: Partial<ICompleteStatistics> = { ...statistics };

  const {
    kick,
    control,
    agility,
    intelligence,
    physical,
    pressure,
    technique,
  } = statistics;

  completeStatistics.total = getTotalStats(statistics);
  completeStatistics["shoot-att"] = kick + control;
  completeStatistics["focus-att"] = technique + control;
  completeStatistics["scramble-att"] = intelligence + physical;
  completeStatistics["wall-def"] = physical + pressure;
  completeStatistics["focus-def"] = technique + intelligence;
  completeStatistics["scramble-def"] = intelligence + pressure;
  completeStatistics["gk"] = physical + agility;
  completeStatistics["total-att"] =
    completeStatistics["shoot-att"] +
    completeStatistics["focus-att"] +
    completeStatistics["scramble-att"];
  completeStatistics["total-def"] =
    completeStatistics["wall-def"] +
    completeStatistics["focus-def"] +
    completeStatistics["scramble-def"];

  return completeStatistics as ICompleteStatistics;
};

export const getArchetypes = (
  statistics: ICompleteStatistics,
  hissatsus: ICharacterHissatsu[],
  averages: ICompleteStatistics
): Archetype[] => {
  const archetypes: Archetype[] = [];

  const ratio = averages.total / statistics.total;
  const normalizedStats: ICompleteStatistics = {
    total: 0,
    "total-att": 0,
    "shoot-att": 0,
    "focus-att": 0,
    "scramble-att": 0,
    "total-def": 0,
    "wall-def": 0,
    "focus-def": 0,
    "scramble-def": 0,
    gk: 0,
    kick: 0,
    control: 0,
    pressure: 0,
    physical: 0,
    agility: 0,
    intelligence: 0,
    technique: 0,
  };

  for (const stat of [...statisticsLabels, ...advancedStatisticsLabels]) {
    const key = stat as keyof ICompleteStatistics;
    normalizedStats[key] = parseFloat((statistics[key] * ratio).toFixed(2));
  }
  normalizedStats.total = getTotalStats(normalizedStats);

  const aboveAverage: string[] = [];

  for (const stat of advancedStatisticsLabels) {
    const key = stat as keyof ICompleteStatistics;
    if (normalizedStats[key] > averages[key]) aboveAverage.push(key);
  }

  if (
    normalizedStats["focus-att"] + normalizedStats["scramble-att"] >
    averages["focus-att"] + averages["scramble-att"]
  )
    aboveAverage.push("duel-att");

  if (
    normalizedStats["focus-def"] + normalizedStats["scramble-def"] >
    averages["focus-def"] + averages["scramble-def"]
  )
    aboveAverage.push("duel-def");

  const has = (key: keyof IHissatsu, value: string) =>
    hissatsus.some(
      ({ hissatsuId }) =>
        typeof hissatsuId === "object" && hissatsuId[key] === value
    );

  const isAbove = (key: string) => aboveAverage.includes(key);

  if (isAbove("gk") && has("type", "keep")) archetypes.push("goalkeeper");

  if (isAbove("shoot-att")) {
    archetypes.push("striker");
    if (isAbove("focus-att") || isAbove("scramble-att"))
      archetypes.push("forward");
  }

  if (isAbove("shoot-att") && has("characteristic", "long"))
    archetypes.push("long-shooter");

  if (isAbove("focus-att") && isAbove("total-att") && has("type", "dribble"))
    archetypes.push("attacking-midfielder");

  if (isAbove("duel-att") && isAbove("duel-def") && has("type", "dribble"))
    archetypes.push("central-midfielder");

  if (isAbove("focus-att") && isAbove("duel-def") && has("type", "defense"))
    archetypes.push("defensive-midfielder");

  if (isAbove("duel-def") && has("type", "defense"))
    archetypes.push("defender");

  if (isAbove("wall-def") && has("characteristic", "block"))
    archetypes.push("wall-defender");

  if (archetypes.length === 0) archetypes.push("none");

  return archetypes;
};

export const normalize = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
