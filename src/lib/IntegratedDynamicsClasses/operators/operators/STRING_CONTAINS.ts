import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_STRING_CONTAINS extends BaseOperator<
  iString,
  Operator<iString, iBoolean>
> {
  static override internalName = "integrateddynamics:string_contains" as const;
  static override numericID = 156;
  static override nicknames = ["stringContains", "contains"];
  static override symbol = "contains";
  static override interactName = "stringContains";
  static override operatorName = "contains" as const;
  static override displayName = "String Contains" as const;
  static override fullDisplayName = "String String Contains" as const;
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
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (substring: iString): TypeLambda<iString, iBoolean> => {
        return (fullString: iString): iBoolean => {
          return new iBoolean(
            fullString.valueOf().includes(substring.valueOf())
          );
        };
      },
    });
  }
}
