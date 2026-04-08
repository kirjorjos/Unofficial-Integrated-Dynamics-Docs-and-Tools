import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_OPERATOR_FLIP extends BaseOperator<
  Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>,
  Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>
> {
  static override internalName = "integrateddynamics:operator_flip" as const;
  static override numericID = 96;
  static override nicknames = ["operatorFlip", "flip"];
  static override symbol = "flip";
  static override interactName = "operatorFlip";
  static override operatorName = "flip" as const;
  static override displayName = "Flip" as const;
  static override fullDisplayName = "Operator Flip" as const;
  static override tooltipInfo =
    "Flip the two first input parameters of an operator." as const;

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
              to: {
                type: "Function",
                from: { type: "Any", typeID: 2 },
                to: { type: "Any", typeID: 3 },
              },
            },
          },
          to: {
            type: "Operator",
            obscured: {
              type: "Function",
              from: { type: "Any", typeID: 2 },
              to: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 3 },
              },
            },
          },
        },
        normalizeSignature
      ),
      serializer: "integrateddynamics:combined.flip",
      function: (
        op: Operator<
          IntegratedValue,
          Operator<IntegratedValue, IntegratedValue>
        >
      ): Operator<
        IntegratedValue,
        Operator<IntegratedValue, IntegratedValue>
      > => {
        return op.flip();
      },
    });
  }
}
