/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/lib/tests/**/*.ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.lib.json",
      },
    ],
  },
  moduleNameMapper: {
    "^lib$": "<rootDir>/src/lib/index.ts",
    "^lib/(.*)$": "<rootDir>/src/lib/$1",
  },
};
