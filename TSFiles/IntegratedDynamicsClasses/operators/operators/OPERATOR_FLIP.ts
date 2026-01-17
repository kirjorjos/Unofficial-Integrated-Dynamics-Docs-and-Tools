import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { globalMap } from "HelperClasses/TypeMap";

export class OPERATOR_OPERATOR_FLIP extends BaseOperator<
  Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>,
  Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:operator_flip",
      nicknames: ["operatorFlip", "flip"],
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
        globalMap
      ),
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
