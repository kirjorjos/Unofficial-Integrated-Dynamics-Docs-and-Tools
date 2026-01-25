import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_OPERATOR_FLIP extends BaseOperator<
  Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>,
  Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>
> {
  static override internalName = "integrateddynamics:operator_flip" as const;
  constructor() {
    super({
      nicknames: ["operatorFlip", "flip"],
      parsedSignature: new ParsedSignature({
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
      }),
      symbol: "flip",
      interactName: "operatorFlip",
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
