import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_RELATIONAL_LE extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, iBoolean>
> {
  static override internalName = "integrateddynamics:relational_le" as const;
  static override numericID = 75;
  static override nicknames = [
    "anyLessThanOrEquals",
    "le",
    "relationalLe",
    "any_less_than_or_equals",
    "relational_le",
  ];
  static override symbol = "<=";
  static override interactName = "anyLessThanOrEquals";
  static override operatorName = "le" as const;
  static override displayName = "Less Than or Equal" as const;
  static override fullDisplayName = "Relational Less Than or Equal" as const;
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
          return new iBoolean(num1.lte(num2));
        };
      },
      flipTarget: "RELATIONAL_GE",
    });
  }
}
