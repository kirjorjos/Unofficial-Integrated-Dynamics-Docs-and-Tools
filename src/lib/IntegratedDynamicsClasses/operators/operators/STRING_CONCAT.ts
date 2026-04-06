import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_STRING_CONCAT extends BaseOperator<
  iString,
  Operator<iString, iString>
> {
  static override internalName = "integrateddynamics:string_concat" as const;
  static override numericID = 78;
  static override nicknames = ["stringConcat", "concat"];
  static override symbol = "+";
  static override interactName = "stringConcat";
  static override operatorName = "concat" as const;
  static override displayName = "Concat" as const;
  static override fullDisplayName = "String Concat" as const;
  static override kind = "string" as const;
  static override renderPattern = "INFIX" as const;
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
              type: "String",
            },
          },
        },
        normalizeSignature
      ),
      function: (str1: iString): TypeLambda<iString, iString> => {
        return (str2: iString): iString => {
          return new iString(str1.valueOf().concat(str2.valueOf()));
        };
      },
    });
  }
}
