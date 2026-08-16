import { describe, it, expect } from "@jest/globals";
import {
  parsePrimitive,
  getDefaultPrimitive,
  generateParamValue,
  generateMockData,
} from "../../generator/test-generator.js";
import { NormalizedParam } from "../../generator/types.js";

describe("test-generator", () => {
  describe("parsePrimitive", () => {
    it("should parse booleans correctly", () => {
      expect(parsePrimitive("true", "boolean")).toBe(true);
      expect(parsePrimitive("false", "boolean")).toBe(false);
      expect(parsePrimitive("1", "bool")).toBe(true);
      expect(parsePrimitive("yes", "bool")).toBe(true);
    });

    it("should parse numbers correctly", () => {
      expect(parsePrimitive("123", "int")).toBe(123);
      expect(parsePrimitive("45.67", "float")).toBe(45.67);
      expect(parsePrimitive("not_a_number", "double")).toBe(1);
    });

    it("should return string values unchanged", () => {
      expect(parsePrimitive("test_value", "string")).toBe("test_value");
    });
  });

  describe("getDefaultPrimitive", () => {
    it("should return true for boolean types", () => {
      expect(getDefaultPrimitive("boolean")).toBe(true);
      expect(getDefaultPrimitive("bool")).toBe(true);
    });

    it("should return 123 for numeric types", () => {
      expect(getDefaultPrimitive("int32")).toBe(123);
      expect(getDefaultPrimitive("double")).toBe(123);
    });

    it("should return a fallback string for string/other types", () => {
      expect(getDefaultPrimitive("string")).toBe("test_string");
    });
  });

  describe("generateParamValue", () => {
    it("should use sample value when available", () => {
      const param: NormalizedParam = {
        name: "test_param",
        type: "string",
        description: "description",
        optional: false,
        sample: "sample_value",
      };
      expect(generateParamValue(param)).toBe("sample_value");
    });

    it("should build primitive arrays when type is array and sample is comma-separated list", () => {
      const param: NormalizedParam = {
        name: "id_list",
        type: "number[]",
        description: "list of ids",
        optional: false,
        sample: "[1,2,3]",
      };
      expect(generateParamValue(param)).toEqual([1, 2, 3]);
    });

    it("should recursively build nested objects and object arrays", () => {
      const param: NormalizedParam = {
        name: "user_info",
        type: "object",
        description: "user details",
        optional: false,
        children: [
          {
            name: "username",
            type: "string",
            description: "username",
            optional: false,
            sample: "user123",
          },
          {
            name: "age",
            type: "number",
            description: "age",
            optional: true,
          },
        ],
      };
      expect(generateParamValue(param)).toEqual({
        username: "user123",
        age: 123,
      });
    });
  });

  describe("generateMockData", () => {
    it("should build complete mockup object from list of parameters", () => {
      const params: NormalizedParam[] = [
        {
          name: "id",
          type: "number",
          description: "ID",
          optional: false,
          sample: 1,
        },
        {
          name: "name",
          type: "string",
          description: "Name",
          optional: false,
          sample: "test_name",
        },
      ];
      expect(generateMockData(params)).toEqual({
        id: 1,
        name: "test_name",
      });
    });
  });
});
