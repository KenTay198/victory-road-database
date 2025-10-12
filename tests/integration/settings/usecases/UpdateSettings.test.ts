import UpdateSettings from "@settings/usecases/UpdateSettings";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubSettingsService from "@infrastructure/settings/stub/settings.stub-service";
import type { ISettings } from "@settings/settings.types";
import Settings from "@settings/settings.entity";

describe("UpdateSettings", () => {
  let settingsService: StubSettingsService;

  beforeEach(() => {
    settingsService = new StubSettingsService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const userId = "user123";
  const settingsData = Settings.default(userId).toJSON();

  describe("Successful execution", () => {
    it("should update settings and return true", async () => {
      // arrange
      const updateSpy = vi.spyOn(settingsService, "updateSettings").mockResolvedValue(true);
      // act
      const result = await new UpdateSettings(settingsService).execute(userId, settingsData);
      // assert
      expect(result).toBe(true);
      expect(updateSpy).toHaveBeenCalledOnce();
      expect(updateSpy).toHaveBeenCalledWith(userId, settingsData);
    });

    it("should handle hissatsu locale change", async () => {
      // arrange
      const updateSpy = vi.spyOn(settingsService, "updateSettings").mockResolvedValue(true);
      const updateSettings: Partial<ISettings> = { hissatsuLocale: "en" };
      // act
      const result = await new UpdateSettings(settingsService).execute(userId, updateSettings);
      // assert
      expect(result).toBe(true);
      expect(updateSpy).toHaveBeenCalledWith(userId, expect.objectContaining({ hissatsuLocale: "en" }));
    });

    it("should handle character locale change", async () => {
      // arrange
      const updateSpy = vi.spyOn(settingsService, "updateSettings").mockResolvedValue(true);
      const updateSettings: Partial<ISettings> = { characterLocale: "vo" };
      // act
      const result = await new UpdateSettings(settingsService).execute(userId, updateSettings);
      // assert
      expect(result).toBe(true);
      expect(updateSpy).toHaveBeenCalledWith(userId, expect.objectContaining({ characterLocale: "vo" }));
    });
  });

  describe("Edge cases", () => {
    it("should handle partial settings update", async () => {
      // arrange
      const partialSettings: Partial<ISettings> = { hissatsuLocale: "jp" };
      const updateSpy = vi.spyOn(settingsService, "updateSettings").mockResolvedValue(true);
      // act
      const result = await new UpdateSettings(settingsService).execute(userId, partialSettings as ISettings);
      // assert
      expect(result).toBe(true);
      expect(updateSpy).toHaveBeenCalledWith(userId, partialSettings);
    });

    it("should return false when update fails", async () => {
      // arrange
      vi.spyOn(settingsService, "updateSettings").mockResolvedValue(false);
      // act
      const result = await new UpdateSettings(settingsService).execute(userId, settingsData);
      // assert
      expect(result).toBe(false);
    });
  });

  describe("Error handling", () => {
    it("should throw error when settings service fails", async () => {
      // arrange
      vi.spyOn(settingsService, "updateSettings").mockRejectedValue(new Error("Database error"));
      const useCase = new UpdateSettings(settingsService);
      // act & assert
      await expect(useCase.execute(userId, settingsData)).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Database error" }),
      );
    });
  });
});
