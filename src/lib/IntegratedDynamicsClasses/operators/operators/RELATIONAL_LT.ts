import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_RELATIONAL_LT extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, iBoolean>
> {
  static override internalName = "integrateddynamics:relational_lt" as const;
  static override numericID = 76;
  static override nicknames = ["numberLessThan", "relationalLt", "lt"];
  static override symbol = "<";

  static override interactName = "numberLessThan";
  static override operatorName = "lt" as const;
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
          return new iBoolean(num1.lt(num2));
        };
      },
    });
  }
}
