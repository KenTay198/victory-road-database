"use server";

import StubMetaService from "@infrastructure/meta/stub/meta.stub-service";
import type IMetaService from "@meta/meta.service";

declare global {
  var metaService: IMetaService | undefined;
}

export async function getMetaServiceInstance(type = process.env.NODE_ENV === "development" ? "stub" : "mongo") {
  switch (type) {
    case "stub":
      return new StubMetaService();
    default:
      throw new Error(`Unknown character service type: ${type}`);
  }
}
