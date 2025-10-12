"use server";

import MongoMetaService from "@infrastructure/meta/mongo/meta.mongo-service";
import StubMetaService from "@infrastructure/meta/stub/meta.stub-service";
import type IMetaService from "@meta/meta.service";

declare global {
  var metaService: IMetaService | undefined;
}

const defaultType = process.env.NODE_ENV === "development" ? "stub" : "mongo";

export async function getMetaServiceInstance(type = defaultType): Promise<IMetaService> {
  switch (type) {
    case "stub":
      return new StubMetaService();
    case "mongo":
      return new MongoMetaService();
    default:
      throw new Error(`Unknown meta service type: ${type}`);
  }
}
