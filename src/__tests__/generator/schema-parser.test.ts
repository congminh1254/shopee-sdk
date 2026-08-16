import { describe, it, expect } from "@jest/globals";
import {
  cleanDescription,
  parseEnumFromDescription,
  parseSchemaFile,
} from "../../generator/schema-parser.js";
import path from "node:path";

describe("schema-parser", () => {
  describe("cleanDescription", () => {
    it("should strip HTML tags correctly", () => {
      expect(cleanDescription("<p>Hello <b>world</b></p>")).toBe("Hello world");
    });

    it("should replace irregular whitespaces", () => {
      expect(cleanDescription("Hello\u00A0world")).toBe("Hello world");
    });

    it("should clean HTML entities", () => {
      expect(cleanDescription("A &amp; B &lt; C &gt; D &nbsp; E")).toBe("A & B < C > D   E");
    });
  });

  describe("parseEnumFromDescription", () => {
    it("should parse Available value comma-separated lists as string enums", () => {
      const parsed = parseEnumFromDescription(
        "status",
        "Available values: upcoming, ongoing, expired",
        "string"
      );
      expect(parsed).not.toBeNull();
      expect(parsed!.name).toBe("Status");
      expect(parsed!.type).toBe("string");
      expect(parsed!.members).toEqual([
        { name: "UPCOMING", value: "upcoming" },
        { name: "ONGOING", value: "ongoing" },
        { name: "EXPIRED", value: "expired" },
      ]);
    });

    it("should parse slash-separated lists as numeric enums if type is int", () => {
      const parsed = parseEnumFromDescription("action_type", "Available value: 1/2/3", "int");
      expect(parsed).not.toBeNull();
      expect(parsed!.name).toBe("ActionType");
      expect(parsed!.type).toBe("number");
      expect(parsed!.members).toEqual([
        { name: "VALUE_1", value: 1 },
        { name: "VALUE_2", value: 2 },
        { name: "VALUE_3", value: 3 },
      ]);
    });

    it("should return null for fields that look like timestamps/dates containing words", () => {
      const parsed = parseEnumFromDescription(
        "start_time",
        "The timing from when the follow prize is valid, upcoming/ongoing activities.",
        "timestamp"
      );
      expect(parsed).toBeNull();
    });
  });

  describe("parseSchemaFile", () => {
    it("should return null for invalid filenames", () => {
      const parsed = parseSchemaFile("invalid_name.json");
      expect(parsed).toBeNull();
    });

    it("should correctly extract module and endpoint names for valid files", () => {
      const sampleSchemaPath = path.resolve(process.cwd(), "schemas/v2.product.get_item_list.json");
      const parsed = parseSchemaFile(sampleSchemaPath);
      expect(parsed).not.toBeNull();
      expect(parsed!.moduleName).toBe("product");
      expect(parsed!.endpointName).toBe("get_item_list");
      expect(parsed!.method).toBe("GET");
      expect(parsed!.path).toBe("/product/get_item_list");
    });
  });
});
