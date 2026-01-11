import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";
import RE2 from "re2";

export class OPERATOR_STRING_REPLACE_REGEX extends BaseOperator<
  iString,
  Operator<iString, Operator<iString, iString>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:string_replace_regex",
      nicknames: ["stringReplaceRegex"],
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
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "String",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "replace_regex",
      interactName: "stringReplaceRegex",
      function: (regexString: iString) => {
        return (replacementString: iString): TypeLambda<iString, iString> => {
          return (fullString: iString): iString => {
            const regex = new RE2(regexString.valueOf(), "u");
            return new iString(
              fullString.valueOf().replace(regex, replacementString.valueOf())
            );
          };
        };
      },
    });
  }
}
