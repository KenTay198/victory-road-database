"use server";

import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import type { IDefaultHissatsuFindParams, IHissatsu } from "@hissatsu/hissatsu.types";
import FindAllHissatsus from "@hissatsu/usecases/FindAllHissatsus";
import CreateHissatsus from "@hissatsu/usecases/CreateHissatsus";

declare global {
  var hissatsuService: IHissatsuService | undefined;
}

const defaultType = process.env.NODE_ENV === "development" ? "stub" : "mongo";

export async function getHissatsuServiceInstance(type = defaultType): Promise<IHissatsuService> {
  if (globalThis.hissatsuService) return globalThis.hissatsuService;
  switch (type) {
    case "stub":
      globalThis.hissatsuService = new StubHissatsuService();
      break;
    default:
      throw new Error(`Unknown character service type: ${type}`);
  }

  return globalThis.hissatsuService;
}

export async function findAllHissatsusAction(params?: IDefaultHissatsuFindParams): Promise<IHissatsu[]> {
  console.log("[Action] Hissatsu : findAllHissatsus");
  const hissatsuService = await getHissatsuServiceInstance();
  const hissatsus = await new FindAllHissatsus(hissatsuService).execute();
  if (hissatsus && hissatsus.length > 0) {
    return hissatsus.map((h) => {
      if (params?.locale) {
        h.setLocalizedName(params.locale);
      }
      return h.toJSON();
    });
  }
  return [];
}

export async function createHissatsusAction(hissatsus: IHissatsu[]): Promise<string[]> {
  console.log("[Action] Hissatsu : createHissatsus");
  const hissatsuService = await getHissatsuServiceInstance();
  const ids = await new CreateHissatsus(hissatsuService).execute(hissatsus);
  return ids;
}
