import type { IStatistics } from "@character/character.types";
import AdvancedStatistics from "./advancedStatistics.entity";

export default class Statistics implements IStatistics {
  public kick: number;
  public control: number;
  public pressure: number;
  public physical: number;
  public agility: number;
  public intelligence: number;
  public technique: number;
  public total: number;

  constructor(data: Omit<IStatistics, "total">) {
    this.kick = data.kick;
    this.control = data.control;
    this.pressure = data.pressure;
    this.physical = data.physical;
    this.agility = data.agility;
    this.intelligence = data.intelligence;
    this.technique = data.technique;
    this.total = this.getTotalStats();
  }

  //#region Statistics calculations
  getTotalStats(): number {
    return Object.keys(this.toJSON())
      .filter((e) => e !== "total")
      .reduce((acc, key) => acc + this[key as keyof IStatistics], 0);
  }

  getAdvancedStatistics(): AdvancedStatistics {
    const shoot = this.kick + this.control;
    const focusAtt = this.technique + this.control;
    const scrambleAtt = this.intelligence + this.physical;
    const faceoffAtt = focusAtt + scrambleAtt;
    const totalAtt = shoot + faceoffAtt;
    const wall = this.physical + this.pressure;
    const focusDef = this.technique + this.intelligence;
    const scrambleDef = this.intelligence + this.pressure;
    const faceoffDef = focusDef + scrambleDef;
    const totalDef = wall + faceoffDef;
    const gk = this.physical + this.agility;

    return new AdvancedStatistics({
      shoot,
      focusAtt,
      scrambleAtt,
      faceoffAtt,
      totalAtt,
      wall,
      focusDef,
      scrambleDef,
      faceoffDef,
      totalDef,
      gk,
    });
  }

  mean(stats: IStatistics): Statistics {
    return this.add(stats).multiply(0.5);
  }

  add(stats: IStatistics): Statistics {
    return new Statistics({
      kick: this.kick + stats.kick,
      control: this.control + stats.control,
      pressure: this.pressure + stats.pressure,
      physical: this.physical + stats.physical,
      agility: this.agility + stats.agility,
      intelligence: this.intelligence + stats.intelligence,
      technique: this.technique + stats.technique,
    });
  }

  multiply(factor: number): Statistics {
    return new Statistics({
      kick: this.kick * factor,
      control: this.control * factor,
      pressure: this.pressure * factor,
      physical: this.physical * factor,
      agility: this.agility * factor,
      intelligence: this.intelligence * factor,
      technique: this.technique * factor,
    });
  }
  //#endregion

  //#region Initialisation
  static initialize(defaultValue = 0): Statistics {
    return new Statistics({
      kick: defaultValue,
      control: defaultValue,
      pressure: defaultValue,
      physical: defaultValue,
      agility: defaultValue,
      intelligence: defaultValue,
      technique: defaultValue,
    });
  }
  //#endregion

  //#region Utils
  toJSON(): IStatistics {
    return {
      kick: this.kick,
      control: this.control,
      pressure: this.pressure,
      physical: this.physical,
      agility: this.agility,
      intelligence: this.intelligence,
      technique: this.technique,
      total: this.total,
    };
  }

  static fromJSON(data: IStatistics): Statistics {
    return new Statistics(data);
  }
  //#endregion
}
