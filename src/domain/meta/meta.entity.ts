import { advancedStatKeys, statKeys } from "@character/character.variables";
import type { IMeta } from "./meta.types";
import Statistics from "@character/entities/statistics.entity";
import type { IAdvancedStatistics, IStatistics } from "@character/character.types";
import type Character from "@character/entities/character.entity";
import AdvancedStatistics from "@character/entities/advancedStatistics.entity";

export default class Meta implements IMeta {
  statRange: { min: Statistics; mean: Statistics; max: Statistics };
  advancedStatRange: { min: AdvancedStatistics; mean: AdvancedStatistics; max: AdvancedStatistics };
  initialized = false;

  constructor() {
    this.statRange = {
      min: Statistics.initialize(Infinity),
      mean: Statistics.initialize(),
      max: Statistics.initialize(),
    };
    this.advancedStatRange = {
      min: this.statRange.min.getAdvancedStatistics(),
      mean: this.statRange.mean.getAdvancedStatistics(),
      max: this.statRange.max.getAdvancedStatistics(),
    };
  }

  static calculateStats(characters: Character[]): Meta {
    if (characters.length === 0) {
      throw new Error("Cannot initialize Meta with an empty character list.");
    }
    const meta = new Meta();
    meta.statRange.mean = new Statistics(characters[0].statistics);
    meta.advancedStatRange.mean = new AdvancedStatistics(characters[0].advancedStatistics);
    for (const character of characters) {
      meta.statRange.mean = meta.statRange.mean.mean(character.statistics);
      meta.advancedStatRange.mean = meta.advancedStatRange.mean.mean(character.advancedStatistics);
      meta.compareCharacter(character);
    }
    meta.initialized = true;
    return meta;
  }

  private compareCharacter(character: Character): void {
    const stats = character.statistics;
    const advancedStats = stats.getAdvancedStatistics();

    for (const stat of statKeys) {
      const key = stat as keyof IStatistics;
      this.statRange.min[key] = Math.min(this.statRange.min[key], stats[key]);
      this.statRange.max[key] = Math.max(this.statRange.max[key], stats[key]);
    }

    for (const stat of advancedStatKeys) {
      const key = stat as keyof IAdvancedStatistics;
      this.advancedStatRange.min[key] = Math.min(this.advancedStatRange.min[key], advancedStats[key]);
      this.advancedStatRange.max[key] = Math.max(this.advancedStatRange.max[key], advancedStats[key]);
    }
  }

  //#region Utils
  toJSON(): IMeta {
    return {
      statRange: { min: this.statRange.min.toJSON(), max: this.statRange.max.toJSON() },
      advancedStatRange: { min: this.advancedStatRange.min, max: this.advancedStatRange.max },
      initialized: this.initialized,
    };
  }
  //#endregion
}
