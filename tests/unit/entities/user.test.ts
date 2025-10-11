import { describe, expect, it } from "vitest";
import FakeUser from "../../entities/user/user.fake";
import User from "@user/entities/user.entity";
import FakeUserSensitive from "../../entities/user/userSensitive.fake";

describe("User Entity", () => {
  //#region Constructor
  describe("constructor", () => {
    it("should create a valid User instance", () => {
      // act
      const user = new FakeUser();
      // assert
      expect(user.id).toBeDefined();
      expect(user.username).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.role).toBeDefined();
    });
  });
  //#endregion

  //#region Parsing
  describe("toJSON", () => {
    it("should return correct IUser object", () => {
      // arrange
      const user = new FakeUser();
      // act
      const json = user.toJSON();
      // assert
      const expectedKeys = ["id", "username", "email", "role"];
      expect(Object.keys(json).sort()).toEqual(expectedKeys.sort());
    });
  });

  describe("fromJSON", () => {
    it("should return correct User instance", () => {
      // arrange
      const user = new FakeUser();
      const userData = user.toJSON();
      // act
      const newUser = User.fromJSON(userData);
      // assert
      expect(newUser).toBeInstanceOf(User);
      expect(newUser.id).toBe(userData.id);
      expect(newUser.username).toBe(userData.username);
      expect(newUser.email).toBe(userData.email);
      expect(newUser.role).toBe(userData.role);
    });
  });
  //#endregion
});

describe("UserSensitive Entity", () => {
  //#region Constructor
  describe("constructor", () => {
    it("should create a valid UserSensitive instance", () => {
      // act
      const user = new FakeUserSensitive();
      // assert
      expect(user.id).toBeDefined();
      expect(user.username).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.role).toBeDefined();
      expect(user.password).toBeDefined();
    });
  });
  //#endregion

  //#region removeSensitiveInfo
  describe("removeSensitiveInfo", () => {
    it("should return a User instance without sensitive info", () => {
      // arrange
      const userSensitive = new FakeUserSensitive();
      // act
      const user = userSensitive.removeSensitiveInfo();
      // assert
      expect(user).toBeInstanceOf(User);
      expect((user as any).password).toBeUndefined();
    });
  });
  //#endregion
});
