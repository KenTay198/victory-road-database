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
    it("should return settings for user", async () => {
      // arrange
      const userId = "user123";
      // act
      const settings = await new GetSettings(settingsService).execute(userId);
      // assert
      expect(settings).toBeInstanceOf(Settings);
    });

    it("should call settings service getSettings with userId", async () => {
      // arrange
      const userId = "user123";
      const getSettingsSpy = vi.spyOn(settingsService, "getSettings");
      // act
      await new GetSettings(settingsService).execute(userId);
      // assert
      expect(getSettingsSpy).toHaveBeenCalledOnce();
      expect(getSettingsSpy).toHaveBeenCalledWith(userId);
    });

    it("should return settings with correct structure", async () => {
      // arrange
      const userId = "user123";
      // act
      const settings = await new GetSettings(settingsService).execute(userId);
      // assert
      expect(settings).toHaveProperty("hissatsuLocale");
      expect(settings).toHaveProperty("characterLocale");
      expect(typeof settings.hissatsuLocale).toBe("string");
    });

    it("should create default settings for new user", async () => {
      // arrange
      const newUserId = "newUser456";
      // act
      const settings = await new GetSettings(settingsService).execute(newUserId);
      // assert
      expect(settings).toBeInstanceOf(Settings);
      expect(settings.hissatsuLocale).toBeDefined();
      expect(settings.characterLocale).toBeDefined();
      expect(typeof settings.characterLocale).toBe("string");
    });
  });

  describe("Error handling", () => {
    it("should throw error when settings service fails", async () => {
      // arrange
      const userId = "user123";
      vi.spyOn(settingsService, "getSettings").mockRejectedValue(new Error("Database connection failed"));
      const useCase = new GetSettings(settingsService);
      // act & assert
      await expect(useCase.execute(userId)).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Database connection failed" }),
      );
    });
  });
});
