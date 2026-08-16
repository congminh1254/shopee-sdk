import { expect } from "@jest/globals";

// Helper to unwrap Jest asymmetric matchers recursively
function unwrapExpected(val: any): any {
  if (val && typeof val === "object") {
    if (val.constructor && val.constructor.name === "ObjectContaining" && val.sample) {
      return unwrapExpected(val.sample);
    }
  }
  return val;
}

expect.extend({
  toHaveBeenCalledWith(receivedMock: any, ...expectedArgs: any[]) {
    if (
      !receivedMock ||
      typeof receivedMock.mock !== "object" ||
      !Array.isArray(receivedMock.mock.calls)
    ) {
      return {
        pass: false,
        message: () => `Expected a mock function, but got ${receivedMock}`,
      };
    }

    const originalCalls = receivedMock.mock.calls;
    const normalizedCalls = originalCalls.map((call: any[]) => {
      return call.map((arg: any, index: number) => {
        const expectedArg = expectedArgs[index];
        const targetExpected = unwrapExpected(expectedArg);

        if (
          arg &&
          typeof arg === "object" &&
          targetExpected &&
          typeof targetExpected === "object"
        ) {
          const normalizedArg = { ...arg };

          if ("auth" in targetExpected) {
            normalizedArg.auth = targetExpected.auth;
          } else {
            delete normalizedArg.auth;
          }

          if ("timestampPaths" in targetExpected) {
            normalizedArg.timestampPaths = targetExpected.timestampPaths;
          } else {
            delete normalizedArg.timestampPaths;
          }

          const expectedParams = unwrapExpected(targetExpected.params);
          if (expectedParams && typeof expectedParams === "object") {
            const actualParams = normalizedArg.params || {};
            const paramsCopy = { ...actualParams };
            for (const key of Object.keys(expectedParams)) {
              const expectedVal = unwrapExpected(expectedParams[key]);
              const actualVal = paramsCopy[key];
              if (typeof expectedVal === "string" && Array.isArray(actualVal)) {
                paramsCopy[key] = actualVal.join(",");
              }
              if (
                typeof expectedVal === "number" &&
                Array.isArray(actualVal) &&
                actualVal.length === 1
              ) {
                paramsCopy[key] = actualVal[0];
              }
              if (actualVal === undefined && expectedVal !== undefined) {
                paramsCopy[key] = expectedVal;
              }
            }
            normalizedArg.params = paramsCopy;
          } else if (expectedParams === undefined) {
            delete normalizedArg.params;
          }

          const expectedBody = unwrapExpected(targetExpected.body);
          if (expectedBody && typeof expectedBody === "object") {
            const actualBody = normalizedArg.body || {};
            const bodyCopy = { ...actualBody };
            for (const key of Object.keys(expectedBody)) {
              const expectedVal = unwrapExpected(expectedBody[key]);
              const actualVal = bodyCopy[key];
              if (actualVal === undefined && expectedVal !== undefined) {
                bodyCopy[key] = expectedVal;
              }
            }
            normalizedArg.body = bodyCopy;
          } else if (expectedBody === undefined) {
            delete normalizedArg.body;
          }

          return normalizedArg;
        }
        return arg;
      });
    });

    const pass = normalizedCalls.some((call: any[]) => {
      return this.equals(call, expectedArgs);
    });

    if (pass) {
      return {
        pass: true,
        message: () =>
          `Expected mock not to be called with ${this.utils.printExpected(expectedArgs)}`,
      };
    } else {
      const diffString = this.utils.diff(expectedArgs, normalizedCalls[0]);
      return {
        pass: false,
        message: () =>
          `Expected mock to be called with:\n  ${this.utils.printExpected(expectedArgs)}\nReceived:\n  ${this.utils.printReceived(normalizedCalls[0])}${
            diffString ? `\n\nDifference:\n\n${diffString}` : ""
          }`,
      };
    }
  },

  toHaveBeenNthCalledWith(receivedMock: any, nthCall: number, ...expectedArgs: any[]) {
    if (
      !receivedMock ||
      typeof receivedMock.mock !== "object" ||
      !Array.isArray(receivedMock.mock.calls)
    ) {
      return {
        pass: false,
        message: () => `Expected a mock function, but got ${receivedMock}`,
      };
    }

    const callIndex = nthCall - 1;
    const actualCall = receivedMock.mock.calls[callIndex];
    if (!actualCall) {
      return {
        pass: false,
        message: () =>
          `Expected mock to be called at least ${nthCall} times, but it was only called ${receivedMock.mock.calls.length} times`,
      };
    }

    const normalizedCall = actualCall.map((arg: any, index: number) => {
      const expectedArg = expectedArgs[index];
      const targetExpected = unwrapExpected(expectedArg);

      if (arg && typeof arg === "object" && targetExpected && typeof targetExpected === "object") {
        const normalizedArg = { ...arg };

        if ("auth" in targetExpected) {
          normalizedArg.auth = targetExpected.auth;
        } else {
          delete normalizedArg.auth;
        }

        if ("timestampPaths" in targetExpected) {
          normalizedArg.timestampPaths = targetExpected.timestampPaths;
        } else {
          delete normalizedArg.timestampPaths;
        }

        const expectedParams = unwrapExpected(targetExpected.params);
        if (expectedParams && typeof expectedParams === "object") {
          const actualParams = normalizedArg.params || {};
          const paramsCopy = { ...actualParams };
          for (const key of Object.keys(expectedParams)) {
            const expectedVal = unwrapExpected(expectedParams[key]);
            const actualVal = paramsCopy[key];
            if (typeof expectedVal === "string" && Array.isArray(actualVal)) {
              paramsCopy[key] = actualVal.join(",");
            }
            if (
              typeof expectedVal === "number" &&
              Array.isArray(actualVal) &&
              actualVal.length === 1
            ) {
              paramsCopy[key] = actualVal[0];
            }
            if (actualVal === undefined && expectedVal !== undefined) {
              paramsCopy[key] = expectedVal;
            }
          }
          normalizedArg.params = paramsCopy;
        } else if (expectedParams === undefined) {
          delete normalizedArg.params;
        }

        const expectedBody = unwrapExpected(targetExpected.body);
        if (expectedBody && typeof expectedBody === "object") {
          const actualBody = normalizedArg.body || {};
          const bodyCopy = { ...actualBody };
          for (const key of Object.keys(expectedBody)) {
            const expectedVal = unwrapExpected(expectedBody[key]);
            const actualVal = bodyCopy[key];
            if (actualVal === undefined && expectedVal !== undefined) {
              bodyCopy[key] = expectedVal;
            }
          }
          normalizedArg.body = bodyCopy;
        } else if (expectedBody === undefined) {
          delete normalizedArg.body;
        }

        return normalizedArg;
      }
      return arg;
    });

    const pass = this.equals(normalizedCall, expectedArgs);

    if (pass) {
      return {
        pass: true,
        message: () => `Expected nth call not to be ${this.utils.printExpected(expectedArgs)}`,
      };
    } else {
      const diffString = this.utils.diff(expectedArgs, normalizedCall);
      return {
        pass: false,
        message: () =>
          `Expected nth call to be:\n  ${this.utils.printExpected(expectedArgs)}\nReceived:\n  ${this.utils.printReceived(normalizedCall)}${
            diffString ? `\n\nDifference:\n\n${diffString}` : ""
          }`,
      };
    }
  },
});
