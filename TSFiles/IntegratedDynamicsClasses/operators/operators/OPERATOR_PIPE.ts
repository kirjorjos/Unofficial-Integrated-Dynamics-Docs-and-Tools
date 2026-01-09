import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { TypeMap } from "HelperClasses/TypeMap";

export class OPERATOR_OPERATOR_PIPE extends BaseOperator<
  Operator<IntegratedValue, IntegratedValue>,
  Operator<
    Operator<IntegratedValue, IntegratedValue>,
    Operator<IntegratedValue, IntegratedValue>
  >
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:operator_pipe",
      nicknames: ["operatorPipe", "pipe"],
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
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 2 },
                to: { type: "Any", typeID: 3 },
              },
            },
            to: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 3 },
              },
            },
          },
        },
        globalMap
      ),
      symbol: ".",
      interactName: "operatorPipe",
      serializer: "integrateddynamics:combined.pipe",
      function: (
        f: Operator<IntegratedValue, IntegratedValue>
      ): TypeLambda<
        Operator<IntegratedValue, IntegratedValue>,
        Operator<IntegratedValue, IntegratedValue>
      > => {
        return (
          g: Operator<IntegratedValue, IntegratedValue>
        ): Operator<IntegratedValue, IntegratedValue> => {
          return f.pipe(g);
        };
      },
    });
  }
}
