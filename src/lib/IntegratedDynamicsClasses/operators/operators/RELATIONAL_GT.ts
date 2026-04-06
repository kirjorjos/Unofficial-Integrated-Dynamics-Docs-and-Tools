import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_RELATIONAL_GT extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, iBoolean>
> {
  static override internalName = "integrateddynamics:relational_gt" as const;
  static override numericID = 74;
  static override nicknames = ["numberGreaterThan", "relationalGt", "gt"];
  static override symbol = ">";
  static override interactName = "numberGreaterThan";
  static override operatorName = "gt" as const;
  static override displayName = "Greater Than" as const;
  static override fullDisplayName = "Relational Greater Than" as const;
  static override kind = "relational" as const;
  static override renderPattern = "INFIX" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (num1: TypeNumber): TypeLambda<TypeNumber, iBoolean> => {
        return (num2: TypeNumber): iBoolean => {
          return new iBoolean(num1.gt(num2));
        };
      },
    });
  }
}
