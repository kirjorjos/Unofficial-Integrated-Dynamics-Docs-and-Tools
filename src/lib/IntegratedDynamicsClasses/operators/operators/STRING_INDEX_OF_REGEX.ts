import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { RE2 } from "re2-wasm";
import { sanitizeForRe2 } from "lib/HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_INDEX_OF_REGEX extends BaseOperator<
  iString,
  Operator<iString, Integer>
> {
  static override internalName =
    "integrateddynamics:string_index_of_regex" as const;
  static override numericID = 165;
  static override nicknames = [
    "indexOfRegex",
    "stringIndexOfRegex",
    "index_of_regex",
    "stringIndex_of_regex",
  ];
  static override symbol = "index_of_regex";
  static override interactName = "stringIndexOfRegex";
  static override operatorName = "index_of_regex" as const;
  static override displayName = "Index Of Regex" as const;
  static override fullDisplayName = "String Index Of Regex" as const;
  static override tooltipInfo =
    "Get the index of the first occurrence of a substring matching the pattern in the given string." as const;

  static override kind = "string" as const;
  static override renderPattern = "INFIX_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Integer",
            },
          },
        },
        normalizeSignature
      ),
      function: (regexString: iString): TypeLambda<iString, Integer> => {
        return (fullString: iString): Integer => {
          const regex = new RE2(sanitizeForRe2(regexString.valueOf()), "u");
          const match = regex.exec(fullString.valueOf());
          return new Integer(match ? match.index : -1);
        };
      },
    });
  }
}
