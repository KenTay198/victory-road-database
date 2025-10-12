import CreateUser from "@user/usecases/CreateUser";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import StubUserService from "@infrastructure/user/stub/user.stub-service";
import type { IUserData } from "@user/user.types";

describe("CreateUser", () => {
  let userService: StubUserService;

  beforeEach(() => {
    userService = new StubUserService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful execution", () => {
    it("should create user and return id", async () => {
      // arrange
      const userData: IUserData = {
        email: "test@example.com",
        username: "testuser",
        password: "password123",
      };
      const createSpy = vi.spyOn(userService, "create").mockResolvedValue("user-id-123");
      // act
      const userId = await new CreateUser(userService).execute(userData);
      // assert
      expect(userId).toBe("user-id-123");
      expect(createSpy).toHaveBeenCalledOnce();
      expect(createSpy).toHaveBeenCalledWith(userData);
    });

    it("should trim whitespace from user data", async () => {
      // arrange
      const userData: IUserData = {
        email: "  test@example.com  ",
        username: "  testuser  ",
        password: "  password123  ",
      };
      const expectedData = {
        email: "test@example.com",
        username: "testuser",
        password: "password123",
      };
      const createSpy = vi.spyOn(userService, "create").mockResolvedValue("user-id-123");
      // act
      await new CreateUser(userService).execute(userData);
      // assert
      expect(createSpy).toHaveBeenCalledWith(expectedData);
    });

    it("should handle long valid usernames", async () => {
      // arrange
      const userData: IUserData = {
        email: "test@example.com",
        username: "a".repeat(30), // Max length
        password: "password123",
      };
      const createSpy = vi.spyOn(userService, "create").mockResolvedValue("user-id-123");
      // act
      const userId = await new CreateUser(userService).execute(userData);
      // assert
      expect(userId).toBe("user-id-123");
      expect(createSpy).toHaveBeenCalledWith(userData);
    });

    it("should handle long valid passwords", async () => {
      // arrange
      const userData: IUserData = {
        email: "test@example.com",
        username: "testuser",
        password: "a".repeat(100), // Max length
      };
      const createSpy = vi.spyOn(userService, "create").mockResolvedValue("user-id-123");
      // act
      const userId = await new CreateUser(userService).execute(userData);
      // assert
      expect(userId).toBe("user-id-123");
      expect(createSpy).toHaveBeenCalledWith(userData);
    });
  });

  describe("Input validation", () => {
    it("should throw error for invalid email", async () => {
      // arrange
      const invalidData: IUserData = {
        email: "invalid-email",
        username: "testuser",
        password: "password123",
      };
      const useCase = new CreateUser(userService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for username too short", async () => {
      // arrange
      const invalidData: IUserData = {
        email: "test@example.com",
        username: "abc", // Less than 4 characters
        password: "password123",
      };
      const useCase = new CreateUser(userService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for username too long", async () => {
      // arrange
      const invalidData: IUserData = {
        email: "test@example.com",
        username: "a".repeat(31), // More than 30 characters
        password: "password123",
      };
      const useCase = new CreateUser(userService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for password too short", async () => {
      // arrange
      const invalidData: IUserData = {
        email: "test@example.com",
        username: "testuser",
        password: "1234567", // Less than 8 characters
      };
      const useCase = new CreateUser(userService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for password too long", async () => {
      // arrange
      const invalidData: IUserData = {
        email: "test@example.com",
        username: "testuser",
        password: "a".repeat(101), // More than 100 characters
      };
      const useCase = new CreateUser(userService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for empty email", async () => {
      // arrange
      const invalidData: IUserData = {
        email: "",
        username: "testuser",
        password: "password123",
      };
      const useCase = new CreateUser(userService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for empty username", async () => {
      // arrange
      const invalidData: IUserData = {
        email: "test@example.com",
        username: "",
        password: "password123",
      };
      const useCase = new CreateUser(userService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });

    it("should throw error for empty password", async () => {
      // arrange
      const invalidData: IUserData = {
        email: "test@example.com",
        username: "testuser",
        password: "",
      };
      const useCase = new CreateUser(userService);
      // act & assert
      await expect(useCase.execute(invalidData)).rejects.toThrow();
    });
  });

  describe("Error handling", () => {
    it("should throw error when user service fails", async () => {
      // arrange
      const userData: IUserData = {
        email: "test@example.com",
        username: "testuser",
        password: "password123",
      };
      vi.spyOn(userService, "create").mockRejectedValue(new Error("Database connection failed"));
      const useCase = new CreateUser(userService);
      // act & assert
      await expect(useCase.execute(userData)).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Database connection failed" }),
      );
    });

    it("should throw error when email already exists", async () => {
      // arrange
      const userData: IUserData = {
        email: "existing@example.com",
        username: "testuser",
        password: "password123",
      };
      vi.spyOn(userService, "create").mockRejectedValue(new Error("Email already exists"));
      const useCase = new CreateUser(userService);
      // act & assert
      await expect(useCase.execute(userData)).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Email already exists" }),
      );
    });

    it("should throw error when username already exists", async () => {
      // arrange
      const userData: IUserData = {
        email: "test@example.com",
        username: "existinguser",
        password: "password123",
      };
      vi.spyOn(userService, "create").mockRejectedValue(new Error("Username already exists"));
      const useCase = new CreateUser(userService);
      // act & assert
      await expect(useCase.execute(userData)).rejects.toThrow(
        JSON.stringify({ category: "UNEXPECTED", code: "UNKNOWN", details: "Username already exists" }),
      );
    });
  });
});
