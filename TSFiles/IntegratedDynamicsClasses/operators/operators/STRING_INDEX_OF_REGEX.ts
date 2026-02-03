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
  constructor() {
    super({
      nicknames: ["indexOfRegex", "stringIndexOfRegex"],
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
      symbol: "index_of_regex",
      interactName: "stringIndexOfRegex",
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
