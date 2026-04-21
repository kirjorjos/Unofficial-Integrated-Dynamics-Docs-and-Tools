import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_LOGICAL_OR extends BaseOperator<
  iBoolean,
  Operator<iBoolean, iBoolean>
> {
  static override internalName = "integrateddynamics:logical_or" as const;
  static override numericID = 70;
  static override nicknames = [
    "||",
    "booleanOr",
    "logicalOr",
    "or",
    "boolean_or",
    "logical_or",
  ];
  static override symbol = "||";

  static override interactName = "booleanOr";
  static override operatorName = "or" as const;
  static override displayName = "Or" as const;
  static override fullDisplayName = "Logical Or" as const;
  static override kind = "logical" as const;
  static override renderPattern = "INFIX" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Boolean",
          },
          to: {
            type: "Function",
            from: {
              type: "Boolean",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (bool1: iBoolean): TypeLambda<iBoolean, iBoolean> => {
        return (bool2: iBoolean): iBoolean => {
          return new iBoolean(bool1.valueOf() || bool2.valueOf());
        };
      },
    });
  }
}
