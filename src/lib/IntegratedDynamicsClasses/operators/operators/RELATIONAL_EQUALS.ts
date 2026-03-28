import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_RELATIONAL_EQUALS extends BaseOperator<
  IntegratedValue,
  Operator<IntegratedValue, iBoolean>
> {
  static override internalName =
    "integrateddynamics:relational_equals" as const;
  static override numericID = 72;
  static override nicknames = ["anyEquals", "relationalEquals", "eq"];
  static override symbol = "==";

  static override interactName = "anyEquals";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (
        value1: IntegratedValue
      ): TypeLambda<IntegratedValue, iBoolean> => {
        return (value2: IntegratedValue): iBoolean => {
          return value1.equals(value2);
        };
      },
    });
  }
}
