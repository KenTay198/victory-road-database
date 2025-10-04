"use server";
import StubSettingsService from "@infrastructure/settings/stub/settings.stub-service";
import StubCharacterService from "@infrastructure/character/stub/character.stub-service";
import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";
import StubMetaService from "@infrastructure/meta/stub/meta.stub-service";

const getCharacterServiceInstance = (type = process.env.NODE_ENV === "development" ? "stub" : "mongo") => {
  switch (type) {
    case "stub":
      return new StubCharacterService();
    default:
      throw new Error(`Unknown character service type: ${type}`);
  }
};

const getMetaServiceInstance = (type = process.env.NODE_ENV === "development" ? "stub" : "mongo") => {
  switch (type) {
    case "stub":
      return new StubMetaService();
    default:
      throw new Error(`Unknown character service type: ${type}`);
  }
};

const getHissatsuServiceInstance = (type = process.env.NODE_ENV === "development" ? "stub" : "mongo") => {
  switch (type) {
    case "stub":
      return new StubHissatsuService();
    default:
      throw new Error(`Unknown character service type: ${type}`);
  }
};

const getSettingsServiceInstance = (type = process.env.NODE_ENV === "development" ? "stub" : "mongo") => {
  switch (type) {
    case "stub":
      return new StubSettingsService();
    default:
      throw new Error(`Unknown character service type: ${type}`);
  }
};

const settingsService = getSettingsServiceInstance();
const characterService = getCharacterServiceInstance();
const hissatsuService = getHissatsuServiceInstance();
const metaService = getMetaServiceInstance();

export async function getServices() {
  return {
    settingsService,
    characterService,
    hissatsuService,
    metaService,
  };
}
