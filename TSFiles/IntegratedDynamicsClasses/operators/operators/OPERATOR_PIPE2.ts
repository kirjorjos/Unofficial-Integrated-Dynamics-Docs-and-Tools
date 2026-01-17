import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { globalMap } from "HelperClasses/TypeMap";

export class OPERATOR_OPERATOR_PIPE2 extends BaseOperator<any, any> {
  constructor() {
    super({
      internalName: "integrateddynamics:operator_pipe2",
      nicknames: ["operatorPipe2", "pipe.2", "pipe2"],
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
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 3 },
              },
            },
            to: {
              type: "Function",
              from: {
                type: "Operator",
                obscured: {
                  type: "Function",
                  from: { type: "Any", typeID: 2 },
                  to: {
                    type: "Function",
                    from: { type: "Any", typeID: 3 },
                    to: { type: "Any", typeID: 4 },
                  },
                },
              },
              to: {
                type: "Operator",
                obscured: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: { type: "Any", typeID: 4 },
                },
              },
            },
          },
        },
        globalMap
      ),
      symbol: ".2",
      interactName: "operatorPipe2",
      serializer: "integrateddynamics:combined.pipe",
      function: (
        f: Operator<IntegratedValue, IntegratedValue>
      ): TypeLambda<
        Operator<IntegratedValue, IntegratedValue>,
        TypeLambda<
          Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>,
          TypeLambda<IntegratedValue, IntegratedValue>
        >
      > => {
        return (
          g: Operator<IntegratedValue, IntegratedValue>
        ): TypeLambda<
          Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>,
          TypeLambda<IntegratedValue, IntegratedValue>
        > => {
          return (
            h: Operator<
              IntegratedValue,
              Operator<IntegratedValue, IntegratedValue>
            >
          ): TypeLambda<IntegratedValue, IntegratedValue> => {
            return (x: IntegratedValue): IntegratedValue => {
              return h.apply(f.apply(x)).apply(g.apply(x));
            };
          };
        };
      },
    });
  }
}
