import base from "./jest.config.js";

/** Sandbox (`test:sandbox:*`) and live (`test:live:*`) suites; credentials are required. */
export default {
  ...base,
  testPathIgnorePatterns: ["/node_modules/"],
  collectCoverage: false,
};
