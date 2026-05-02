/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/lib/tests/**/*.ts", "<rootDir>/src/tests/**/*.ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.test.json",
      },
    ],
  },
  moduleNameMapper: {
    "^lib$": "<rootDir>/src/lib/index.ts",
    "^lib/(.*)$": "<rootDir>/src/lib/$1",
    "^components/(.*)$": "<rootDir>/src/components/$1",
  },
};
