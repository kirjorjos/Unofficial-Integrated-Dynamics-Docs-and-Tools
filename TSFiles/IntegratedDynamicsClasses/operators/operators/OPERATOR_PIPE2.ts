import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_OPERATOR_PIPE2 extends BaseOperator<any, any> {
  static override internalName = "integrateddynamics:operator_pipe2" as const;
  constructor() {
    super({
      nicknames: ["operatorPipe2", "pipe.2", "pipe2"],
      parsedSignature: new ParsedSignature({
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
      }),
      symbol: ".2",
      interactName: "operatorPipe2",
      serializer: "integrateddynamics:combined.pipe",
      function: (
        f: Operator<IntegratedValue, IntegratedValue>
      ): TypeLambda<
        Operator<IntegratedValue, IntegratedValue>,
        TypeLambda<
          Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>,
          IntegratedValue
        >
      > => {
        return (
          g: Operator<IntegratedValue, IntegratedValue>
        ): TypeLambda<
          Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>,
          IntegratedValue
        > => {
          return (
            h: Operator<
              IntegratedValue,
              Operator<IntegratedValue, IntegratedValue>
            >
          ): IntegratedValue => {
            return h.pipe2(f, g);
          };
        };
      },
    });
  }
}
