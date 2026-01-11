import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";
import RE2 from "re2";

export class OPERATOR_STRING_REGEX_GROUP extends BaseOperator<
  iString,
  Operator<Integer, Operator<iString, iString>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:string_regex_group",
      nicknames: ["stringRegexGroup"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
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
      symbol: "regex_group",
      interactName: "stringRegexGroup",
      function: (regexString: iString) => {
        return (groupIndex: Integer) => {
          return (fullString: iString) => {
            const regex = new RE2(regexString.valueOf(), "u");
            const match = regex.exec(fullString.valueOf());
            if (
              match &&
              match[parseInt(groupIndex.toDecimal())] !== undefined
            ) {
              return new iString(match[parseInt(groupIndex.toDecimal())]!);
            } else {
              throw new Error(
                `No match found for group index ${groupIndex.valueOf()} in regex "${regexString.valueOf()}" on string "${fullString.valueOf()}"`
              );
            }
          };
        };
      },
    });
  }
}
