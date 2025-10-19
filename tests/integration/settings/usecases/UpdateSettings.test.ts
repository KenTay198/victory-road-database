import UpdateSettings from "@settings/usecases/UpdateSettings";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import type { ISettings } from "@settings/settings.types";
import Settings from "@settings/settings.entity";
import SettingsService from "@infrastructure/settings/settings.default-service";
import type ISettingsService from "@settings/settings.service";

describe("UpdateSettings", () => {
  let settingsService: ISettingsService;

  beforeEach(() => {
    settingsService = new SettingsService("stub");
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
      const result = await new UpdateSettings(settingsService).execute(settingsData, userId);
      // assert
      expect(result).toBe(true);
      expect(updateSpy).toHaveBeenCalledOnce();
      expect(updateSpy).toHaveBeenCalledWith(settingsData, userId);
    });

    it("should handle hissatsu locale change", async () => {
      // arrange
      const updateSpy = vi.spyOn(settingsService, "updateSettings").mockResolvedValue(true);
      const updateSettings: Partial<ISettings> = { hissatsuLocale: "en" };
      // act
      const result = await new UpdateSettings(settingsService).execute(updateSettings, userId);
      // assert
      expect(result).toBe(true);
      expect(updateSpy).toHaveBeenCalledWith(expect.objectContaining({ hissatsuLocale: "en" }), userId);
    });

    it("should handle character locale change", async () => {
      // arrange
      const updateSpy = vi.spyOn(settingsService, "updateSettings").mockResolvedValue(true);
      const updateSettings: Partial<ISettings> = { characterLocale: "vo" };
      // act
      const result = await new UpdateSettings(settingsService).execute(updateSettings, userId);
      // assert
      expect(result).toBe(true);
      expect(updateSpy).toHaveBeenCalledWith(expect.objectContaining({ characterLocale: "vo" }), userId);
    });
  });

  describe("Edge cases", () => {
    it("should handle partial settings update", async () => {
      // arrange
      const partialSettings: Partial<ISettings> = { hissatsuLocale: "jp" };
      const updateSpy = vi.spyOn(settingsService, "updateSettings").mockResolvedValue(true);
      // act
      const result = await new UpdateSettings(settingsService).execute(partialSettings as ISettings, userId);
      // assert
      expect(result).toBe(true);
      expect(updateSpy).toHaveBeenCalledWith(partialSettings, userId);
    });

    it("should return false when update fails", async () => {
      // arrange
      vi.spyOn(settingsService, "updateSettings").mockResolvedValue(false);
      // act
      const result = await new UpdateSettings(settingsService).execute(settingsData, userId);
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
      await expect(useCase.execute(settingsData)).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Database error" }),
      );
    });
  });
});
