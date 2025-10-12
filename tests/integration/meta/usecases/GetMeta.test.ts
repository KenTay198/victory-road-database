import GetMeta from "@meta/usecases/GetMeta";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubMetaService from "@infrastructure/meta/stub/meta.stub-service";
import Meta from "@meta/meta.entity";

describe("GetMeta", () => {
  let metaService: StubMetaService;

  beforeEach(() => {
    metaService = new StubMetaService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful execution", () => {
    it("should return meta when available", async () => {
      // act
      const meta = await new GetMeta(metaService).execute();
      // assert
      expect(meta).toBeInstanceOf(Meta);
      expect(meta?.initialized).toBe(true);
    });

    it("should call meta service get", async () => {
      // arrange
      const getSpy = vi.spyOn(metaService, "get");
      // act
      await new GetMeta(metaService).execute();
      // assert
      expect(getSpy).toHaveBeenCalledOnce();
    });

    it("should return meta with correct structure", async () => {
      // act
      const meta = await new GetMeta(metaService).execute();
      // assert
      expect(meta).toHaveProperty("initialized");
    });
  });

  describe("Edge cases", () => {
    it("should handle uninitialized meta", async () => {
      // arrange
      const uninitializedMeta = new Meta({ initialized: false });
      vi.spyOn(metaService, "get").mockResolvedValue(uninitializedMeta);
      // act
      const meta = await new GetMeta(metaService).execute();
      // assert
      expect(meta?.initialized).toBe(false);
    });
  });

  describe("Error handling", () => {
    it("should throw error when meta service fails", async () => {
      // arrange
      vi.spyOn(metaService, "get").mockRejectedValue(new Error("Database connection failed"));
      const useCase = new GetMeta(metaService);
      // act & assert
      await expect(useCase.execute()).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Database connection failed" }),
      );
    });
  });
});
