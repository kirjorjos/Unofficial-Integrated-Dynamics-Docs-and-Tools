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
    "greaterThanOrEquals",
    "any_greater_than_or_equals",
    "relational_ge",
    "greater_than_or_equals",
    ">=",
  ];
  static override symbol = ">=";
  static override interactName = "anyGreaterThanOrEquals";
  static override operatorName = "ge" as const;
  static override displayName = "Greater Than or Equal" as const;
  static override fullDisplayName = "Relational Greater Than or Equal" as const;
  static override stringDisplayNames = [
    "greater than or equal",
    "greater than or Equal",
    "greater than Or equal",
    "greater than Or Equal",
    "greater Than or equal",
    "greater Than or Equal",
    "greater Than Or equal",
    "greater Than Or Equal",
    "Greater than or equal",
    "Greater than or Equal",
    "Greater than Or equal",
    "Greater than Or Equal",
    "Greater Than or equal",
    "Greater Than or Equal",
    "Greater Than Or equal",
    "Greater Than Or Equal",
    "relational greater than or equal",
    "relational greater than or Equal",
    "relational greater than Or equal",
    "relational greater than Or Equal",
    "relational greater Than or equal",
    "relational greater Than or Equal",
    "relational greater Than Or equal",
    "relational greater Than Or Equal",
    "relational Greater than or equal",
    "relational Greater than or Equal",
    "relational Greater than Or equal",
    "relational Greater than Or Equal",
    "relational Greater Than or equal",
    "relational Greater Than or Equal",
    "relational Greater Than Or equal",
    "relational Greater Than Or Equal",
    "Relational greater than or equal",
    "Relational greater than or Equal",
    "Relational greater than Or equal",
    "Relational greater than Or Equal",
    "Relational greater Than or equal",
    "Relational greater Than or Equal",
    "Relational greater Than Or equal",
    "Relational greater Than Or Equal",
    "Relational Greater than or equal",
    "Relational Greater than or Equal",
    "Relational Greater than Or equal",
    "Relational Greater than Or Equal",
    "Relational Greater Than or equal",
    "Relational Greater Than or Equal",
    "Relational Greater Than Or equal",
    "Relational Greater Than Or Equal",
  ];
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
      flipTarget: "RELATIONAL_LE",
    });
  }
}
