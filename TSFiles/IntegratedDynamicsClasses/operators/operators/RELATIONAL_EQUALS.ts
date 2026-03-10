import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";

export class OPERATOR_RELATIONAL_EQUALS extends BaseOperator<
  IntegratedValue,
  Operator<IntegratedValue, iBoolean>
> {
  static override internalName =
    "integrateddynamics:relational_equals" as const;
  static override nicknames = ["anyEquals", "relationalEquals"];
  static override symbol = "==";
  static override interactName = "anyEquals";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Boolean",
          },
        },
      }),
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
