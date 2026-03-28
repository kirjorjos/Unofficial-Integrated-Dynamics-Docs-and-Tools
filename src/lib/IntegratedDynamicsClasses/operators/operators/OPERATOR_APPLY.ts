import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_OPERATOR_APPLY extends BaseOperator<
  Operator<IntegratedValue, IntegratedValue>,
  Operator<IntegratedValue, IntegratedValue>
> {
  static override internalName = "integrateddynamics:operator_apply" as const;
  static override numericID = 94;
  static override nicknames = ["operatorApply", "apply"];
  static override symbol = "apply";
  static override interactName = "operatorApply";
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
              to: { type: "Any", typeID: 2 },
            },
          },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 2 },
          },
        },
        normalizeSignature
      ),
      serializer: "integrateddynamics:curry",
      function: (
        op: Operator<IntegratedValue, IntegratedValue>
      ): TypeLambda<IntegratedValue, IntegratedValue> => {
        return (arg: IntegratedValue): IntegratedValue => {
          return op.apply(arg);
        };
      },
    });
  }
}
