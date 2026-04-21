import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_RELATIONAL_GE extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, iBoolean>
> {
  static override internalName = "integrateddynamics:relational_ge" as const;
  static override numericID = 73;
  static override nicknames = [
    "anyGreaterThanOrEquals",
    "ge",
    "relationalGe",
    "any_greater_than_or_equals",
    "relational_ge",
  ];
  static override symbol = ">=";
  static override interactName = "anyGreaterThanOrEquals";
  static override operatorName = "ge" as const;
  static override displayName = "Greater Than or Equal" as const;
  static override fullDisplayName = "Relational Greater Than or Equal" as const;
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
          return new iBoolean(num1.gte(num2));
        };
      },
    });
  }
}
