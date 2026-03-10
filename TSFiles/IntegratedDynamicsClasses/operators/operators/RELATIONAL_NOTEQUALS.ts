import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";

export class OPERATOR_RELATIONAL_NOTEQUALS extends BaseOperator<
  IntegratedValue,
  Operator<IntegratedValue, iBoolean>
> {
  static override internalName =
    "integrateddynamics:relational_notequals" as const;
  constructor() {
    super({
      nicknames: ["relationalNotequals"],
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
      symbol: "!=",
      interactName: "anyNotEquals",
      function: (
        value1: IntegratedValue
      ): TypeLambda<IntegratedValue, iBoolean> => {
        return (value2: IntegratedValue): iBoolean => {
          return value1.equals(value2).negate();
        };
      },
    });
  }
}
