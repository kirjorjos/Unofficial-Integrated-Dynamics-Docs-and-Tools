import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OPERATOR_NEGATION extends BaseOperator<
  Operator<IntegratedValue, iBoolean>,
  Operator<IntegratedValue, iBoolean>
> {
  static override internalName =
    "integrateddynamics:operator_negation" as const;
  static override nicknames = ["operatorNegation", "negation"];
  static override symbol = "!.";
  static override interactName = "operatorNegation";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Operator",
          obscured: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Boolean" },
          },
        },
        to: {
          type: "Operator",
          obscured: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Boolean" },
          },
        },
      }),
      function: (
        predicate: Operator<IntegratedValue, iBoolean>
      ): TypeLambda<IntegratedValue, iBoolean> => {
        return (input: IntegratedValue): iBoolean => {
          return new iBoolean(!predicate.apply(input).valueOf());
        };
      },
    });
  }
}
