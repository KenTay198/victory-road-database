"use server";
import MongoMetaService from "@infrastructure/meta/mongo/meta.mongo-service";
import StubMetaService from "@infrastructure/meta/stub/meta.stub-service";
import type IMetaService from "@meta/meta.service";
import { getCharacterServiceInstance } from "./character.actions";
import CalculateMeta from "@meta/usecases/CalculateMeta";
import type { IMeta } from "@meta/meta.types";

declare global {
  var metaService: IMetaService | undefined;
}

const defaultType = process.env.DEFAULT_ACTION_TYPE;

export async function getMetaServiceInstance(type = defaultType): Promise<IMetaService> {
  if (global.metaService) return global.metaService;
  switch (type) {
    case "stub":
      global.metaService = new StubMetaService();
      break;
    case "mongo":
      global.metaService = new MongoMetaService();
      break;
    default:
      throw new Error(`Unknown meta service type: ${type}`);
  }
  return global.metaService;
}

export async function calculateMetaAction(): Promise<IMeta> {
  console.log("[Action - calculateMeta]");
  const metaService = await getMetaServiceInstance();
  const characterService = await getCharacterServiceInstance();
  const meta = await new CalculateMeta({ metaService, characterService }).execute();
  return meta.toJSON();
}
