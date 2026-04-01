import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OPERATOR_NEGATION extends BaseOperator<
  Operator<IntegratedValue, iBoolean>,
  Operator<IntegratedValue, iBoolean>
> {
  static override internalName =
    "integrateddynamics:operator_negation" as const;
  static override numericID = 100;
  static override nicknames = ["operatorNegation", "negation"];
  static override symbol = "!.";
  static override interactName = "operatorNegation";
  static override operatorName = "negation" as const;
  static override kind = "operator" as const;
  static override renderPattern = "PREFIX_1" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
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
        },
        normalizeSignature
      ),
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
