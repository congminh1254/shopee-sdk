import { jest } from "@jest/globals";
import { CustomTokenStorage } from "../../storage/custom-token-storage.js";
import { AccessToken } from "../../schemas/access-token.js";
import fs from "fs";
import path from "path";

// Create a unique test directory for each test run
const TEST_DIR = path.join(process.cwd(), ".token-test-" + Date.now());

describe("CustomTokenStorage", () => {
  beforeAll(() => {
    // Mock process.cwd to use test directory
    jest.spyOn(process, "cwd").mockReturnValue(TEST_DIR);
  });

  afterAll(() => {
    // Restore original cwd
    jest.restoreAllMocks();
    // Clean up test directory
    if (fs.existsSync(path.join(TEST_DIR, ".token"))) {
      const tokenDir = path.join(TEST_DIR, ".token");
      const files = fs.readdirSync(tokenDir);
      files.forEach((file) => {
        fs.unlinkSync(path.join(tokenDir, file));
      });
      fs.rmdirSync(tokenDir);
    }
  });

  afterEach(() => {
    // Clean up token files after each test
    const tokenDir = path.join(TEST_DIR, ".token");
    if (fs.existsSync(tokenDir)) {
      const files = fs.readdirSync(tokenDir);
      files.forEach((file) => {
        fs.unlinkSync(path.join(tokenDir, file));
      });
    }
  });

  describe("constructor", () => {
    it("should create token directory if it does not exist", () => {
      new CustomTokenStorage(123456);
      const tokenDir = path.join(TEST_DIR, ".token");
      expect(fs.existsSync(tokenDir)).toBe(true);
    });

    it("should use default.json when no shopId is provided", () => {
      new CustomTokenStorage();
      // We can't directly access private properties, but we can verify the storage is created
      const tokenDir = path.join(TEST_DIR, ".token");
      expect(fs.existsSync(tokenDir)).toBe(true);
    });
  });

  describe("store method", () => {
    it("should store token successfully", async () => {
      const storage = new CustomTokenStorage(123456);
      const token: AccessToken = {
        access_token: "test_token",
        refresh_token: "test_refresh",
        expire_in: 14400,
        expired_at: Date.now() + 14400000,
        shop_id: 123456,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      await storage.store(token);

      const tokenPath = path.join(TEST_DIR, ".token", "123456.json");
      expect(fs.existsSync(tokenPath)).toBe(true);
      const storedData = JSON.parse(fs.readFileSync(tokenPath, "utf-8"));
      expect(storedData).toEqual(token);
    });

    it("should create default token file on first store with shopId", async () => {
      const storage = new CustomTokenStorage(789012);
      const token: AccessToken = {
        access_token: "test_token",
        refresh_token: "test_refresh",
        expire_in: 14400,
        expired_at: Date.now() + 14400000,
        shop_id: 789012,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      await storage.store(token);

      const tokenPath = path.join(TEST_DIR, ".token", "789012.json");
      const defaultPath = path.join(TEST_DIR, ".token", "default.json");
      
      expect(fs.existsSync(tokenPath)).toBe(true);
      expect(fs.existsSync(defaultPath)).toBe(true);
      
      const storedData = JSON.parse(fs.readFileSync(tokenPath, "utf-8"));
      const defaultData = JSON.parse(fs.readFileSync(defaultPath, "utf-8"));
      
      expect(storedData).toEqual(token);
      expect(defaultData).toEqual(token);
    });

    it("should not overwrite existing default token", async () => {
      // First, create a default token
      const firstStorage = new CustomTokenStorage(111111);
      const firstToken: AccessToken = {
        access_token: "first_token",
        refresh_token: "first_refresh",
        expire_in: 14400,
        expired_at: Date.now() + 14400000,
        shop_id: 111111,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      await firstStorage.store(firstToken);

      // Then store a second token with different shopId
      const secondStorage = new CustomTokenStorage(222222);
      const secondToken: AccessToken = {
        access_token: "second_token",
        refresh_token: "second_refresh",
        expire_in: 14400,
        expired_at: Date.now() + 14400000,
        shop_id: 222222,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      await secondStorage.store(secondToken);

      const defaultPath = path.join(TEST_DIR, ".token", "default.json");
      const defaultData = JSON.parse(fs.readFileSync(defaultPath, "utf-8"));
      
      // Default should still be the first token
      expect(defaultData.access_token).toBe("first_token");
    });

    it("should throw error on write failure", async () => {
      const storage = new CustomTokenStorage(999999);
      const token: AccessToken = {
        access_token: "test_token",
        refresh_token: "test_refresh",
        expire_in: 14400,
        expired_at: Date.now() + 14400000,
        shop_id: 999999,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      // Mock writeFileSync to throw an error
      const originalWriteFileSync = fs.writeFileSync;
      jest.spyOn(fs, "writeFileSync").mockImplementation(() => {
        throw new Error("Write failed");
      });

      await expect(storage.store(token)).rejects.toThrow("Failed to store token");
      await expect(storage.store(token)).rejects.toThrow("Write failed");

      // Restore original function
      fs.writeFileSync = originalWriteFileSync;
    });
  });

  describe("get method", () => {
    it("should retrieve stored token successfully", async () => {
      const storage = new CustomTokenStorage(123456);
      const token: AccessToken = {
        access_token: "test_token",
        refresh_token: "test_refresh",
        expire_in: 14400,
        expired_at: Date.now() + 14400000,
        shop_id: 123456,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      await storage.store(token);
      const retrieved = await storage.get();

      expect(retrieved).toEqual(token);
    });

    it("should return null when token file does not exist", async () => {
      const storage = new CustomTokenStorage(999999);
      const result = await storage.get();

      expect(result).toBeNull();
    });

    it("should throw error on read failure (non-ENOENT)", async () => {
      const storage = new CustomTokenStorage(555555);
      const token: AccessToken = {
        access_token: "test_token",
        refresh_token: "test_refresh",
        expire_in: 14400,
        expired_at: Date.now() + 14400000,
        shop_id: 555555,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      await storage.store(token);

      // Mock readFileSync to throw a non-ENOENT error
      const originalReadFileSync = fs.readFileSync;
      jest.spyOn(fs, "readFileSync").mockImplementation(() => {
        const error = new Error("Permission denied") as NodeJS.ErrnoException;
        error.code = "EACCES";
        throw error;
      });

      await expect(storage.get()).rejects.toThrow("Failed to get token");
      await expect(storage.get()).rejects.toThrow("Permission denied");

      // Restore original function
      fs.readFileSync = originalReadFileSync;
    });
  });

  describe("clear method", () => {
    it("should clear stored token successfully", async () => {
      const storage = new CustomTokenStorage(123456);
      const token: AccessToken = {
        access_token: "test_token",
        refresh_token: "test_refresh",
        expire_in: 14400,
        expired_at: Date.now() + 14400000,
        shop_id: 123456,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      await storage.store(token);
      
      const tokenPath = path.join(TEST_DIR, ".token", "123456.json");
      expect(fs.existsSync(tokenPath)).toBe(true);

      await storage.clear();
      expect(fs.existsSync(tokenPath)).toBe(false);

      const retrieved = await storage.get();
      expect(retrieved).toBeNull();
    });

    it("should handle clearing non-existent token gracefully", async () => {
      const storage = new CustomTokenStorage(999999);
      
      // Should not throw error
      await expect(storage.clear()).resolves.not.toThrow();
    });

    it("should throw error on delete failure (non-ENOENT)", async () => {
      const storage = new CustomTokenStorage(777777);
      const token: AccessToken = {
        access_token: "test_token",
        refresh_token: "test_refresh",
        expire_in: 14400,
        expired_at: Date.now() + 14400000,
        shop_id: 777777,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      await storage.store(token);

      // Mock unlinkSync to throw a non-ENOENT error
      const originalUnlinkSync = fs.unlinkSync;
      jest.spyOn(fs, "unlinkSync").mockImplementation(() => {
        const error = new Error("Permission denied") as NodeJS.ErrnoException;
        error.code = "EACCES";
        throw error;
      });

      await expect(storage.clear()).rejects.toThrow("Failed to clear token");
      await expect(storage.clear()).rejects.toThrow("Permission denied");

      // Restore original function
      fs.unlinkSync = originalUnlinkSync;
    });
  });

  describe("integration tests", () => {
    it("should handle full lifecycle: store, get, clear", async () => {
      const storage = new CustomTokenStorage(888888);
      
      // Initially should be null
      let result = await storage.get();
      expect(result).toBeNull();

      // Store a token
      const token: AccessToken = {
        access_token: "lifecycle_token",
        refresh_token: "lifecycle_refresh",
        expire_in: 14400,
        expired_at: Date.now() + 14400000,
        shop_id: 888888,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      await storage.store(token);

      // Retrieve the token
      result = await storage.get();
      expect(result).toEqual(token);

      // Clear the token
      await storage.clear();

      // Should be null again
      result = await storage.get();
      expect(result).toBeNull();
    });

    it("should handle multiple shop IDs independently", async () => {
      const storage1 = new CustomTokenStorage(111);
      const storage2 = new CustomTokenStorage(222);

      const token1: AccessToken = {
        access_token: "token_111",
        refresh_token: "refresh_111",
        expire_in: 14400,
        expired_at: Date.now() + 14400000,
        shop_id: 111,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      const token2: AccessToken = {
        access_token: "token_222",
        refresh_token: "refresh_222",
        expire_in: 14400,
        expired_at: Date.now() + 14400000,
        shop_id: 222,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      await storage1.store(token1);
      await storage2.store(token2);

      const retrieved1 = await storage1.get();
      const retrieved2 = await storage2.get();

      expect(retrieved1?.shop_id).toBe(111);
      expect(retrieved2?.shop_id).toBe(222);
    });
  });
});
