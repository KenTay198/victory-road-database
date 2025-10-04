import type {
  CharacterArchetype,
  CharacterElement,
  CharacterLocale,
  CharacterNames,
  IAdvancedStatistics,
  ICharacter,
  ILearnedHissatsu,
  IStatistics,
  Position,
} from "@character/character.types";
import type Meta from "@meta/meta.entity";
import Statistics from "@character/entities/statistics.entity";
import type AdvancedStatistics from "./advancedStatistics.entity";
import { advancedStatKeys } from "@character/character.variables";
import type Hissatsu from "@hissatsu/hissatsu.entity";
import type { HissatsuCharacteristic, HissatsuType, HissatsuTypeAndCharacteristic } from "@hissatsu/hissatsu.types";

export default class Character implements ICharacter {
  id: string;
  firstName: string;
  lastName: string = "";
  fullName: string = "";
  names?: CharacterNames;
  element: CharacterElement;
  defaultPosition: Position;
  statistics: Statistics;
  advancedStatistics: AdvancedStatistics;
  imageUrl?: string;
  archetypes: CharacterArchetype[];
  learnedHissatsus: ILearnedHissatsu[];
  hissatsus: Hissatsu[];
  private meta?: Meta;
  private currentLocale?: CharacterLocale;

  constructor(data: {
    id: string;
    firstName: string;
    lastName?: string;
    names?: CharacterNames;
    element: CharacterElement;
    defaultPosition: Position;
    statistics: Omit<IStatistics, "total">;
    imageUrl?: string;
    learnedHissatsus?: ILearnedHissatsu[];
    hissatsus?: Hissatsu[];
  }) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName ?? "";
    this.names = data.names;
    this.element = data.element;
    this.defaultPosition = data.defaultPosition;
    this.statistics = new Statistics(data.statistics);
    this.imageUrl = data.imageUrl;
    this.learnedHissatsus = data.learnedHissatsus ?? [];

    this.hissatsus = [];

    this.fullName = this.getFullName();
    this.advancedStatistics = this.statistics.getAdvancedStatistics();

    this.archetypes = this.getArchetypes();
  }

  //#region Name
  getFullName(): string {
    if (this.currentLocale === "vo") {
      return [this.lastName, this.firstName].filter(Boolean).join(" ");
    }
    return [this.firstName, this.lastName].filter(Boolean).join(" ");
  }

  setLocalizedName(locale: CharacterLocale): void {
    if (this.names?.[locale]) {
      this.currentLocale = locale;
      this.firstName = this.names[locale].firstName;
      this.lastName = this.names[locale].lastName ?? "";
      this.fullName = this.getFullName();
    }
  }
  //#endregion

  //#region Archetypes
  getArchetypes(): CharacterArchetype[] {
    const archetypes: CharacterArchetype[] = [];
    if (!this.meta || !this.meta.initialized) return [];

    const ratio = this.meta.statRange.mean.total / this.statistics.total;

    // Normalize character stats
    const normalizedStats: Statistics = this.statistics.multiply(ratio);
    const normalizedAdvancedStats: AdvancedStatistics = normalizedStats.getAdvancedStatistics();

    // Retrieve all stats above average
    const aboveAverageStats: { property: string; value: number }[] = [];
    for (const stat of advancedStatKeys) {
      const key = stat as keyof IAdvancedStatistics;

      if (normalizedAdvancedStats[key] > this.meta.advancedStatRange.mean[key]) {
        aboveAverageStats.push({
          property: key,
          value: normalizedAdvancedStats[key],
        });
      }
    }

    // Analyse above average stats to determine archetypes
    const isAbove = (key: string) => aboveAverageStats.find((stat) => stat.property === key);
    const hasHissatsus = this.findAllHissatsuTypesAndCharacteristics();

    if (isAbove("shoot") && hasHissatsus.kick) {
      archetypes.push("striker");
      if (isAbove("focusAtt") || isAbove("scrambleAtt")) archetypes.push("forward");
    }

    if (hasHissatsus.long) archetypes.push("long-shooter");

    if (isAbove("faceoffAtt") && hasHissatsus.kick) archetypes.push("attacking-midfielder");

    if (isAbove("faceoffAtt") && isAbove("faceoffDef")) archetypes.push("central-midfielder");

    if (isAbove("focusAtt") && isAbove("faceoffDef") && hasHissatsus.defense) archetypes.push("defensive-midfielder");

    if (isAbove("faceoffDef") && hasHissatsus.dribble) {
      archetypes.push("defender");
      if (isAbove("wall") && hasHissatsus.block) archetypes.push("wall-defender");
    }

    if (isAbove("gk") && hasHissatsus.keep) archetypes.push("goalkeeper");

    if (archetypes.length === 0) archetypes.push("none");

    return archetypes;
  }
  //#endregion

  //#region Hissatsu
  findHissatsu(id: string): Hissatsu | undefined {
    return this.hissatsus.find((h) => h.id === id);
  }

  findHissatsusByType(type: HissatsuType): Hissatsu[] {
    return this.hissatsus.filter((h) => h.type === type);
  }

  hasHissatsuByType(type: HissatsuType): boolean {
    return this.hissatsus.some((h) => h.type === type);
  }

  findHissatsusByCharacteristic(characteristic: HissatsuCharacteristic): Hissatsu[] {
    return this.hissatsus.filter((h) => h.characteristic === characteristic);
  }

  hasHissatsuByCharacteristic(characteristic: HissatsuCharacteristic): boolean {
    return this.hissatsus.some((h) => h.characteristic === characteristic);
  }

  findAllHissatsuTypesAndCharacteristics(): HissatsuTypeAndCharacteristic {
    const typesAndCharacteristics: HissatsuTypeAndCharacteristic = {};
    for (const h of this.hissatsus) {
      if (h.type && !typesAndCharacteristics[h.type]) typesAndCharacteristics[h.type] = true;
      if (h.characteristic && !typesAndCharacteristics[h.characteristic])
        typesAndCharacteristics[h.characteristic] = true;
    }
    return typesAndCharacteristics;
  }
  //#endregion

  //#region Setters
  setMeta(meta: Meta): void {
    this.meta = meta;
  }
  //#endregion

  //#region Utils
  toJSON(): ICharacter {
    return {
      id: this.id,
      fullName: this.fullName,
      firstName: this.firstName,
      lastName: this.lastName,
      names: this.names,
      element: this.element,
      defaultPosition: this.defaultPosition,
      statistics: this.statistics.toJSON(),
      imageUrl: this.imageUrl,
      archetypes: this.archetypes,
      learnedHissatsus: this.learnedHissatsus,
    };
  }

  static fromJSON(data: ICharacter): Character {
    const character = new Character({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      names: data.names,
      element: data.element,
      defaultPosition: data.defaultPosition,
      statistics: data.statistics,
      imageUrl: data.imageUrl,
      learnedHissatsus: data.learnedHissatsus,
    });
    character.archetypes = data.archetypes;
    return character;
  }
  //#endregion
}
