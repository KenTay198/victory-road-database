"use server";

import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import type { IDefaultHissatsuFindParams, IHissatsu, IHissatsuData, IHissatsuFormData } from "@hissatsu/hissatsu.types";
import FindAllHissatsus from "@hissatsu/usecases/FindAllHissatsus";
import FindHissatsuById from "@hissatsu/usecases/FindHissatsuById";
import CreateHissatsu from "@hissatsu/usecases/CreateHissatsu";
import CreateHissatsus from "@hissatsu/usecases/CreateHissatsus";
import UpdateHissatsu from "@hissatsu/usecases/UpdateHissatsu";
import MongoHissatsuService from "@infrastructure/hissatsu/mongo/hissatsu.mongo-service";

declare global {
  var hissatsuService: IHissatsuService | undefined;
}

const defaultType = process.env.DEFAULT_ACTION_TYPE;

export async function getHissatsuServiceInstance(type = defaultType): Promise<IHissatsuService> {
  if (globalThis.hissatsuService) return globalThis.hissatsuService;
  switch (type) {
    case "mongo":
      globalThis.hissatsuService = new MongoHissatsuService();
      break;
    case "stub":
      globalThis.hissatsuService = new StubHissatsuService();
      break;
    default:
      throw new Error(`Unknown hissatsu service type: ${type}`);
  }

  return globalThis.hissatsuService;
}

export async function findHissatsuByIdAction(
  id: string,
  params?: IDefaultHissatsuFindParams,
): Promise<IHissatsu | null> {
  console.log("[Action - findHissatsuById]");
  try {
    const hissatsuService = await getHissatsuServiceInstance();
    const hissatsu = await new FindHissatsuById(hissatsuService).execute(id);
    if (hissatsu) {
      if (params?.locale) {
        hissatsu.setLocalizedName(params.locale);
      }
      return hissatsu.toJSON();
    }
    return null;
  } catch (error) {
    console.error("[Action - findHissatsuById] error:", error);
    return null;
  }
}

export async function findAllHissatsusAction(params?: IDefaultHissatsuFindParams): Promise<IHissatsu[]> {
  console.log("[Action] Hissatsu : findAllHissatsus");
  try {
    const hissatsuService = await getHissatsuServiceInstance();
    const hissatsus = await new FindAllHissatsus(hissatsuService).execute();
    if (hissatsus && hissatsus.length > 0) {
      const hissatsusJSON = hissatsus.map((h) => {
        if (params?.locale) {
          h.setLocalizedName(params.locale);
        }
        return h.toJSON();
      });
      return hissatsusJSON;
    }
  } catch (error) {
    console.error("[Action - findAllHissatsus] error:", error);
  }
  return [];
}

export async function createHissatsuAction(hissatsuData: IHissatsuFormData): Promise<string> {
  console.log("[Action - createHissatsu]");
  const hissatsuService = await getHissatsuServiceInstance();
  return await new CreateHissatsu(hissatsuService).execute(hissatsuData);
}

export async function createHissatsusAction(hissatsus: IHissatsuData[]): Promise<string[]> {
  console.log("[Action] Hissatsu : createHissatsus");
  const hissatsuService = await getHissatsuServiceInstance();
  const ids = await new CreateHissatsus(hissatsuService).execute(hissatsus);
  return ids;
}

export async function updateHissatsuAction(id: string, hissatsuData: IHissatsuFormData): Promise<boolean> {
  console.log("[Action - updateHissatsu]");
  const hissatsuService = await getHissatsuServiceInstance();
  return await new UpdateHissatsu(hissatsuService).execute(id, hissatsuData);
}
