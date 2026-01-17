import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";
import { RE2 } from "re2-wasm";

export class OPERATOR_STRING_INDEX_OF_REGEX extends BaseOperator<
  iString,
  Operator<iString, Integer>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:string_index_of_regex",
      nicknames: ["indexOfRegex", "stringIndexOfRegex"],
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
        globalMap
      ),
      symbol: "index_of_regex",
      interactName: "stringIndexOfRegex",
      function: (regexString: iString): TypeLambda<iString, Integer> => {
        return (fullString: iString): Integer => {
          const regex = new RE2(regexString.valueOf(), "u");
          return new Integer(fullString.valueOf().search(regex));
        };
      },
    });
  }
}
