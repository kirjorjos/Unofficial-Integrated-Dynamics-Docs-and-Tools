import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";

export class OPERATOR_STRING_INDEX_OF extends BaseOperator<
  iString,
  Operator<iString, Integer>
> {
  static override internalName = "integrateddynamics:string_index_of" as const;
  static override numericID = 164;
  static override nicknames = ["stringIndexOf"];
  static override symbol = "index_of";
  static override interactName = "stringIndexOf";
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
      function: (substring: iString): TypeLambda<iString, Integer> => {
        return (fullString: iString): Integer => {
          return new Integer(fullString.valueOf().indexOf(substring.valueOf()));
        };
      },
    });
  }
}
