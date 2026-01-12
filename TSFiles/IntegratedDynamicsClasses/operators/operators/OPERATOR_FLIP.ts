import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { TypeMap } from "HelperClasses/TypeMap";

export class OPERATOR_OPERATOR_FLIP extends BaseOperator<
  Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>,
  Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>
> {
  constructor(globalMap: TypeMap) {
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
      ): TypeLambda<
        IntegratedValue,
        TypeLambda<IntegratedValue, IntegratedValue>
      > => {
        return (
          arg1: IntegratedValue
        ): TypeLambda<IntegratedValue, IntegratedValue> => {
          return (arg2: IntegratedValue): IntegratedValue => {
            return op.apply(arg2).apply(arg1);
          };
        };
      },
    });
  }
}
