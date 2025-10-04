import type { IAdvancedStatistics, IStatistics } from "@character/character.types";

export interface IMeta {
  statRange: { min: IStatistics; max: IStatistics };
  advancedStatRange: { min: IAdvancedStatistics; max: IAdvancedStatistics };
  initialized: boolean;
}
