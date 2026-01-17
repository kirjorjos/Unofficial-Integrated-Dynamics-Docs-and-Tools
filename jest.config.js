const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/TSFiles/tests/**/*.ts"],
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    "^IntegratedDynamicsClasses/(.*)$":
      "<rootDir>/TSFiles/IntegratedDynamicsClasses/$1",
    "^HelperClasses/(.*)$": "<rootDir>/TSFiles/HelperClasses/$1",
    "^JavaNumberClasses/(.*)$": "<rootDir>/TSFiles/JavaNumberClasses/$1",
  },
};
