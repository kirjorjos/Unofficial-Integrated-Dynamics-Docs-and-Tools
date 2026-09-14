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

const stringRegions = (line: string): boolean[] => {
  const inside = new Array<boolean>(line.length).fill(false);
  let quote: '"' | "'" | '"""' | null = null;
  let escaped = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i]!;

    if (quote !== null) {
      inside[i] = true;
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (quote === '"""') {
        if (char === '"' && line[i + 1] === '"' && line[i + 2] === '"') {
          inside[i + 1] = true;
          inside[i + 2] = true;
          i += 2;
          quote = null;
        }
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }

    if (char === '"' && line[i + 1] === '"' && line[i + 2] === '"') {
      quote = '"""';
      inside[i] = true;
      inside[i + 1] = true;
      inside[i + 2] = true;
      i += 2;
      continue;
    }
    if (char === '"') {
      quote = '"';
      continue;
    }
    if (char === "'") {
      quote = "'";
      continue;
    }
  }

  return inside;
};

const stripComments = (value: string): string =>
  value
    .split("\n")
    .map((line) => {
      const inside = stringRegions(line);
      for (let i = 1; i < line.length; i++) {
        if (
          !inside[i] &&
          !inside[i - 1] &&
          line[i - 1] === "-" &&
          line[i] === "-"
        ) {
          return line.slice(0, i - 1);
        }
      }
      return line;
    })
    .join("\n");

const hasTopLevelAssignment = (value: string): boolean => {
  let depth = 0;
  let quote: '"' | "'" | '"""' | null = null;
  let escaped = false;

  for (let i = 0; i < value.length; i++) {
    const char = value[i]!;

    if (quote !== null) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (quote === '"""') {
        if (char === '"' && value[i + 1] === '"' && value[i + 2] === '"') {
          quote = null;
          i += 2;
        }
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }

    if (char === '"') {
      if (value[i + 1] === '"' && value[i + 2] === '"') {
        quote = '"""';
        i += 2;
      } else {
        quote = '"';
      }
      continue;
    }
    if (char === "'") {
      quote = "'";
      continue;
    }

    if (char === "(" || char === "[" || char === "{") {
      depth++;
      continue;
    }
    if (char === ")" || char === "]" || char === "}") {
      if (depth > 0) depth--;
      continue;
    }

    if (char === "=" && depth === 0) {
      const previous = value[i - 1];
      const next = value[i + 1];
      if (next === ">") continue;
      if (
        previous === "=" ||
        previous === "!" ||
        previous === "<" ||
        previous === ">"
      ) {
        continue;
      }
      return true;
    }
  }

  return false;
};

const firstMeaningfulLine = (value: string): string =>
  (value.split("\n").find((line) => line.trim() !== "") ?? value).trim();

export const detectInputFormat = (value: string): TransformerFormatKey => {
  value = value.trim();
  const code = stripComments(value);

  if (value.includes("\n")) {
    if (value[0] === "{") return "json";
    if (!hasTopLevelAssignment(code)) {
      return condensedCallRegex.test(firstMeaningfulLine(code))
        ? "condensed"
        : "codeline";
    }
    return "expanded";
  }

  if (nicknamePrefixRegex.test(code)) return "expanded";
  if (lambdaDefinitionRegex.test(code)) return "expanded";
  if (variableWrapperDefinitionRegex.test(code)) return "expanded";
  if (typedDefinitionRegex.test(code)) return "expanded";
  if (value[0] === "{") return "json";
  if (condensedCallRegex.test(code)) return "condensed";
  return "codeline";
};
