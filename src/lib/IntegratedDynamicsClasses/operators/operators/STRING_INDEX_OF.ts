import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

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
