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
      .filter((e) => e !== "total")
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
  //#endregion

  //#region Initialisation
  static initialize(defaultValue = 0): AdvancedStatistics {
    return new AdvancedStatistics({
      totalAtt: defaultValue,
      faceoffAtt: defaultValue,
      shoot: defaultValue,
      focusAtt: defaultValue,
      scrambleAtt: defaultValue,
      totalDef: defaultValue,
      wall: defaultValue,
      faceoffDef: defaultValue,
      focusDef: defaultValue,
      scrambleDef: defaultValue,
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
  //#endregion
}
