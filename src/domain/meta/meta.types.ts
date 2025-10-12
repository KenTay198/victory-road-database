import type { IAdvancedStatistics, IStatistics } from "@character/character.types";

export interface IMeta {
  statRange: IStatRange<IStatistics>;
  advancedStatRange: IStatRange<IAdvancedStatistics>;
  initialized: boolean;
  lastUpdatedAt: Date;
}

export interface IStatRange<T = IStatistics> {
  min: T;
  mean: T;
  max: T;
}
