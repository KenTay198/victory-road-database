"use server";

import StubMetaService from "@infrastructure/meta/stub/meta.stub-service";
import type IMetaService from "@meta/meta.service";

declare global {
  var metaService: IMetaService | undefined;
}

const defaultType = "stub";

export async function getMetaServiceInstance(type = defaultType): Promise<IMetaService> {
  switch (type) {
    case "stub":
      return new StubMetaService();
    default:
      throw new Error(`Unknown meta service type: ${type}`);
  }
}
