import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export type TransformerFormatKey =
  | "condensed"
  | "expanded"
  | "codeline"
  | "compressed"
  | "json";

const disallowedChars = BaseOperator.nicknameRegexDisallowedChars.join("");

const nicknamePrefixRegex = new RegExp(`^[^${disallowedChars}]+\\s*=`);

const lambdaDefinitionRegex = new RegExp(
  `^[^${disallowedChars}=>]+(?:\\s+[^${disallowedChars}=>]+)+\\s*=`
);

const condensedCallRegex = new RegExp(`^[^${disallowedChars}]+\\(`);

const variableWrapperDefinitionRegex = /^Variable\s*\([^)]*\)\s*=/i;

const typedDefinitionRegex = new RegExp(
  `^[^${disallowedChars}]+\\s*::\\s*[^\\s=]+\\s*=`
);

export const detectInputFormat = (value: string): TransformerFormatKey => {
  value = value.trim();
  if (value.includes("\n")) return "expanded";
  if (nicknamePrefixRegex.test(value)) return "expanded";
  if (lambdaDefinitionRegex.test(value)) return "expanded";
  if (variableWrapperDefinitionRegex.test(value)) return "expanded";
  if (typedDefinitionRegex.test(value)) return "expanded";
  if (value[0] === "{") return "json";
  if (condensedCallRegex.test(value)) return "condensed";
  return "codeline";
};
