import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_LOGICAL_AND extends BaseOperator<
  iBoolean,
  Operator<iBoolean, iBoolean>
> {
  static override internalName = "integrateddynamics:logical_and" as const;
  static override numericID = 68;
  static override nicknames = ["booleanAnd", "and", "logicalAnd", "&&"];
  static override symbol = "&&";

  static override interactName = "booleanAnd";
  static override operatorName = "and" as const;
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
          return new iBoolean(bool1.valueOf() && bool2.valueOf());
        };
      },
    });
  }
}
