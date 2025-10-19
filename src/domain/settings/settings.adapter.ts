import type Settings from "./settings.entity";

export default interface ISettingsAdapter {
  toEntity(data: any): Settings;
  toDatabase(settings: Settings): any;
}
