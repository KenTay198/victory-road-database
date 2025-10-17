import EnsureHissatsusExistsForMany from "@hissatsu/usecases/EnsureHissatsusExistsForMany";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubHissatsuService from "@infrastructure/hissatsu/stub/hissatsu.stub-service";
import FakeHissatsu from "../../../entities/hissatsus/hissatsu.fake";
import type { ICreateLearnedHissatsu } from "@hissatsu/hissatsu.types";

describe("EnsureHissatsusExistsForMany", () => {
  let hissatsuService: StubHissatsuService;

  beforeEach(() => {
    hissatsuService = new StubHissatsuService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful execution", () => {
    it("should return existing hissatsus without creating new ones for multiple characters", async () => {
      // arrange
      const charactersHissatsus: ICreateLearnedHissatsu[][] = [
        [
          { id: "existing1", learnLevel: 1 },
          { id: "existing2", learnLevel: 5 },
        ],
        [{ id: "existing3", learnLevel: 2 }],
      ];
      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple");

      // act
      const result = await new EnsureHissatsusExistsForMany(hissatsuService).execute(charactersHissatsus);

      // assert
      expect(result.size).toBe(2);
      expect(result.get(0)).toEqual([
        { id: "existing1", learnLevel: 1 },
        { id: "existing2", learnLevel: 5 },
      ]);
      expect(result.get(1)).toEqual([{ id: "existing3", learnLevel: 2 }]);
      expect(createMultipleSpy).not.toHaveBeenCalled();
    });

    it("should create new hissatsus and return them for multiple characters", async () => {
      // arrange
      const fakeHissatsu1 = new FakeHissatsu();
      const fakeHissatsu2 = new FakeHissatsu();
      const fakeHissatsu3 = new FakeHissatsu();

      const charactersHissatsus: ICreateLearnedHissatsu[][] = [
        [
          { ...fakeHissatsu1.toJSON(), learnLevel: 1, create: true },
          { ...fakeHissatsu2.toJSON(), learnLevel: 3, create: true },
        ],
        [{ ...fakeHissatsu3.toJSON(), learnLevel: 2, create: true }],
      ];

      // Remove ids to simulate new hissatsus
      delete charactersHissatsus[0][0].id;
      delete charactersHissatsus[0][1].id;
      delete charactersHissatsus[1][0].id;

      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple").mockResolvedValue(["id1", "id2", "id3"]);

      // act
      const result = await new EnsureHissatsusExistsForMany(hissatsuService).execute(charactersHissatsus);

      // assert
      expect(result.size).toBe(2);
      expect(result.get(0)).toEqual([
        { id: "id1", learnLevel: 1 },
        { id: "id2", learnLevel: 3 },
      ]);
      expect(result.get(1)).toEqual([{ id: "id3", learnLevel: 2 }]);
      expect(createMultipleSpy).toHaveBeenCalledOnce();
      expect(createMultipleSpy).toHaveBeenCalledWith([
        expect.objectContaining({ name: fakeHissatsu1.name }),
        expect.objectContaining({ name: fakeHissatsu2.name }),
        expect.objectContaining({ name: fakeHissatsu3.name }),
      ]);
    });

    it("should handle mixed existing and new hissatsus for multiple characters", async () => {
      // arrange
      const fakeHissatsu = new FakeHissatsu();
      const charactersHissatsus: ICreateLearnedHissatsu[][] = [
        [
          { id: "existing1", learnLevel: 1 },
          { ...fakeHissatsu.toJSON(), learnLevel: 2, create: true },
        ],
        [{ id: "existing2", learnLevel: 3 }],
      ];

      delete charactersHissatsus[0][1].id;
      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple").mockResolvedValue(["new-id"]);

      // act
      const result = await new EnsureHissatsusExistsForMany(hissatsuService).execute(charactersHissatsus);

      // assert
      expect(result.size).toBe(2);
      expect(result.get(0)).toEqual([
        { id: "existing1", learnLevel: 1 },
        { id: "new-id", learnLevel: 2 },
      ]);
      expect(result.get(1)).toEqual([{ id: "existing2", learnLevel: 3 }]);
      expect(createMultipleSpy).toHaveBeenCalledOnce();
    });

    it("should handle empty arrays", async () => {
      // arrange
      const charactersHissatsus: ICreateLearnedHissatsu[][] = [[], []];
      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple");

      // act
      const result = await new EnsureHissatsusExistsForMany(hissatsuService).execute(charactersHissatsus);

      // assert
      expect(result.size).toBe(2);
      expect(result.get(0)).toEqual([]);
      expect(result.get(1)).toEqual([]);
      expect(createMultipleSpy).not.toHaveBeenCalled();
    });

    it("should handle hissatsus with create flag but existing id as new hissatsus", async () => {
      // arrange
      const fakeHissatsu = new FakeHissatsu();
      const charactersHissatsus: Partial<ICreateLearnedHissatsu>[][] = [
        [{ ...fakeHissatsu.toJSON(), id: "existing1", learnLevel: 1, create: true }],
      ];

      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple").mockResolvedValue(["new-id"]);

      // act
      const result = await new EnsureHissatsusExistsForMany(hissatsuService).execute(charactersHissatsus);

      // assert
      expect(result.size).toBe(1);
      expect(result.get(0)).toEqual([{ id: "new-id", learnLevel: 1 }]);
      expect(createMultipleSpy).toHaveBeenCalledOnce();
      expect(createMultipleSpy).toHaveBeenCalledWith([expect.objectContaining({ name: fakeHissatsu.name })]);
    });

    it("should clean create flag from existing hissatsus without create flag", async () => {
      // arrange
      const charactersHissatsus: Partial<ICreateLearnedHissatsu>[][] = [[{ id: "existing1", learnLevel: 1 }]];

      const createMultipleSpy = vi.spyOn(hissatsuService, "createMultiple");

      // act
      const result = await new EnsureHissatsusExistsForMany(hissatsuService).execute(charactersHissatsus);

      // assert
      expect(result.size).toBe(1);
      expect(result.get(0)).toEqual([{ id: "existing1", learnLevel: 1 }]);
      expect(createMultipleSpy).not.toHaveBeenCalled();
    });
  });

  describe("Error handling", () => {
    it("should propagate errors from CreateHissatsus", async () => {
      // arrange
      const fakeHissatsu = new FakeHissatsu();
      const charactersHissatsus: ICreateLearnedHissatsu[][] = [
        [{ ...fakeHissatsu.toJSON(), learnLevel: 1, create: true }],
      ];
      delete charactersHissatsus[0][0].id;

      vi.spyOn(hissatsuService, "createMultiple").mockRejectedValue(new Error("Creation failed"));

      // act & assert
      await expect(new EnsureHissatsusExistsForMany(hissatsuService).execute(charactersHissatsus)).rejects.toThrow(
        "Creation failed",
      );
    });
  });
});
