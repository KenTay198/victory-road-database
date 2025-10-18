import type { IAdvancedStatistics } from "@character/character.types";

export default class AdvancedStatistics implements IAdvancedStatistics {
  public totalAtt: number;
  public faceoffAtt: number;
  public shoot: number;
  public focusAtt: number;
  public scrambleAtt: number;
  public totalDef: number;
  public wall: number;
  public faceoffDef: number;
  public focusDef: number;
  public scrambleDef: number;
  public gk: number;

  constructor(data: IAdvancedStatistics) {
    this.totalAtt = data.totalAtt;
    this.faceoffAtt = data.faceoffAtt;
    this.shoot = data.shoot;
    this.focusAtt = data.focusAtt;
    this.scrambleAtt = data.scrambleAtt;
    this.totalDef = data.totalDef;
    this.wall = data.wall;
    this.faceoffDef = data.faceoffDef;
    this.focusDef = data.focusDef;
    this.scrambleDef = data.scrambleDef;
    this.gk = data.gk;
  }

  //#region Statistics calculations
  getTotalStats(): number {
    return Object.keys(this.toJSON())
      .filter((key) => key.includes("total") || key.includes("faceoff"))
      .reduce((acc, key) => acc + this[key as keyof IAdvancedStatistics], 0);
  }

  mean(stats: AdvancedStatistics): AdvancedStatistics {
    return this.add(stats).multiply(0.5);
  }

  add(stats: AdvancedStatistics): AdvancedStatistics {
    return new AdvancedStatistics({
      totalAtt: this.totalAtt + stats.totalAtt,
      faceoffAtt: this.faceoffAtt + stats.faceoffAtt,
      shoot: this.shoot + stats.shoot,
      focusAtt: this.focusAtt + stats.focusAtt,
      scrambleAtt: this.scrambleAtt + stats.scrambleAtt,
      totalDef: this.totalDef + stats.totalDef,
      wall: this.wall + stats.wall,
      faceoffDef: this.faceoffDef + stats.faceoffDef,
      focusDef: this.focusDef + stats.focusDef,
      scrambleDef: this.scrambleDef + stats.scrambleDef,
      gk: this.gk + stats.gk,
    });
  }

  multiply(factor: number): AdvancedStatistics {
    return new AdvancedStatistics({
      totalAtt: this.totalAtt * factor,
      faceoffAtt: this.faceoffAtt * factor,
      shoot: this.shoot * factor,
      focusAtt: this.focusAtt * factor,
      scrambleAtt: this.scrambleAtt * factor,
      totalDef: this.totalDef * factor,
      wall: this.wall * factor,
      faceoffDef: this.faceoffDef * factor,
      focusDef: this.focusDef * factor,
      scrambleDef: this.scrambleDef * factor,
      gk: this.gk * factor,
    });
  }

  round(nbDecimals = 0): AdvancedStatistics {
    return new AdvancedStatistics({
      totalAtt: Math.round(this.totalAtt * 10 ** nbDecimals) / 10 ** nbDecimals,
      faceoffAtt: Math.round(this.faceoffAtt * 10 ** nbDecimals) / 10 ** nbDecimals,
      shoot: Math.round(this.shoot * 10 ** nbDecimals) / 10 ** nbDecimals,
      focusAtt: Math.round(this.focusAtt * 10 ** nbDecimals) / 10 ** nbDecimals,
      scrambleAtt: Math.round(this.scrambleAtt * 10 ** nbDecimals) / 10 ** nbDecimals,
      totalDef: Math.round(this.totalDef * 10 ** nbDecimals) / 10 ** nbDecimals,
      wall: Math.round(this.wall * 10 ** nbDecimals) / 10 ** nbDecimals,
      faceoffDef: Math.round(this.faceoffDef * 10 ** nbDecimals) / 10 ** nbDecimals,
      focusDef: Math.round(this.focusDef * 10 ** nbDecimals) / 10 ** nbDecimals,
      scrambleDef: Math.round(this.scrambleDef * 10 ** nbDecimals) / 10 ** nbDecimals,
      gk: Math.round(this.gk * 10 ** nbDecimals) / 10 ** nbDecimals,
    });
  }
  //#endregion

  //#region Initialisation
  static initialize(defaultValue = 0): AdvancedStatistics {
    return new AdvancedStatistics({
      shoot: defaultValue,
      focusAtt: defaultValue,
      scrambleAtt: defaultValue,
      faceoffAtt: defaultValue * 2,
      totalAtt: defaultValue * 3,
      wall: defaultValue,
      focusDef: defaultValue,
      scrambleDef: defaultValue,
      faceoffDef: defaultValue * 2,
      totalDef: defaultValue * 3,
      gk: defaultValue,
    });
  }
  //#endregion

  //#region Utils
  toJSON(): IAdvancedStatistics {
    return {
      totalAtt: this.totalAtt,
      faceoffAtt: this.faceoffAtt,
      shoot: this.shoot,
      focusAtt: this.focusAtt,
      scrambleAtt: this.scrambleAtt,
      totalDef: this.totalDef,
      wall: this.wall,
      faceoffDef: this.faceoffDef,
      focusDef: this.focusDef,
      scrambleDef: this.scrambleDef,
      gk: this.gk,
    };
  }

  static fromJSON(data: IAdvancedStatistics): AdvancedStatistics {
    return new AdvancedStatistics({
      totalAtt: data.totalAtt,
      faceoffAtt: data.faceoffAtt,
      shoot: data.shoot,
      focusAtt: data.focusAtt,
      scrambleAtt: data.scrambleAtt,
      totalDef: data.totalDef,
      wall: data.wall,
      faceoffDef: data.faceoffDef,
      focusDef: data.focusDef,
      scrambleDef: data.scrambleDef,
      gk: data.gk,
    });
  }
  //#endregion
}
