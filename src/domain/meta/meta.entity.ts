import { advancedStatKeys, statKeys } from "@character/character.variables";
import type { IMeta, IStatRange } from "./meta.types";
import Statistics from "@character/entities/statistics.entity";
import type { IAdvancedStatistics, IStatistics } from "@character/character.types";
import type Character from "@character/entities/character.entity";
import AdvancedStatistics from "@character/entities/advancedStatistics.entity";

export default class Meta implements IMeta {
  statRange: IStatRange<Statistics>;
  advancedStatRange: IStatRange<AdvancedStatistics>;
  initialized = false;
  lastUpdatedAt: Date;

  constructor(data?: Partial<IMeta>) {
    this.statRange = {
      min: data?.statRange?.min ? Statistics.fromJSON(data.statRange.min) : Statistics.initialize(Infinity),
      mean: data?.statRange?.mean ? Statistics.fromJSON(data.statRange.mean) : Statistics.initialize(),
      max: data?.statRange?.max ? Statistics.fromJSON(data.statRange.max) : Statistics.initialize(),
    };
    this.advancedStatRange = {
      min: this.statRange.min.getAdvancedStatistics(),
      mean: this.statRange.mean.getAdvancedStatistics(),
      max: this.statRange.max.getAdvancedStatistics(),
    };
    this.initialized = data?.initialized ?? false;
    this.lastUpdatedAt = data?.lastUpdatedAt || new Date();
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
      statRange: {
        min: this.statRange.min.toJSON(),
        mean: this.statRange.mean.toJSON(),
        max: this.statRange.max.toJSON(),
      },
      advancedStatRange: {
        min: this.advancedStatRange.min.toJSON(),
        mean: this.advancedStatRange.mean.toJSON(),
        max: this.advancedStatRange.max.toJSON(),
      },
      initialized: this.initialized,
      lastUpdatedAt: this.lastUpdatedAt,
    };
  }

  static fromJSON(data: IMeta): Meta {
    return new Meta({
      statRange: {
        min: Statistics.fromJSON(data.statRange.min),
        mean: Statistics.fromJSON(data.statRange.mean),
        max: Statistics.fromJSON(data.statRange.max),
      },
      advancedStatRange: {
        min: AdvancedStatistics.fromJSON(data.advancedStatRange.min),
        mean: AdvancedStatistics.fromJSON(data.advancedStatRange.mean),
        max: AdvancedStatistics.fromJSON(data.advancedStatRange.max),
      },
      initialized: data.initialized,
      lastUpdatedAt: data.lastUpdatedAt,
    });
    //#endregion
  }
}
