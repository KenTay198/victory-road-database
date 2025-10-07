"use server";

import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import type { IHissatsu } from "@hissatsu/hissatsu.types";

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

export async function findAllHissatsusAction(): Promise<IHissatsu[]> {
  const hissatsuService = await getHissatsuServiceInstance();
  const hissatsus = await hissatsuService.findAll();
  if (hissatsus && hissatsus.length > 0) {
    return hissatsus.map((h) => h.toJSON());
  }
  return [];
}
