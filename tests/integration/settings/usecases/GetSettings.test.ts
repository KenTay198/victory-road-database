import GetSettings from "@settings/usecases/GetSettings";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubSettingsService from "@infrastructure/settings/stub/settings.stub-service";
import Settings from "@settings/settings.entity";

describe("GetSettings", () => {
  let settingsService: StubSettingsService;

  beforeEach(() => {
    settingsService = new StubSettingsService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful execution", () => {
    it("should return settings", async () => {
      // act
      const settings = await new GetSettings(settingsService).execute();
      // assert
      expect(settings).toBeInstanceOf(Settings);
    });

    it("should call settings service getSettings", async () => {
      // arrange
      const getSettingsSpy = vi.spyOn(settingsService, "getSettings");
      // act
      await new GetSettings(settingsService).execute();
      // assert
      expect(getSettingsSpy).toHaveBeenCalledOnce();
    });

    it("should return settings with correct structure", async () => {
      // act
      const settings = await new GetSettings(settingsService).execute();
      // assert
      expect(settings).toHaveProperty("hissatsuLocale");
      expect(settings).toHaveProperty("characterLocale");
      expect(typeof settings.hissatsuLocale).toBe("string");
      expect(typeof settings.characterLocale).toBe("string");
    });
  });

  describe("Error handling", () => {
    it("should throw error when settings service fails", async () => {
      // arrange
      vi.spyOn(settingsService, "getSettings").mockRejectedValue(new Error("Database connection failed"));
      const useCase = new GetSettings(settingsService);
      // act & assert
      await expect(useCase.execute()).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Database connection failed" }),
      );
    });
  });
});
