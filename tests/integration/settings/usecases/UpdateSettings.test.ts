import UpdateSettings from "@settings/usecases/UpdateSettings";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubSettingsService from "@infrastructure/settings/stub/settings.stub-service";
import type { ISettings } from "@settings/settings.types";

describe("UpdateSettings", () => {
  let settingsService: StubSettingsService;

  beforeEach(() => {
    settingsService = new StubSettingsService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful execution", () => {
    it("should update settings and return true", async () => {
      // arrange
      const settingsData: ISettings = { hissatsuLocale: "fr", characterLocale: "west" };
      const updateSpy = vi.spyOn(settingsService, "updateSettings").mockResolvedValue(true);
      // act
      const result = await new UpdateSettings(settingsService).execute(settingsData);
      // assert
      expect(result).toBe(true);
      expect(updateSpy).toHaveBeenCalledOnce();
      expect(updateSpy).toHaveBeenCalledWith(settingsData);
    });

    it("should handle hissatsu locale change", async () => {
      // arrange
      const settingsData: ISettings = { hissatsuLocale: "en", characterLocale: "west" };
      const updateSpy = vi.spyOn(settingsService, "updateSettings").mockResolvedValue(true);
      // act
      const result = await new UpdateSettings(settingsService).execute(settingsData);
      // assert
      expect(result).toBe(true);
      expect(updateSpy).toHaveBeenCalledWith(expect.objectContaining({ hissatsuLocale: "en" }));
    });

    it("should handle character locale change", async () => {
      // arrange
      const settingsData: ISettings = { hissatsuLocale: "fr", characterLocale: "vo" };
      const updateSpy = vi.spyOn(settingsService, "updateSettings").mockResolvedValue(true);
      // act
      const result = await new UpdateSettings(settingsService).execute(settingsData);
      // assert
      expect(result).toBe(true);
      expect(updateSpy).toHaveBeenCalledWith(expect.objectContaining({ characterLocale: "vo" }));
    });
  });

  describe("Edge cases", () => {
    it("should handle partial settings update", async () => {
      // arrange
      const partialSettings: Partial<ISettings> = { hissatsuLocale: "jp" };
      const updateSpy = vi.spyOn(settingsService, "updateSettings").mockResolvedValue(true);
      // act
      const result = await new UpdateSettings(settingsService).execute(partialSettings as ISettings);
      // assert
      expect(result).toBe(true);
      expect(updateSpy).toHaveBeenCalledWith(partialSettings);
    });

    it("should return false when update fails", async () => {
      // arrange
      const settingsData: ISettings = { hissatsuLocale: "fr", characterLocale: "west" };
      vi.spyOn(settingsService, "updateSettings").mockResolvedValue(false);
      // act
      const result = await new UpdateSettings(settingsService).execute(settingsData);
      // assert
      expect(result).toBe(false);
    });
  });

  describe("Error handling", () => {
    it("should throw error when settings service fails", async () => {
      // arrange
      const settingsData: ISettings = { hissatsuLocale: "fr", characterLocale: "west" };
      vi.spyOn(settingsService, "updateSettings").mockRejectedValue(new Error("Database error"));
      const useCase = new UpdateSettings(settingsService);
      // act & assert
      await expect(useCase.execute(settingsData)).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Database error" }),
      );
    });
  });
});
