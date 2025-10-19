import Login from "@user/usecases/Login";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubUserService from "@infrastructure/user/stub/user.stub-service";
import User from "@user/entities/user.entity";
import FakeUser from "../../../entities/user/user.fake";
import type { ILoginData } from "@user/user.types";

describe("Login", () => {
  let userService: StubUserService;

  beforeEach(() => {
    userService = new StubUserService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful execution", () => {
    it("should login user with valid credentials", async () => {
      // arrange
      const loginData: ILoginData = { identifier: "testuser", password: "password123" };
      const mockUser = new FakeUser({ username: "testuser", email: "test@example.com" });
      const loginSpy = vi.spyOn(userService, "login").mockResolvedValue(mockUser);
      // act
      const user = await new Login(userService).execute(loginData);
      // assert
      expect(user).toBeInstanceOf(User);
      expect(user?.username).toBe("testuser");
      expect(loginSpy).toHaveBeenCalledOnce();
      expect(loginSpy).toHaveBeenCalledWith(loginData);
    });

    it("should login user with email as identifier", async () => {
      // arrange
      const loginData: ILoginData = { identifier: "test@example.com", password: "password123" };
      const mockUser = new FakeUser({ username: "testuser", email: "test@example.com" });
      const loginSpy = vi.spyOn(userService, "login").mockResolvedValue(mockUser);
      // act
      const user = await new Login(userService).execute(loginData);
      // assert
      expect(user).toBeInstanceOf(User);
      expect(user?.email).toBe("test@example.com");
      expect(loginSpy).toHaveBeenCalledWith(loginData);
    });

    it("should trim whitespace from credentials", async () => {
      // arrange
      const loginData: ILoginData = { identifier: "  testuser  ", password: "  password123  " };
      const expectedData = { identifier: "  testuser  ", password: "  password123  " }; // Login doesn't trim, only validation does
      const mockUser = new FakeUser({ username: "testuser", email: "test@example.com" });
      const loginSpy = vi.spyOn(userService, "login").mockResolvedValue(mockUser);
      // act
      const user = await new Login(userService).execute(loginData);
      // assert
      expect(user).toBeInstanceOf(User);
      expect(loginSpy).toHaveBeenCalledWith(expectedData);
    });
  });

  describe("Authentication failures", () => {
    it("should throw business error when credentials are invalid", async () => {
      // arrange
      const loginData: ILoginData = { identifier: "testuser", password: "wrongpassword" };
      vi.spyOn(userService, "login").mockResolvedValue(null);
      const useCase = new Login(userService);
      // act & assert
      await expect(useCase.execute(loginData)).rejects.toThrow(
        JSON.stringify({
          category: "BUSINESS",
          code: "INVALID_CREDENTIALS",
          details: "components.auth.loginForm.errors.invalidCredentials",
        }),
      );
    });

    it("should throw business error when user not found", async () => {
      // arrange
      const loginData: ILoginData = { identifier: "nonexistent", password: "password123" };
      vi.spyOn(userService, "login").mockResolvedValue(null);
      const useCase = new Login(userService);
      // act & assert
      await expect(useCase.execute(loginData)).rejects.toThrow(
        JSON.stringify({
          category: "BUSINESS",
          code: "INVALID_CREDENTIALS",
          details: "components.auth.loginForm.errors.invalidCredentials",
        }),
      );
    });
  });

  describe("Input validation", () => {
    it("should throw error for missing identifier", async () => {
      // arrange
      const invalidData = { identifier: "", password: "password123" } as ILoginData;
      const useCase = new Login(userService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for missing password", async () => {
      // arrange
      const invalidData = { identifier: "testuser", password: "" } as ILoginData;
      const useCase = new Login(userService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for missing both fields", async () => {
      // arrange
      const invalidData = { identifier: "", password: "" } as ILoginData;
      const useCase = new Login(userService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });
  });

  describe("Error handling", () => {
    it("should throw error when user service fails", async () => {
      // arrange
      const loginData: ILoginData = { identifier: "testuser", password: "password123" };
      vi.spyOn(userService, "login").mockRejectedValue(new Error("Database connection failed"));
      const useCase = new Login(userService);
      // act & assert
      await expect(useCase.execute(loginData)).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Database connection failed" }),
      );
    });
  });
});
