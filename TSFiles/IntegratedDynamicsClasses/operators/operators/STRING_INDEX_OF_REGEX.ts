import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";
import { RE2 } from "re2-wasm";
import { sanitizeForRe2 } from "HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_INDEX_OF_REGEX extends BaseOperator<
  iString,
  Operator<iString, Integer>
> {
  static override internalName =
    "integrateddynamics:string_index_of_regex" as const;
  static override nicknames = ["indexOfRegex", "stringIndexOfRegex"];
  static override symbol = "index_of_regex";
  static override interactName = "stringIndexOfRegex";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
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
      }),
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
